import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';
export const QUICK_SORT_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'quick-sort',
  name: 'Quick sort',
  category: 'Sorting',
  icon: '⇅',
  description: 'Partition around a pivot, then sort the smaller ranges.',
  timeComplexity: 'O(n log n) average · O(n²) worst',
  spaceComplexity: 'O(log n) average · O(n) worst',
  available: true,
};
