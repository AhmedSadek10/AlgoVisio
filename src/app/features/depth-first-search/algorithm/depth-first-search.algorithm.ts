import { GraphData, GraphStep, neighbors } from '../../../core/graph-lesson';

export function depthFirstSearchSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = [];
  const parents: Record<string, string | null> = { [start]: null };
  const distances: Record<string, number> = { [start]: 0 };
  const visited = new Set<string>();
  const order: string[] = [];
  const stack: { node: string; next: number }[] = [{ node: start, next: 0 }];
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
      frontier: stack.map((frame) => frame.node),
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
    'The stack holds the current path. Its last node is the next one to explore.',
    1,
  );
  visited.add(start);
  order.push(start);
  emit(
    'visit',
    start,
    null,
    `Enter ${start}`,
    `Mark ${start} visited and explore its neighbors in the order written in the edge list.`,
    2,
  );

  while (stack.length) {
    const frame = stack[stack.length - 1];
    const adjacent = neighbors(graph, frame.node);
    if (frame.next === adjacent.length) {
      const finished = stack.pop()!;
      emit(
        'backtrack',
        finished.node,
        null,
        `Backtrack from ${finished.node}`,
        `${finished.node} has no unvisited neighbors left. Return to the previous stack frame.`,
        6,
      );
      continue;
    }
    const candidate = adjacent[frame.next++];
    emit(
      'inspect',
      frame.node,
      candidate.edge.id,
      `Inspect ${frame.node} → ${candidate.node}`,
      `Look at the edge from ${frame.node} to ${candidate.node}. Has ${candidate.node} been visited?`,
      3,
    );
    if (visited.has(candidate.node)) {
      emit(
        'skip',
        frame.node,
        candidate.edge.id,
        `Skip ${candidate.node}`,
        `${candidate.node} was already visited, so following this edge would repeat work.`,
        5,
      );
      continue;
    }
    parents[candidate.node] = frame.node;
    distances[candidate.node] = distances[frame.node] + 1;
    stack.push({ node: candidate.node, next: 0 });
    visited.add(candidate.node);
    order.push(candidate.node);
    emit(
      'discover',
      candidate.node,
      candidate.edge.id,
      `Go deeper to ${candidate.node}`,
      `Push ${candidate.node} onto the stack. DFS will finish this path before returning to ${frame.node}.`,
      4,
    );
  }
  emit(
    'done',
    null,
    null,
    'Traversal complete',
    `Visited ${order.length} of ${graph.nodes.length} nodes reachable from ${start}. Nodes outside this component remain unvisited.`,
    7,
  );
  return steps;
}
