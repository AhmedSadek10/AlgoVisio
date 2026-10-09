import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const INTERPOLATION_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'interpolation-search',
  name: 'Interpolation search',
  category: 'Searching',
  icon: '⌁',
  description:
    'Interpolation search estimates where the target should be based on its value, then narrows the range after each probe.',
  requirement:
    'The array must be sorted. Evenly distributed values make its estimates most effective.',
  timeComplexity: 'O(log log n) avg',
  spaceComplexity: 'O(1)',
  available: true,
};
