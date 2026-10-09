import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';
export const LOWEST_COMMON_ANCESTOR_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'lowest-common-ancestor',
  name: 'Lowest common ancestor',
  category: 'Trees',
  icon: '⑂',
  description: 'Find the deepest shared ancestor of two selected nodes in a binary tree.',
  requirement: 'Select two existing nodes. Works with duplicate values and does not require a BST.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) stack',
  available: true,
};
