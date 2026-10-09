import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const DIJKSTRA_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'dijkstra',
  name: 'Dijkstra’s algorithm',
  category: 'Graphs',
  icon: '↗',
  description:
    'Dijkstra’s algorithm finds shortest paths from a starting node in a graph with non-negative edge weights.',
  requirement: 'Edge weights must be non-negative.',
  timeComplexity: 'O((V + E) log V)',
  spaceComplexity: 'O(V + E)',
  available: true,
};
