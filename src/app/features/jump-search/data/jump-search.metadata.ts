import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const JUMP_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'jump-search',
  name: 'Jump search',
  category: 'Searching',
  icon: '↷',
  description:
    'Jump search skips ahead in blocks of roughly √n values, then scans the block that could contain the target.',
  requirement: 'The array must be sorted before jump search can work.',
  timeComplexity: 'O(√n)',
  spaceComplexity: 'O(1)',
  available: true,
};
