import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';
export const MERGE_SORT_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'merge-sort',
  name: 'Merge sort',
  category: 'Sorting',
  icon: '⇅',
  description: 'Split the array into halves, then merge them in order.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  available: true,
};
