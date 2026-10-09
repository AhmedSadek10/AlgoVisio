import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const LINEAR_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'linear-search',
  name: 'Linear search',
  category: 'Searching',
  icon: '→',
  description:
    'Linear search checks each value in order until it finds the target or reaches the end. It works with any list, even when the values are unsorted.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  available: true,
};
