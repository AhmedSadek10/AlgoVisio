import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const DEPTH_FIRST_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'depth-first-search',
  name: 'Depth-first search',
  category: 'Graphs',
  icon: '◇',
  description:
    'Depth-first search explores one path through a graph as far as it can before backtracking to try another path.',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  available: true,
};
