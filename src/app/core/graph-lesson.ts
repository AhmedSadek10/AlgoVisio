import type { PracticeProblem } from './practice-problem';
import { AlgorithmCatalogEntry } from './algorithm-catalog';
import { ItemState, StepVariable } from './visualization/structure-snapshot';

export interface GraphEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly weight: number;
}

export interface GraphData {
  readonly nodes: readonly string[];
  readonly edges: readonly GraphEdge[];
  readonly directed: boolean;
}

export interface HeapEntry {
  readonly id: number;
  readonly node: string;
  readonly distance: number;
}

export interface DijkstraDryRun {
  readonly heap: readonly HeapEntry[];
  readonly activeEntryIds: readonly number[];
  readonly operation: string;
  readonly extracted: HeapEntry | null;
  readonly current: string | null;
  readonly neighbor: string | null;
  readonly weight: number | null;
  readonly candidate: number | null;
  readonly previousDistance: number | null;
  readonly codeKey: string;
}

export type { AlgorithmCodeLine, AlgorithmImplementation } from './visualization/algorithm-code';
import { AlgorithmImplementation } from './visualization/algorithm-code';

export interface GraphStep {
  readonly phase:
    | 'ready'
    | 'visit'
    | 'inspect'
    | 'discover'
    | 'skip'
    | 'backtrack'
    | 'settle'
    | 'relax'
    | 'heap-push'
    | 'heap-pop'
    | 'heap-swap'
    | 'stale'
    | 'done';
  readonly current: string | null;
  readonly edgeId: string | null;
  readonly frontier: readonly string[];
  readonly visited: readonly string[];
  readonly order: readonly string[];
  readonly distances: Readonly<Record<string, number | null>>;
  readonly parents: Readonly<Record<string, string | null>>;
  readonly title: string;
  readonly explanation: string;
  readonly codeLine: number;
  readonly path?: readonly string[];
  readonly dryRun?: DijkstraDryRun;
  readonly trace?: {
    readonly codeKey: string;
    readonly variables: readonly StepVariable[];
    readonly summary?: string;
    readonly comparison?: string;
    readonly edgeStates?: Readonly<Record<string, ItemState>>;
    readonly edgeOrder?: readonly string[];
    readonly components?: Readonly<Record<string, string>>;
    readonly acceptedEdges?: readonly string[];
    readonly negativeCycle?: boolean;
  };
}

export interface GraphExample {
  readonly label: string;
  readonly nodes: readonly string[];
  readonly edges: readonly [string, string, number][];
  readonly directed: boolean;
  readonly start: string;
  readonly target?: string;
}

export interface GraphLessonConfig {
  readonly algorithm: AlgorithmCatalogEntry;
  readonly kind: 'dfs' | 'bfs' | 'dijkstra' | 'kruskal' | 'bellman-ford';
  readonly articleTitle: string;
  readonly article: readonly string[];
  readonly takeaways: readonly string[];
  readonly implementations: readonly AlgorithmImplementation[];
  readonly examples: readonly GraphExample[];
  readonly practice: readonly PracticeProblem[];
  readonly makeSteps: (graph: GraphData, start: string, target: string) => GraphStep[];
}

export function neighbors(graph: GraphData, node: string): { node: string; edge: GraphEdge }[] {
  const result: { node: string; edge: GraphEdge }[] = [];
  for (const edge of graph.edges) {
    if (edge.from === node) {
      result.push({ node: edge.to, edge });
    }
    if (!graph.directed && edge.to === node) {
      result.push({ node: edge.from, edge });
    }
  }
  return result;
}
