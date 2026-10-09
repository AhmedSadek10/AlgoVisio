import { GraphData, GraphStep } from '../../../core/graph-lesson';

export function bellmanFordSteps(graph: GraphData, start: string, target: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const edges = graph.edges.flatMap((edge) =>
    graph.directed ? [edge] : [edge, { ...edge, from: edge.to, to: edge.from }],
  );
  const dist: Record<string, number> = Object.fromEntries(
    graph.nodes.map((node) => [node, Infinity]),
  );
  const parent: Record<string, string | null> = Object.fromEntries(
    graph.nodes.map((node) => [node, null]),
  );
  dist[start] = 0;
  let pass = 0;
  let updates = 0;
  let current: string | null = null;
  let edgeId: string | null = null;
  let candidate: number | null = null;
  let neighbor = '—';
  let negativeCycle = false;
  const order: string[] = [];
  const add = (
    key: string,
    phase: GraphStep['phase'],
    title: string,
    explanation: string,
    comparison = '',
    summary?: string,
    path?: string[],
  ) => {
    steps.push({
      phase,
      title,
      explanation,
      current,
      edgeId,
      codeLine: Number(key),
      frontier: [],
      visited: [],
      order: [...order],
      parents: { ...parent },
      path,
      distances: Object.fromEntries(
        Object.entries(dist).map(([node, value]) => [node, Number.isFinite(value) ? value : null]),
      ),
      trace: {
        codeKey: key,
        variables: [
          { name: 'pass', value: pass },
          { name: 'u', value: current ?? '—' },
          { name: 'v', value: neighbor },
          { name: 'candidate', value: candidate ?? '—' },
          { name: 'updates', value: updates },
        ],
        edgeOrder: graph.edges.map((edge) => edge.id),
        negativeCycle,
        comparison,
        summary,
      },
    });
  };
  add(
    '1',
    'ready',
    `Initialize dist[${start}] = 0`,
    'All other distances start at infinity. Unlike Dijkstra, Bellman–Ford can handle negative edge weights.',
  );
  for (pass = 1; pass < graph.nodes.length; pass++) {
    updates = 0;
    current = null;
    edgeId = null;
    neighbor = '—';
    candidate = null;
    add(
      '2',
      'inspect',
      `Pass ${pass} of ${graph.nodes.length - 1}`,
      'Scan every edge again. After i complete passes, all shortest routes using at most i edges have been found; in-place updates can propagate farther.',
    );
    for (const edge of edges) {
      current = edge.from;
      neighbor = edge.to;
      edgeId = edge.id;
      candidate = null;
      add(
        '3',
        'inspect',
        `Check ${edge.from} → ${edge.to} (${edge.weight})`,
        'An edge can improve its destination only if its source has a known distance.',
      );
      if (!Number.isFinite(dist[edge.from])) {
        add(
          '4',
          'skip',
          'Skip an unreachable source',
          `dist[${edge.from}] is ∞. This edge cannot produce a finite candidate yet.`,
        );
        continue;
      }
      candidate = dist[edge.from] + edge.weight;
      add(
        '4',
        'inspect',
        `Candidate distance: ${candidate}`,
        `Go through ${edge.from}, then add edge weight ${edge.weight}.`,
      );
      const comparison = `${dist[edge.from]} + ${edge.weight} = ${candidate} ${candidate < dist[edge.to] ? '<' : '≥'} ${Number.isFinite(dist[edge.to]) ? dist[edge.to] : '∞'}`;
      add(
        '5',
        'inspect',
        candidate < dist[edge.to] ? 'A cheaper route is available' : 'Keep the current distance',
        'Compare the candidate with the best distance currently stored for the destination.',
        comparison,
      );
      if (candidate < dist[edge.to]) {
        dist[edge.to] = candidate;
        parent[edge.to] = edge.from;
        updates++;
        order.push(edge.to);
        add(
          '6',
          'relax',
          `Update dist[${edge.to}] = ${candidate}`,
          `Set parent[${edge.to}] = ${edge.from}. These distances are tentative until all passes and the cycle check finish.`,
          comparison,
        );
      }
    }
    current = null;
    edgeId = null;
    add(
      '7',
      'inspect',
      updates === 0 ? 'No updates: stop early' : `${updates} updates in this pass`,
      updates === 0
        ? 'A complete pass changed nothing. The distance table is stable, so we can skip the remaining relaxation passes.'
        : 'At least one distance changed. Another pass may propagate those improvements.',
    );
    if (updates === 0) {
      break;
    }
  }
  pass = Math.min(pass, Math.max(0, graph.nodes.length - 1));
  for (const edge of edges) {
    current = edge.from;
    neighbor = edge.to;
    edgeId = edge.id;
    candidate = Number.isFinite(dist[edge.from]) ? dist[edge.from] + edge.weight : null;
    negativeCycle = candidate !== null && candidate < dist[edge.to];
    add(
      '8',
      negativeCycle ? 'stale' : 'inspect',
      negativeCycle ? 'Reachable negative cycle detected' : 'Check for a further improvement',
      negativeCycle
        ? 'An edge still relaxes after V − 1 passes. A reachable negative cycle lets some route costs decrease without limit. The displayed distances are tentative, not valid shortest-path results.'
        : 'The extra scan detects negative cycles reachable from the start. An unreachable cycle cannot affect these routes.',
    );
    if (negativeCycle) {
      break;
    }
  }
  current = null;
  edgeId = null;
  neighbor = '—';
  candidate = null;
  const path: string[] = [];
  if (!negativeCycle && Number.isFinite(dist[target])) {
    for (let node: string | null = target; node !== null; node = parent[node]) {
      path.push(node);
    }
    path.reverse();
    add(
      '9',
      'inspect',
      'Reconstruct the target path',
      'Follow predecessor links from the target back to the start, then reverse their order.',
      '',
      undefined,
      path,
    );
  }
  const summary = negativeCycle
    ? 'Reachable negative cycle · no shortest-path result returned'
    : path.length
      ? `${path.join(' → ')} · cost ${dist[target]}`
      : `${target} is unreachable from ${start}`;
  add(
    '10',
    'done',
    negativeCycle
      ? 'Negative cycle: distances are not final'
      : 'Shortest-path computation complete',
    negativeCycle
      ? 'The extra edge scan found a further improvement. Distances affected by the reachable cycle cannot be finalized.'
      : 'The distance table is final. Predecessor links describe the shortest route to each reachable node.',
    '',
    summary,
    path,
  );
  return steps;
}
