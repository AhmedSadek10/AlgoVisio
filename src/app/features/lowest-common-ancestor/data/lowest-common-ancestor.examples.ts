import type { TreeExample } from '../../../core/tree-lesson';
export const LOWEST_COMMON_ANCESTOR_EXAMPLES: readonly TreeExample[] = [
  {
    label: '3 and 8',
    input: '5, 3, 8, 1, 4, 7, 9, null, 2',
    query: { first: '1', second: '2' },
  },
  {
    label: 'Opposite subtrees',
    input: '3, 5, 1, 6, 2, 0, 8, null, null, 7, 4',
    query: {
      first: '1',
      second: '2',
    },
  },
  {
    label: 'Ancestor target',
    input: '3, 5, 1, 6, 2, 0, 8, null, null, 7, 4',
    query: {
      first: '1',
      second: '8',
    },
  },
  {
    label: 'Same node',
    input: '3, 5, 1',
    query: {
      first: '1',
      second: '1',
    },
  },
  {
    label: 'Duplicate values',
    input: '1, 2, 2, 3, null, null, 3',
    query: {
      first: '3',
      second: '4',
    },
  },
  {
    label: 'Empty',
    input: 'null',
  },
];
