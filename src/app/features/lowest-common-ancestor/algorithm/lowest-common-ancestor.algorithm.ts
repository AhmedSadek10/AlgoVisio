import type { TreeNode, TreeStep, TreeQuery, TraversalOrder } from '../../../core/tree-lesson';

export function lowestCommonAncestorSteps(
  nodes: readonly TreeNode[],
  _order: TraversalOrder,
  query: TreeQuery,
): TreeStep[] {
  const steps: TreeStep[] = [];
  const stack: string[] = [];
  const visited: string[] = [];
  const details: Record<string, string> = {};
  const p = nodes.find((node) => node.id === query.first) ?? null;
  const q = nodes.find((node) => node.id === query.second) ?? null;
  let finalKey = 'base';
  const label = (node: TreeNode | null) => (node ? `${node.value} (node ${node.id})` : 'null');
  const add = (
    title: string,
    explanation: string,
    key: string,
    active: string | null,
    highlighted: string[] = [],
    result?: string,
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
      result,
    });
  };
  add(
    'Find the shared ancestor',
    `Call LowestCommonAncestor(root, p, q) with p = ${label(p)} and q = ${label(q)}. Compare node references, not values. Both targets must exist.`,
    'start',
    null,
  );
  if (!p || !q) {
    add(
      'No ancestor',
      'Both selected nodes must exist in the tree. An empty tree returns null.',
      'base',
      null,
      [],
      'No common ancestor',
    );
    return steps;
  }
  const lowestCommonAncestor = (root: TreeNode | null): TreeNode | null => {
    if (root) {
      stack.push(root.id);
      visited.push(root.id);
    }
    add(
      root ? `Check ${label(root)}` : 'Check an empty subtree',
      'Evaluate root == null || root == p || root == q. A matching condition ends this call immediately.',
      'enter',
      root?.id ?? stack.at(-1) ?? null,
    );
    if (root === null || root === p || root === q) {
      if (root) {
        details[root.id] = `returns ${root.value}`;
        stack.pop();
      }
      add(
        root ? 'Return the selected node' : 'Return null',
        root
          ? `root is ${root === p ? 'p' : 'q'}. Return this node. If the other target is below it, this node is already their LCA.`
          : 'root is null. This empty subtree contributes no target.',
        'base',
        root?.id ?? stack.at(-1) ?? null,
        root ? [root.id] : [],
      );
      return root;
    }
    add(
      'Search the left subtree',
      `Keep ${root.value} on the call stack. Assign the recursive result to left.`,
      'left',
      root.id,
    );
    const left = lowestCommonAncestor(root.left);
    add(
      'Search the right subtree',
      `left = ${label(left)}. Now assign the right subtree result to right.`,
      'right',
      root.id,
    );
    const right = lowestCommonAncestor(root.right);
    add(
      'Check both returned results',
      `left = ${label(left)}; right = ${label(right)}. Check left != null && right != null.`,
      'combine',
      root.id,
    );
    if (left !== null && right !== null) {
      details[root.id] = `returns ${root.value}`;
      if (root === nodes[0]) {
        finalKey = 'ancestor';
      }
      stack.pop();
      add(
        `Return ${root.value}: both sides found a result`,
        'The target paths meet here. Return root as their lowest common ancestor.',
        'ancestor',
        root.id,
        [root.id],
      );
      return root;
    }
    const answer = left ?? right;
    details[root.id] = `returns ${answer?.value ?? 'null'}`;
    if (root === nodes[0]) {
      finalKey = 'return';
    }
    stack.pop();
    add(
      `Return ${label(answer)}`,
      left
        ? 'left is non-null, so left ?? right returns left. Pass this target or deeper ancestor upward unchanged.'
        : right
          ? 'left is null, so left ?? right returns right. Pass this target or deeper ancestor upward unchanged.'
          : 'Both results are null, so left ?? right returns null.',
      'return',
      root.id,
      answer ? [answer.id] : [],
    );
    return answer;
  };
  const ancestor = lowestCommonAncestor(nodes[0] ?? null)!;
  add(
    'Lowest common ancestor found',
    `The initial call returned ${label(ancestor)}. This is the deepest ancestor shared by p and q.`,
    finalKey,
    null,
    [ancestor.id],
    `LCA: ${ancestor.value} (node ${ancestor.id})`,
  );
  return steps;
}
