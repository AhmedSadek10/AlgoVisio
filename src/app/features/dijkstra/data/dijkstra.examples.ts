import type { GraphExample } from '../../../core/graph-lesson';

export const DIJKSTRA_EXAMPLES: readonly GraphExample[] = [
  {
    label: 'Small example',
    nodes: ['A', 'B', 'C'],
    edges: [
      ['A', 'B', 4],
      ['A', 'C', 1],
      ['C', 'B', 2],
    ],
    directed: true,
    start: 'A',
    target: 'B',
  },
  {
    label: 'Larger graph',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    edges: [
      ['A', 'B', 4],
      ['A', 'C', 2],
      ['B', 'C', 1],
      ['B', 'D', 5],
      ['C', 'D', 8],
      ['C', 'E', 10],
      ['D', 'E', 2],
      ['D', 'F', 6],
      ['E', 'F', 3],
    ],
    directed: false,
    start: 'A',
    target: 'F',
  },
  {
    label: 'Unreachable',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    edges: [
      ['A', 'B', 3],
      ['B', 'C', 2],
      ['A', 'C', 7],
      ['D', 'E', 1],
      ['E', 'F', 2],
    ],
    directed: false,
    start: 'A',
    target: 'F',
  },
];
