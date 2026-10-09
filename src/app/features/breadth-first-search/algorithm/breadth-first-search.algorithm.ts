import { GraphData, GraphStep, neighbors } from '../../../core/graph-lesson';

export function breadthFirstSearchSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const parents: Record<string, string | null> = { [start]: null };
  const distances: Record<string, number> = { [start]: 0 };
  const discovered = new Set<string>([start]);
  const visited: string[] = [];
  const order: string[] = [];
  const queue = [start];
  const emit = (
    phase: GraphStep['phase'],
    current: string | null,
    edgeId: string | null,
    title: string,
    explanation: string,
    codeLine: number,
  ): void => {
    steps.push({
      phase,
      current,
      edgeId,
      title,
      explanation,
      codeLine,
      frontier: [...queue],
      visited: [...visited],
      order: [...order],
      distances: { ...distances },
      parents: { ...parents },
    });
  };

  emit(
    'ready',
    null,
    null,
    `Begin at ${start}`,
    `Place ${start} in the queue. The first queued node is always processed next.`,
    1,
  );
  while (queue.length) {
    const current = queue.shift()!;
    visited.push(current);
    order.push(current);
    emit(
      'visit',
      current,
      null,
      `Visit ${current}`,
      `Remove ${current} from the front of the queue. Explore all of its neighbors before moving to the next queued node.`,
      2,
    );
    for (const candidate of neighbors(graph, current)) {
      emit(
        'inspect',
        current,
        candidate.edge.id,
        `Inspect ${current} → ${candidate.node}`,
        `Check whether ${candidate.node} is already discovered.`,
        3,
      );
      if (discovered.has(candidate.node)) {
        emit(
          'skip',
          current,
          candidate.edge.id,
          `Skip ${candidate.node}`,
          `${candidate.node} is already visited or waiting in the queue.`,
          5,
        );
        continue;
      }
      parents[candidate.node] = current;
      distances[candidate.node] = distances[current] + 1;
      discovered.add(candidate.node);
      queue.push(candidate.node);
      emit(
        'discover',
        current,
        candidate.edge.id,
        `Enqueue ${candidate.node}`,
        `${candidate.node} joins the back of the queue. BFS finishes the current layer before reaching deeper nodes.`,
        4,
      );
    }
  }
  emit(
    'done',
    null,
    null,
    'Traversal complete',
    `Visited ${order.length} of ${graph.nodes.length} nodes reachable from ${start}. Nodes outside this component remain unvisited.`,
    6,
  );
  return steps;
}
