import { GraphData, GraphStep } from '../../../core/graph-lesson';
import { ItemState } from '../../../core/visualization/structure-snapshot';

/** Stable edge order and union by size keep the code and DSU visualization aligned. */
export function kruskalSteps(graph: GraphData): GraphStep[] {
  const steps: GraphStep[] = [];
  const parent = Object.fromEntries(graph.nodes.map((node) => [node, node]));
  const size = Object.fromEntries(graph.nodes.map((node) => [node, 1]));
  const edges = graph.edges
    .map((edge, index) => ({ ...edge, index }))
    .sort((a, b) => a.weight - b.weight || a.index - b.index);
  const accepted: string[] = [];
  const edgeStates: Record<string, ItemState> = {};
  let total = 0;
  let components = graph.nodes.length;
  let current: string | null = null;
  let edgeId: string | null = null;
  let rootU = '—';
  let rootV = '—';
  const root = (node: string): string => {
    while (parent[node] !== node) {
      node = parent[node];
    }
    return node;
  };
  const add = (
    codeKey: string,
    phase: GraphStep['phase'],
    title: string,
    explanation: string,
    summary?: string,
  ) => {
    steps.push({
      phase,
      title,
      explanation,
      codeLine: Number(codeKey),
      current,
      edgeId,
      frontier: [],
      visited: [],
      order: [],
      distances: { ...size },
      parents: { ...parent },
      trace: {
        codeKey,
        variables: [
          { name: 'root(u)', value: rootU },
          { name: 'root(v)', value: rootV },
          { name: 'components', value: components },
          { name: 'edges chosen', value: accepted.length },
          { name: 'total weight', value: total },
        ],
        components: { ...parent },
        edgeOrder: edges.map((edge) => edge.id),
        edgeStates: { ...edgeStates },
        acceptedEdges: [...accepted],
        summary,
      },
    });
  };
  add(
    '1',
    'ready',
    'One component per node',
    'Each node starts as its own disjoint set. We will connect components without creating cycles.',
  );
  add(
    '2',
    'inspect',
    'Sort edges by weight',
    'Process the lightest edges first. Equal weights keep their input order.',
  );
  for (const edge of edges) {
    current = edge.from;
    edgeId = edge.id;
    edgeStates[edge.id] = 'active';
    add(
      '3',
      'inspect',
      `Inspect ${edge.from} — ${edge.to} (${edge.weight})`,
      'Try the next edge in the sorted list. Amber marks the edge being considered.',
    );
    rootU = root(edge.from);
    rootV = root(edge.to);
    add(
      '4',
      'inspect',
      `Find roots: ${rootU} and ${rootV}`,
      'Follow parent links in the disjoint-set forest. Nodes with the same root are already connected.',
    );
    if (rootU === rootV) {
      edgeStates[edge.id] = 'discarded';
      add(
        '5',
        'skip',
        'Reject: this edge creates a cycle',
        `${edge.from} and ${edge.to} already belong to component ${rootU}. Adding this edge cannot connect a new component.`,
      );
      continue;
    }
    if (size[rootU] < size[rootV]) {
      [rootU, rootV] = [rootV, rootU];
    }
    parent[rootV] = rootU;
    size[rootU] += size[rootV];
    components--;
    add(
      '6',
      'discover',
      `Union ${rootV} into ${rootU}`,
      'Attach the smaller component to the larger one. The forest and component table now show their shared root.',
    );
    accepted.push(edge.id);
    total += edge.weight;
    edgeStates[edge.id] = 'found';
    add(
      '7',
      'relax',
      `Accept edge · total ${total}`,
      'Teal edges form the growing minimum spanning forest. We keep scanning so you can see why later cycle edges are rejected.',
    );
  }
  current = null;
  edgeId = null;
  const summary = `${components <= 1 ? 'Minimum spanning tree' : 'Minimum spanning forest'} · weight ${total} · ${accepted.length} edges · ${components} component${components === 1 ? '' : 's'}`;
  add(
    '8',
    'done',
    'Finished building the minimum spanning forest',
    components > 1
      ? 'This graph is disconnected, so no single spanning tree exists. Kruskal finds a minimum spanning tree within each connected component.'
      : 'Every node is connected with no cycles. A connected graph with V nodes needs V − 1 selected edges.',
    summary,
  );
  return steps;
}
