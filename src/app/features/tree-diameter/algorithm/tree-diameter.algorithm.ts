import type { TreeNode, TreeStep } from '../../../core/tree-lesson';

export function treeDiameterSteps(nodes: readonly TreeNode[]): TreeStep[] {
  const steps: TreeStep[] = [];
  const stack: string[] = [];
  const visited: string[] = [];
  const details: Record<string, string> = {};
  let best: string[] = [];
  const add = (
    title: string,
    explanation: string,
    key: string,
    active: string | null,
    highlighted: string[] = best,
  ) => {
    steps.push({
      title,
      explanation,
      key,
      active,
      stack: [...stack],
      visited: [...visited],
      details: { ...details },
      highlighted: [...highlighted],
      result: `Diameter: ${Math.max(0, best.length - 1)} edges`,
    });
  };
  add(
    'Compute heights from the leaves',
    'An empty subtree has height 0. A leaf has height 1. At each node, left height + right height gives the path length in edges through that node.',
    'start',
    null,
  );
  const height = (node: TreeNode | null): string[] => {
    if (!node) {
      add('Empty subtree', 'Return height 0 to the parent.', 'empty', stack.at(-1) ?? null);
      return [];
    }
    stack.push(node.id);
    add(
      `Enter ${node.value}`,
      'Keep this call on the stack while computing both child heights.',
      'enter',
      node.id,
    );
    add('Compute left height', `Process the left subtree of ${node.value}.`, 'left', node.id);
    const left = height(node.left);
    add('Compute right height', `Process the right subtree of ${node.value}.`, 'right', node.id);
    const right = height(node.right);
    const path = [...left].reverse().concat(node.id, right);
    if (path.length > best.length) {
      best = path;
    }
    visited.push(node.id);
    details[node.id] = `height ${1 + Math.max(left.length, right.length)}`;
    add(
      `Combine at ${node.value}`,
      `Left height ${left.length} + right height ${right.length} = ${left.length + right.length} edges through this node. Best so far: ${Math.max(0, best.length - 1)}.`,
      'combine',
      node.id,
      path,
    );
    stack.pop();
    add(
      `Return height ${1 + Math.max(left.length, right.length)}`,
      'Return one plus the larger child height. The global diameter may be entirely inside a subtree.',
      'return',
      node.id,
    );
    return [node.id, ...(left.length >= right.length ? left : right)];
  };
  height(nodes[0] ?? null);
  add(
    'Diameter complete',
    nodes.length
      ? 'The highlighted nodes form a longest path. The path need not pass through the root.'
      : 'The empty tree has diameter 0.',
    'done',
    null,
  );
  return steps;
}
