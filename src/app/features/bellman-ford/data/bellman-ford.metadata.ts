import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const BELLMAN_FORD_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'bellman-ford',
  name: 'Bellman–Ford',
  category: 'Graphs',
  icon: '⇄',
  description:
    'Bellman–Ford finds shortest paths by repeatedly relaxing every edge. It supports negative weights and detects negative cycles reachable from the start.',
  requirement: 'A reachable negative cycle means affected routes have no finite shortest distance.',
  timeComplexity: 'O(V × E)',
  spaceComplexity: 'O(V + E)',
  available: true,
};
