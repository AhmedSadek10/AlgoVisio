import type { GraphExample } from '../../../core/graph-lesson';

export const KRUSKAL_EXAMPLES: readonly GraphExample[] = [
  {
    label: 'Small example',
    nodes: ['A', 'B', 'C', 'D'],
    edges: [
      ['A', 'B', 1],
      ['B', 'C', 2],
      ['A', 'C', 3],
      ['C', 'D', 4],
      ['B', 'D', 5],
    ],
    directed: false,
    start: 'A',
  },
  {
    label: 'Disconnected',
    nodes: ['A', 'B', 'C', 'D'],
    edges: [
      ['A', 'B', 2],
      ['C', 'D', 1],
    ],
    directed: false,
    start: 'A',
  },
  {
    label: 'Negative weights',
    nodes: ['A', 'B', 'C'],
    edges: [
      ['A', 'B', -2],
      ['B', 'C', 1],
      ['A', 'C', 4],
    ],
    directed: false,
    start: 'A',
  },
];
