import type { TreeNode } from '../tree-lesson';

/** Level-order tokens consume child slots only for non-null parents. */
export function parseTree(text: string): TreeNode[] {
  const tokens = text
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean);
  if (!tokens.length || tokens.length > 31) {
    throw new Error('Enter 1–31 values or null child slots.');
  }
  const values = tokens.map((token) => {
    if (token.toLowerCase() === 'null') {
      return null;
    }
    if (
      !/^-?\d+$/.test(token) ||
      !Number.isSafeInteger(Number(token)) ||
      Math.abs(Number(token)) > 999
    ) {
      throw new Error('Use whole numbers from -999 to 999, or null for a missing child.');
    }
    return Number(token);
  });
  if (values[0] === null) {
    if (values.slice(1).some((value) => value !== null)) {
      throw new Error('An empty root cannot have children.');
    }
    return [];
  }
  const nodes: TreeNode[] = [];
  const make = (value: number, parentId: string | null, side: TreeNode['side']): TreeNode => {
    const node: TreeNode = {
      id: String(nodes.length),
      value,
      parentId,
      side,
      left: null,
      right: null,
    };
    nodes.push(node);
    return node;
  };
  make(values[0], null, 'root');
  let index = 1;
  for (let parent = 0; parent < nodes.length && index < values.length; parent++) {
    for (const side of ['left', 'right'] as const) {
      if (index >= values.length) {
        break;
      }
      const value = values[index++];
      if (value !== null) {
        nodes[parent][side] = make(value, nodes[parent].id, side);
      }
    }
  }
  if (index < values.length) {
    throw new Error('Extra child slots have no parent. Remove the trailing values.');
  }
  return nodes;
}
