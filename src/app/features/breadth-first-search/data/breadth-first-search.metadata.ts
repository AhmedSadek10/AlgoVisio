import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const BREADTH_FIRST_SEARCH_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'breadth-first-search',
  name: 'Breadth-first search',
  category: 'Graphs',
  icon: '◎',
  description:
    'Breadth-first search explores a graph one layer at a time, visiting every nearby node before moving farther away.',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  available: true,
};
