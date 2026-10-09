import { GraphData, GraphStep, GraphLessonConfig } from '../graph-lesson';
import {
  GraphSnapshot,
  StructureSnapshot,
  MemoryRow,
  StepVariable,
  TreeSnapshot,
  VisualItem,
} from './structure-snapshot';
export function graphSnapshot(
  graph: GraphData,
  step: GraphStep,
  start: string,
  kind: GraphLessonConfig['kind'],
): GraphSnapshot {
  const weighted = kind === 'dijkstra' || kind === 'bellman-ford' || kind === 'kruskal';
  const path = step.path ?? [];
  return {
    kind: 'graph',
    selectable: kind !== 'kruskal',
    root: kind === 'kruskal' ? undefined : start,
    directed: graph.directed,
    nodes: graph.nodes.map((node) => ({
      id: node,
      label: node,
      detail:
        kind === 'kruskal'
          ? 'root ' + componentRoot(step, node)
          : weighted
            ? String(step.distances[node] ?? '∞')
            : undefined,
      marker: step.frontier.includes(node) ? (kind === 'dfs' ? 'stack' : 'queued') : undefined,
      state: path.includes(node)
        ? 'found'
        : step.current === node || step.dryRun?.neighbor === node
          ? 'active'
          : step.visited.includes(node)
            ? 'visited'
            : 'idle',
    })),
    edges: graph.edges.map((edge) => ({
      id: edge.id,
      from: edge.from,
      to: edge.to,
      label: weighted ? String(edge.weight) : undefined,
      state:
        step.trace?.edgeStates?.[edge.id] ??
        (path.some(
          (node, i) =>
            i < path.length - 1 &&
            ((node === edge.from && path[i + 1] === edge.to) ||
              (!graph.directed && node === edge.to && path[i + 1] === edge.from)),
        )
          ? 'found'
          : step.edgeId === edge.id
            ? 'active'
            : 'idle'),
    })),
  };
}
export function frontierSnapshot(
  kind: GraphLessonConfig['kind'],
  step: GraphStep,
  graph?: GraphData,
): StructureSnapshot {
  if ((kind === 'kruskal' || kind === 'bellman-ford') && graph) {
    return {
      kind: 'array',
      operation:
        kind === 'kruskal'
          ? 'Edges from lightest to heaviest · faded = rejected cycle'
          : 'Edges scanned in input order on every pass',
      items: (step.trace?.edgeOrder ?? []).map((id) => {
        const edge = graph.edges.find((edge) => edge.id === id)!;
        return {
          id,
          label: edge.from + (graph.directed ? ' → ' : ' — ') + edge.to,
          detail: 'weight ' + edge.weight,
          state: step.trace?.edgeStates?.[id] ?? (step.edgeId === id ? 'active' : 'idle'),
        };
      }),
    };
  }
  if (kind === 'dijkstra' && step.dryRun) {
    const trace = step.dryRun;
    return {
      kind: 'heap',
      order: 'min',
      operation: trace.operation,
      items: trace.heap.map((entry) => ({
        id: String(entry.id),
        label: entry.node,
        detail: String(entry.distance),
        state:
          entry.distance !== step.distances[entry.node]
            ? 'stale'
            : trace.activeEntryIds.includes(entry.id)
              ? 'active'
              : 'idle',
      })),
      removed: trace.extracted
        ? {
            id: String(trace.extracted.id),
            label: trace.extracted.node,
            detail: String(trace.extracted.distance),
          }
        : null,
    };
  }
  return {
    kind: kind === 'dfs' ? 'stack' : 'queue',
    operation: step.title,
    items: step.frontier.map((node, index) => ({
      id: node,
      label: node,
      state: (kind === 'dfs' ? index === step.frontier.length - 1 : index === 0)
        ? 'active'
        : 'idle',
    })),
    removed:
      (kind === 'dfs' && step.phase === 'backtrack') || (kind === 'bfs' && step.phase === 'visit')
        ? step.current
          ? { id: step.current, label: step.current }
          : null
        : null,
  };
}
export function graphMemory(graph: GraphData, step: GraphStep): MemoryRow[] {
  return graph.nodes.map((node) => ({
    id: node,
    cells: {
      node,
      distance: step.distances[node] ?? '∞',
      parent: step.parents[node] ?? '—',
      root: componentRoot(step, node),
      size: step.distances[componentRoot(step, node)] ?? 1,
      status: step.trace?.components
        ? 'Component ' + componentRoot(step, node)
        : step.trace?.negativeCycle
          ? 'Tentative · cycle'
          : step.trace
            ? step.distances[node] === null
              ? 'Unreachable'
              : step.phase === 'done'
                ? 'Final'
                : 'Tentative'
            : step.visited.includes(node)
              ? step.dryRun
                ? 'Settled'
                : 'Visited'
              : step.frontier.includes(node)
                ? 'Queued'
                : step.dryRun && step.distances[node] !== null
                  ? 'Tentative'
                  : 'Unreached',
    },
    state:
      step.current === node || step.dryRun?.neighbor === node
        ? 'active'
        : step.visited.includes(node)
          ? 'visited'
          : 'idle',
  }));
}
export function graphVariables(step: GraphStep): StepVariable[] {
  if (step.trace) {
    return [...step.trace.variables];
  }
  const trace = step.dryRun;
  return trace
    ? [
        { name: 'u', value: trace.current ?? '—' },
        { name: 'd', value: trace.extracted?.distance ?? '—' },
        { name: 'v', value: trace.neighbor ?? '—' },
        { name: 'w', value: trace.weight ?? '—' },
        { name: 'candidate', value: trace.candidate ?? '—' },
      ]
    : [
        { name: 'current', value: step.current ?? '—' },
        { name: 'frontier', value: step.frontier.length },
        { name: 'visited', value: step.visited.length },
      ];
}
export function discoveryTree(step: GraphStep, start: string): TreeSnapshot {
  if (step.trace?.components) {
    return {
      kind: 'tree',
      nodes: Object.entries(step.trace.components).map(([node, parent]) => ({
        id: node,
        label: node,
        parentId: parent === node ? null : parent,
        detail: 'root ' + componentRoot(step, node),
        state: step.current === node ? 'active' : 'idle',
      })),
    };
  }
  const ids = new Set([start, ...Object.keys(step.parents), ...step.visited, ...step.frontier]);
  return {
    kind: 'tree',
    nodes: [...ids].map((node) => ({
      id: node,
      label: node,
      parentId: step.parents[node],
      detail: step.distances[node] === undefined ? undefined : 'depth ' + step.distances[node],
      state: step.current === node ? 'active' : step.visited.includes(node) ? 'visited' : 'idle',
    })),
  };
}
export function visitItems(step: GraphStep, graph?: GraphData): VisualItem[] {
  if (step.trace?.acceptedEdges && graph) {
    return step.trace.acceptedEdges.map((id) => {
      const edge = graph.edges.find((edge) => edge.id === id)!;
      return {
        id,
        label: `${edge.from} — ${edge.to}`,
        detail: String(edge.weight),
        state: 'found',
      };
    });
  }
  return step.order.map((node, index) => ({
    id: `${index}-${node}`,
    label: node,
    marker: String(index + 1),
    state: step.current === node ? 'active' : 'visited',
  }));
}

function componentRoot(step: GraphStep, node: string): string {
  const parents = step.trace?.components;
  if (!parents) {
    return node;
  }
  while (parents[node] !== node) {
    node = parents[node];
  }
  return node;
}
