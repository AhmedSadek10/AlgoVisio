import type { TreeNode, TreeQuery } from '../tree-lesson';
import type { CodeLanguage } from '../visualization/algorithm-code';

/** Build targets from the actual tree objects, preserving duplicate-value identities. */
export function lcaInputCode(
  language: CodeLanguage,
  nodes: readonly TreeNode[],
  query: TreeQuery,
): string {
  const nil = language === 'python' ? 'None' : 'null';
  const reference = (id: string | undefined): string =>
    nodes.some((node) => node.id === id) ? `node${id}` : nil;
  const declarations = [...nodes].reverse().map((node) => {
    const left = reference(node.left?.id);
    const right = reference(node.right?.id);
    if (language === 'typescript') {
      return `const node${node.id}: TreeNode = { val: ${node.value}, left: ${left}, right: ${right} };`;
    }
    const expression = `${language === 'python' ? '' : 'new '}TreeNode(${node.value}, ${left}, ${right})`;
    if (language === 'python') {
      return `node${node.id} = ${expression}`;
    }
    return `TreeNode node${node.id} = ${expression};`;
  });
  const root = reference(nodes[0]?.id);
  const p = reference(query.first);
  const q = reference(query.second);
  if (language === 'typescript') {
    return [
      ...declarations,
      `const root = ${root};`,
      `const p = ${p};`,
      `const q = ${q};`,
      'const ancestor = lowestCommonAncestor(root, p, q);',
      'console.log(ancestor?.val ?? null);',
    ].join('\n');
  }
  if (language === 'python') {
    return [
      ...declarations,
      `root = ${root}`,
      `p = ${p}`,
      `q = ${q}`,
      'ancestor = lowestCommonAncestor(root, p, q)',
      'print(ancestor.val if ancestor is not None else None)',
    ].join('\n');
  }
  const cs = language === 'csharp';
  const type = cs ? 'TreeNode?' : 'TreeNode';
  const main = cs ? 'static void Main()' : 'public static void main(String[] args)';
  const call = cs
    ? 'new Solution().LowestCommonAncestor(root, p, q)'
    : 'new Solution().lowestCommonAncestor(root, p, q)';
  const print = cs
    ? 'Console.WriteLine(ancestor?.val);'
    : 'System.out.println(ancestor == null ? null : ancestor.val);';
  return `  ${main} {\n${[...declarations, `${type} root = ${root};`, `${type} p = ${p};`, `${type} q = ${q};`, `${type} ancestor = ${call};`, print].map((line) => `    ${line}`).join('\n')}\n  }`;
}
