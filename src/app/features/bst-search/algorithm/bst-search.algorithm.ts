import type { TreeNode, TreeStep, TreeQuery, TraversalOrder } from '../../../core/tree-lesson';

export function validateBst(nodes: readonly TreeNode[]): void {
  const check = (node: TreeNode | null, low: number, high: number): void => {
    if (!node) {
      return;
    }
    if (node.value <= low || node.value >= high) {
      throw new Error(
        'BST search requires unique values: every left subtree must be smaller and every right subtree larger than its ancestors.',
      );
    }
    check(node.left, low, node.value);
    check(node.right, node.value, high);
  };
  check(nodes[0] ?? null, -Infinity, Infinity);
}

export function bstSearchSteps(
  nodes: readonly TreeNode[],
  _order: TraversalOrder,
  query: TreeQuery,
): TreeStep[] {
  validateBst(nodes);
  const steps: TreeStep[] = [];
  const visited: string[] = [];
  let node: TreeNode | null = nodes[0] ?? null;
  const add = (
    title: string,
    explanation: string,
    key: string,
    highlighted: string[] = [],
    result?: string,
  ) => {
    steps.push({
      title,
      explanation,
      key,
      active: node?.id ?? null,
      stack: node ? [node.id] : [],
      visited: [...visited],
      highlighted,
      result,
    });
  };
  add(
    'Start at the root',
    `Search for ${query.target}. The BST ordering lets us discard one subtree at each comparison.`,
    'start',
  );
  while (node) {
    visited.push(node.id);
    add(
      `Compare with ${node.value}`,
      `Compare target ${query.target} with the current node ${node.value}.`,
      'compare',
    );
    if (query.target === node.value) {
      add(
        'Target found',
        `${node.value} equals the target. Return its value.`,
        'found',
        [node.id],
        `Found ${node.value}`,
      );
      return steps;
    }
    const left: boolean = query.target < node.value;
    add(
      `Go ${left ? 'left' : 'right'}`,
      `${query.target} is ${left ? 'smaller' : 'larger'} than ${node.value}. Continue in its ${left ? 'left' : 'right'} subtree.`,
      left ? 'left' : 'right',
    );
    node = left ? node.left : node.right;
  }
  add(
    'Target absent',
    'Reached a missing child. No node in this BST has the target value.',
    'done',
    [],
    `${query.target} was not found`,
  );
  return steps;
}
