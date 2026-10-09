import {
  DijkstraDryRun,
  GraphData,
  GraphEdge,
  GraphStep,
  HeapEntry,
} from '../../../core/graph-lesson';
import { MinHeap } from './min-heap';

export function dijkstraSteps(graph: GraphData, start: string, target: string): GraphStep[] {
  if (!graph.nodes.includes(start)) {
    return [];
  }
  const steps: GraphStep[] = [];
  const distances: Record<string, number | null> = Object.fromEntries(
    graph.nodes.map((node) => [node, null]),
  );
  const parents: Record<string, string | null> = Object.fromEntries(
    graph.nodes.map((node) => [node, null]),
  );
  const adjacency = new Map<string, { node: string; edge: GraphEdge }[]>(
    graph.nodes.map((node) => [node, []]),
  );
  for (const edge of graph.edges) {
    adjacency.get(edge.from)!.push({ node: edge.to, edge });
    if (!graph.directed) {
      adjacency.get(edge.to)!.push({ node: edge.from, edge });
    }
  }
  const settled = new Set<string>();
  const order: string[] = [];
  const heap = new MinHeap();
  let serial = 0;
  let extracted: HeapEntry | null = null;
  let variables: Pick<
    DijkstraDryRun,
    'current' | 'neighbor' | 'weight' | 'candidate' | 'previousDistance'
  > = { current: null, neighbor: null, weight: null, candidate: null, previousDistance: null };
  const emit = (
    phase: GraphStep['phase'],
    title: string,
    explanation: string,
    codeKey: string,
    codeLine: number,
    edgeId: string | null = null,
    operation = 'Inspect state',
    activeEntryIds: readonly number[] = [],
    path?: string[],
  ): void => {
    const entries = heap.snapshot();
    steps.push({
      phase,
      current: variables.current,
      edgeId,
      title,
      explanation,
      codeLine,
      path,
      frontier: [
        ...new Set(entries.filter((entry) => !settled.has(entry.node)).map((entry) => entry.node)),
      ],
      visited: [...settled],
      order: [...order],
      distances: { ...distances },
      parents: { ...parents },
      dryRun: {
        ...variables,
        heap: entries,
        activeEntryIds: [...activeEntryIds],
        operation,
        extracted: extracted ? { ...extracted } : null,
        codeKey,
      },
    });
  };
  const push = (node: string, distance: number, edgeId: string | null = null): void => {
    const entry = { id: serial++, node, distance };
    heap.push(entry, (mutation) => {
      const swapping = mutation.operation === 'sift-up';
      emit(
        swapping ? 'heap-swap' : 'heap-push',
        swapping ? 'Sift the new entry upward' : `Push (${distance}, ${node})`,
        swapping
          ? 'Swap a child with its parent when its priority is smaller. Equal distances use insertion order. Continue until the min-heap property is restored.'
          : `Append (${distance}, ${node}) to the heap. Its priority is the distance at insertion time; sift-up may move it toward the root.`,
        node === start && order.length === 0 ? 'seed' : 'push',
        node === start && order.length === 0 ? 1 : 4,
        edgeId,
        swapping ? 'Sift up · swap' : 'Push · append',
        mutation.activeEntryIds,
      );
    });
  };

  distances[start] = 0;
  emit(
    'ready',
    `Initialize dist[${start}] = 0`,
    'All other distances are ∞. The heap is empty until we enqueue the start node.',
    'initialize',
    1,
  );
  push(start, 0);
  while (heap.size) {
    extracted = { ...heap.peek()! };
    variables = {
      current: extracted.node,
      neighbor: null,
      weight: null,
      candidate: null,
      previousDistance: null,
    };
    emit(
      'heap-pop',
      `Read the minimum: (${extracted.distance}, ${extracted.node})`,
      'The next entry is at index 0. Remove it, move the final leaf to the root, then sift that entry down.',
      'pop',
      2,
      null,
      'Pop · select root',
      [extracted.id],
    );
    const entry = heap.pop((mutation) => {
      const swapping = mutation.operation === 'sift-down';
      emit(
        swapping ? 'heap-swap' : 'heap-pop',
        swapping
          ? 'Restore the heap with sift-down'
          : `Extract (${extracted!.distance}, ${extracted!.node})`,
        swapping
          ? 'Swap the parent with its smaller child. The highlighted entries changed places in the heap array and tree.'
          : heap.size
            ? 'The final leaf moved to index 0. Sift-down will restore the min-heap property if needed.'
            : 'The heap is now empty. Check the extracted entry before processing its edges.',
        'pop',
        2,
        null,
        swapping ? 'Sift down · swap' : 'Pop · remove root',
        mutation.activeEntryIds,
      );
    })!;
    if (entry.distance !== distances[entry.node]) {
      emit(
        'stale',
        `Skip stale (${entry.distance}, ${entry.node})`,
        `This entry stores ${entry.distance}, but dist[${entry.node}] is now ${distances[entry.node]}. A cheaper entry was pushed later, so this old one must not expand the node again.`,
        'stale',
        5,
        null,
        'Discard stale entry',
      );
      continue;
    }
    emit(
      'inspect',
      `Stored ${entry.distance} equals dist[${entry.node}]`,
      'The stale-entry condition is false. Accept this entry and expand its outgoing edges.',
      'stale',
      2,
      null,
      'Check stored priority',
    );
    settled.add(entry.node);
    order.push(entry.node);
    emit(
      'settle',
      `Settle ${entry.node} at distance ${entry.distance}`,
      `The extracted priority equals dist[${entry.node}]. With non-negative weights, this shortest distance is final.`,
      'settle',
      2,
      null,
      'Accept minimum',
    );
    for (const neighbor of adjacency.get(entry.node)!) {
      variables = {
        current: entry.node,
        neighbor: neighbor.node,
        weight: neighbor.edge.weight,
        candidate: null,
        previousDistance: distances[neighbor.node],
      };
      emit(
        'inspect',
        `Inspect ${entry.node} → ${neighbor.node}`,
        `Read this edge's weight (${neighbor.edge.weight}) and the best distance to ${neighbor.node} (${distances[neighbor.node] ?? '∞'}).`,
        'edge',
        3,
        neighbor.edge.id,
      );
      const candidate = entry.distance + neighbor.edge.weight;
      variables = { ...variables, candidate };
      emit(
        'inspect',
        `candidate = ${entry.distance} + ${neighbor.edge.weight} = ${candidate}`,
        `Compare ${candidate} with dist[${neighbor.node}] = ${distances[neighbor.node] ?? '∞'}. Only a strictly cheaper route changes the table and heap.`,
        'candidate',
        3,
        neighbor.edge.id,
      );
      if (distances[neighbor.node] !== null && candidate >= distances[neighbor.node]!) {
        emit(
          'skip',
          `Keep dist[${neighbor.node}] = ${distances[neighbor.node]}`,
          `${candidate} < ${distances[neighbor.node]} is false. Leave the distance, predecessor, and heap unchanged.`,
          'compare',
          5,
          neighbor.edge.id,
        );
        continue;
      }
      emit(
        'inspect',
        `${candidate} < ${distances[neighbor.node] ?? '∞'} is true`,
        'The new route is cheaper. Update the distance, record its predecessor, and enqueue a new heap entry.',
        'compare',
        4,
        neighbor.edge.id,
      );
      distances[neighbor.node] = candidate;
      emit(
        'relax',
        `dist[${neighbor.node}] = ${candidate}`,
        `Replace ${variables.previousDistance ?? '∞'} with ${candidate}. The old heap entry, if any, remains until it is popped and skipped.`,
        'distance',
        4,
        neighbor.edge.id,
      );
      parents[neighbor.node] = entry.node;
      emit(
        'relax',
        `parent[${neighbor.node}] = ${entry.node}`,
        'Remember the preceding node so we can reconstruct the shortest path at the end.',
        'parent',
        4,
        neighbor.edge.id,
      );
      push(neighbor.node, candidate, neighbor.edge.id);
    }
  }
  const path: string[] = [];
  variables = {
    current: null,
    neighbor: null,
    weight: null,
    candidate: null,
    previousDistance: null,
  };
  extracted = null;
  if (distances[target] !== null) {
    for (let node: string | null = target; node !== null; node = parents[node]) {
      path.push(node);
      const route = [...path].reverse();
      variables = { ...variables, current: node };
      emit(
        'backtrack',
        `Trace parent[${node}] = ${parents[node] ?? 'none'}`,
        `Build the route backward from ${target}: ${route.join(' → ')}.`,
        'path',
        6,
        null,
        'Reconstruct path',
        [],
        route,
      );
    }
  }
  path.reverse();
  variables = { ...variables, current: null };
  emit(
    'done',
    distances[target] === null
      ? `${target} is unreachable`
      : `Shortest path to ${target}: ${distances[target]}`,
    distances[target] === null
      ? `The heap is empty and no route from ${start} to ${target} was found.`
      : `${path.join(' → ')} has total weight ${distances[target]}. All queued entries, including stale ones, have been processed.`,
    'return',
    6,
    null,
    'Complete',
    [],
    path,
  );
  return steps;
}
