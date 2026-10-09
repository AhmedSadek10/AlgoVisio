import type { TreeExample } from '../../../core/tree-lesson';
export const TREE_DIAMETER_EXAMPLES: readonly TreeExample[] = [
  {
    label: 'Balanced',
    input: '1, 2, 3, 4, 5',
  },
  {
    label: 'Below the root',
    input: '1, 2, null, 3, 4, 5, null, null, 6, 7, null, null, 8',
  },
  {
    label: 'Chain',
    input: '1, null, 2, null, 3, null, 4',
  },
  {
    label: 'Single node',
    input: '9',
  },
  {
    label: 'Empty',
    input: 'null',
  },
];
