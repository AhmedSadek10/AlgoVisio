import type { TreeExample } from '../../../core/tree-lesson';
export const BST_SEARCH_EXAMPLES: readonly TreeExample[] = [
  {
    label: 'Find 7',
    input: '8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13',
    query: {
      target: 7,
    },
  },
  {
    label: 'Missing target',
    input: '8, 3, 10, 1, 6, null, 14',
    query: {
      target: 5,
    },
  },
  {
    label: 'At the root',
    input: '8, 3, 10',
    query: {
      target: 8,
    },
  },
  {
    label: 'Chain',
    input: '1, null, 2, null, 3, null, 4',
    query: {
      target: 4,
    },
  },
  {
    label: 'Empty',
    input: 'null',
    query: {
      target: 7,
    },
  },
];
