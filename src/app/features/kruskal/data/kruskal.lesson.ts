import type { GraphLessonConfig } from '../../../core/graph-lesson';
import { kruskalSteps } from '../algorithm/kruskal.algorithm';
import { KRUSKAL_ALGORITHM } from './kruskal.metadata';
import { KRUSKAL_EXAMPLES } from './kruskal.examples';
import { KRUSKAL_CODE } from './kruskal.code';

export const KRUSKAL_LESSON: GraphLessonConfig = {
  algorithm: KRUSKAL_ALGORITHM,
  examples: KRUSKAL_EXAMPLES,
  implementations: KRUSKAL_CODE,
  makeSteps: kruskalSteps,
  kind: 'kruskal',
  articleTitle: 'Connect every node at the smallest total cost.',
  article: [
    'A minimum spanning tree connects every node of an undirected graph with no cycles and the smallest possible sum of edge weights. It solves a network-building problem: which connections should we pay for? It does not compute shortest routes from a start node.',
    'Kruskal sorts all edges from lightest to heaviest. For each edge, it checks whether its endpoints already belong to the same connected component. Different components can be joined safely; an edge inside one component would create a cycle and is rejected.',
    'A disjoint-set union structure stores one parent link per node. Follow those links to find a component root. Union attaches the smaller component to the larger one, keeping the forest shallow. This version uses union by size without path compression so every parent link stays easy to follow in the dry run.',
    'Watch the sorted edge list, amber candidate edge, teal selected edges, and disjoint-set forest together. A connected graph finishes with V − 1 selected edges. A disconnected graph produces a minimum spanning forest, with one tree per connected component. Negative weights are allowed, and equal weights keep their input order.',
  ],
  takeaways: [
    'Sort by weight, then compare component roots',
    'Same root means a cycle: reject the edge',
    'Different roots: union and add the edge weight',
  ],
  practice: [
    {
      number: 1584,
      title: 'Min Cost to Connect All Points',
      url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
      difficulty: 'Medium',
      relevance:
        'Build edges weighted by Manhattan distance, then use Kruskal to construct a minimum spanning tree.',
    },
    {
      number: 684,
      title: 'Redundant Connection',
      url: 'https://leetcode.com/problems/redundant-connection/',
      difficulty: 'Medium',
      relevance:
        'Practice the union-find cycle check used by Kruskal; find the edge whose endpoints are already connected.',
    },
  ],
};
