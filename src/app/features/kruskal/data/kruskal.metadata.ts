import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const KRUSKAL_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'kruskal',
  name: 'Kruskal’s algorithm',
  category: 'Graphs',
  icon: '⋈',
  description:
    'Kruskal’s algorithm builds a minimum spanning tree by taking the lightest edges that connect different components without creating a cycle.',
  requirement:
    'Requires an undirected weighted graph. Disconnected graphs produce a minimum spanning forest.',
  timeComplexity: 'O(V + E log E)',
  spaceComplexity: 'O(V + E)',
  available: true,
};
