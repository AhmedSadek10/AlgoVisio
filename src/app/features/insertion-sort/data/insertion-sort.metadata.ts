import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const INSERTION_SORT_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'insertion-sort',
  name: 'Insertion sort',
  category: 'Sorting',
  icon: '↳',
  description:
    'Grow a sorted prefix by taking the next value and shifting larger values right until there is room to insert it.',
  timeComplexity: 'O(n²) worst · O(n) best',
  spaceComplexity: 'O(1)',
  available: true,
};
