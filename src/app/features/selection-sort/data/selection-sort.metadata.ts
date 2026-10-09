import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const SELECTION_SORT_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'selection-sort',
  name: 'Selection sort',
  category: 'Sorting',
  icon: '↓',
  description:
    'Find the smallest value in the unsorted region, then place it at the next position in the sorted prefix.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  available: true,
};
