import type { PracticeProblem } from './practice-problem';
import type { AlgorithmCatalogEntry } from './algorithm-catalog';
import type { AlgorithmImplementation } from './visualization/algorithm-code';

export type TraversalOrder = 'preorder' | 'inorder' | 'postorder';

export interface TreeNode {
  readonly id: string;
  readonly value: number;
  readonly parentId: string | null;
  readonly side: 'root' | 'left' | 'right';
  left: TreeNode | null;
  right: TreeNode | null;
}

export interface TreeStep {
  readonly title: string;
  readonly explanation: string;
  readonly key: string;
  readonly active: string | null;
  readonly stack: readonly string[];
  readonly visited: readonly string[];
  readonly result?: string;
  readonly highlighted?: readonly string[];
  readonly details?: Readonly<Record<string, string>>;
}

export interface TreeQuery {
  readonly target: number;
  readonly first: string;
  readonly second: string;
}

export interface TreeExample {
  readonly label: string;
  readonly input: string;
  readonly query?: Partial<TreeQuery>;
}

export interface TreeLessonConfig {
  readonly practice: readonly PracticeProblem[];
  readonly algorithm: AlgorithmCatalogEntry;
  readonly examples: readonly TreeExample[];
  readonly implementations: Readonly<Record<TraversalOrder, readonly AlgorithmImplementation[]>>;
  readonly makeSteps: (
    nodes: readonly TreeNode[],
    order: TraversalOrder,
    query: TreeQuery,
  ) => TreeStep[];
  readonly operation?: 'diameter' | 'search' | 'ancestor';
  readonly functionName?: string;
  readonly validate?: (nodes: readonly TreeNode[]) => void;
  readonly articleTitle: string;
  readonly article: readonly string[];
  readonly takeaways: readonly string[];
  readonly defaultOrder: TraversalOrder;
}
