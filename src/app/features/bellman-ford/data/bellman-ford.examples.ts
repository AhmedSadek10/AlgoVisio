import type { GraphExample } from '../../../core/graph-lesson';

export const BELLMAN_FORD_EXAMPLES: readonly GraphExample[] = [
  {
    label: 'Small example',
    nodes: ['A', 'B', 'C', 'D'],
    edges: [
      ['C', 'D', 2],
      ['B', 'C', -2],
      ['A', 'B', 4],
      ['A', 'C', 5],
    ],
    directed: true,
    start: 'A',
    target: 'D',
  },
  {
    label: 'Negative cycle',
    nodes: ['A', 'B', 'C'],
    edges: [
      ['A', 'B', 1],
      ['B', 'C', -3],
      ['C', 'B', 1],
    ],
    directed: true,
    start: 'A',
    target: 'C',
  },
  {
    label: 'Unreachable cycle',
    nodes: ['A', 'B', 'C', 'D'],
    edges: [
      ['A', 'B', 2],
      ['C', 'D', -3],
      ['D', 'C', 1],
    ],
    directed: true,
    start: 'A',
    target: 'D',
  },
];
