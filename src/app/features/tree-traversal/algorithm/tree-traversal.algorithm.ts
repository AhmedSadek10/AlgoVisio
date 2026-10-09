import type { TraversalOrder, TreeNode, TreeStep } from '../../../core/tree-lesson';

export function treeTraversalSteps(nodes: readonly TreeNode[], order: TraversalOrder): TreeStep[] {
  const steps: TreeStep[] = [];
  const stack: string[] = [];
  const visited: string[] = [];
  const add = (title: string, explanation: string, key: string, active: string | null) =>
    steps.push({ title, explanation, key, active, stack: [...stack], visited: [...visited] });
  add(
    'Begin at the root',
    `${order} visits each node once. The stack records unfinished recursive calls.`,
    'start',
    null,
  );
  const walk = (node: TreeNode | null) => {
    if (!node) {
      add(
        'Missing child',
        'This subtree is empty. Return immediately to the parent call.',
        'empty',
        stack.at(-1) ?? null,
      );
      return;
    }
    stack.push(node.id);
    add(
      `Enter ${node.value}`,
      'Push this node onto the call stack. Its children are separate subtrees.',
      'enter',
      node.id,
    );
    const visit = () => {
      visited.push(node.id);
      add(
        `Visit ${node.value}`,
        `Append ${node.value} to the output in ${order} order. Entering a call and visiting a value are different events.`,
        'visit',
        node.id,
      );
    };
    if (order === 'preorder') {
      visit();
    }
    add(
      'Explore the left subtree',
      `Keep ${node.value} on the stack while recursively processing its left child.`,
      'left',
      node.id,
    );
    walk(node.left);
    if (order === 'inorder') {
      visit();
    }
    add(
      'Explore the right subtree',
      `The left subtree is complete. Recursively process the right child of ${node.value}.`,
      'right',
      node.id,
    );
    walk(node.right);
    if (order === 'postorder') {
      visit();
    }
    stack.pop();
    add(
      `Return from ${node.value}`,
      'Both child calls are complete. Pop this frame and resume its parent.',
      'return',
      node.id,
    );
  };
  walk(nodes[0] ?? null);
  add(
    'Traversal complete',
    `Visited ${visited.length} nodes. Time is O(n); recursion uses O(h) space. Storing the output takes another O(n).`,
    'done',
    null,
  );
  return steps;
}
