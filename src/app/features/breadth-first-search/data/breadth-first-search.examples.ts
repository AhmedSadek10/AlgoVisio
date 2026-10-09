import type { GraphExample } from '../../../core/graph-lesson';

export const BREADTH_FIRST_SEARCH_EXAMPLES: readonly GraphExample[] = [
  {
    label: 'Branching paths',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: [
      ['A', 'B', 1],
      ['A', 'C', 1],
      ['B', 'D', 1],
      ['B', 'E', 1],
      ['C', 'F', 1],
      ['D', 'G', 1],
      ['E', 'G', 1],
      ['F', 'G', 1],
    ],
    directed: false,
    start: 'A',
  },
  {
    label: 'Disconnected',
    nodes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    edges: [
      ['A', 'B', 1],
      ['A', 'C', 1],
      ['B', 'D', 1],
      ['E', 'F', 1],
      ['F', 'G', 1],
    ],
    directed: false,
    start: 'A',
  },
];
