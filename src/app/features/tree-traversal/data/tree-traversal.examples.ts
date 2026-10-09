import type { TreeExample } from '../../../core/tree-lesson';

export const TREE_TRAVERSAL_EXAMPLES: readonly TreeExample[] = [
  {
    label: 'Balanced BST',
    input: '8, 4, 12, 2, 6, 10, 14',
  },
  {
    label: 'Missing children',
    input: '1, null, 2, 3',
  },
  {
    label: 'Skewed tree',
    input: '4, 3, null, 2, null, 1',
  },
  {
    label: 'Empty tree',
    input: 'null',
  },
];
