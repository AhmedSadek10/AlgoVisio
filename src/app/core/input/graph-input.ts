import type { GraphData, GraphEdge, GraphLessonConfig } from '../graph-lesson';

export interface GraphDraft {
  readonly nodes: string;
  readonly edges: string;
  readonly directed: boolean;
}

/** Validate the entire draft before the lesson replaces its active graph. */
export function parseGraphInput(draft: GraphDraft, kind: GraphLessonConfig['kind']): GraphData {
  const weighted = kind !== 'dfs' && kind !== 'bfs';
  if (kind === 'kruskal' && draft.directed) {
    throw new Error('Kruskal requires an undirected graph. Turn off directed edges.');
  }
  const nodes = draft.nodes
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);
  if (nodes.length < 1 || nodes.length > 12) {
    throw new Error('Enter 1 to 12 node names, separated by commas or spaces.');
  }
  if (
    nodes.some((node) => !/^[A-Za-z][A-Za-z0-9_-]{0,7}$/.test(node)) ||
    new Set(nodes).size !== nodes.length
  ) {
    throw new Error('Use unique node names starting with a letter (up to 8 characters).');
  }
  const lines = draft.edges
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 30) {
    throw new Error('Use at most 30 edges so the graph stays readable.');
  }
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  for (const [index, line] of lines.entries()) {
    const parts = line.split(/[\s,]+/).filter(Boolean);
    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Edge line ${index + 1}: use FROM TO${weighted ? ' WEIGHT' : ''}.`);
    }
    const [from, to, weightText] = parts;
    if (!nodes.includes(from) || !nodes.includes(to) || from === to) {
      throw new Error(
        `Edge line ${index + 1}: both ends must be different nodes in your node list.`,
      );
    }
    const weight = weightText === undefined ? 1 : Number(weightText);
    const minimum = kind === 'bellman-ford' || kind === 'kruskal' ? -99 : 0;
    if (!Number.isInteger(weight) || weight < minimum || weight > 99) {
      throw new Error(
        `Edge line ${index + 1}: weight must be a whole number from ${minimum} to 99.`,
      );
    }
    const endpoints = draft.directed ? [from, to] : [from, to].sort();
    const key = JSON.stringify(endpoints);
    if (seen.has(key)) {
      throw new Error(`Edge line ${index + 1}: this edge is listed twice.`);
    }
    seen.add(key);
    edges.push({ id: `edge-${index}`, from, to, weight });
  }

  return { nodes, edges, directed: draft.directed };
}
