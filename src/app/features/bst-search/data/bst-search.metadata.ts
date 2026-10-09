import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';
export const BST_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'bst-search',
  name: 'BST search',
  category: 'Trees',
  icon: '⑂',
  description:
    'Search a binary search tree by comparing the target and choosing one branch at a time.',
  requirement: 'A valid binary search tree with unique values.',
  timeComplexity: 'O(h)',
  spaceComplexity: 'O(1)',
  available: true,
};
