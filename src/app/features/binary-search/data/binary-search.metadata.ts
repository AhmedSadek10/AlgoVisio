import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const BINARY_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'binary-search',
  name: 'Binary search',
  category: 'Searching',
  icon: '◉',
  description:
    'Binary search finds a target by checking the middle of an array, then discarding the half that cannot contain the answer. Each step cuts the remaining search space roughly in half.',
  requirement: 'The array must be sorted before binary search can work.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  available: true,
};
