import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';
export const TREE_DIAMETER_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'tree-diameter',
  name: 'Tree diameter',
  category: 'Trees',
  icon: '⑂',
  description:
    'Find the longest path between any two nodes. Compute subtree heights and watch the best path grow.',
  requirement: 'Any binary tree. Diameter is measured in edges.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) stack',
  available: true,
};
