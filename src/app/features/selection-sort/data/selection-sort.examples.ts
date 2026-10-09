import type { SortingExample } from '../../../core/sorting-lesson';

export const SELECTION_SORT_EXAMPLES: readonly SortingExample[] = [
  {
    label: 'Mixed values',
    values: [29, 10, 14, 37, 13, 5],
  },
  {
    label: 'Already sorted',
    values: [2, 4, 6, 8, 10, 12],
  },
  {
    label: 'Reverse order',
    values: [12, 10, 8, 6, 4, 2],
  },
  {
    label: 'Duplicates',
    values: [4, 2, 4, 1, 2, 1],
  },
  {
    label: 'Negative values',
    values: [-3, 7, 0, -8, 2, -1],
  },
  {
    label: 'Single value',
    values: [7],
  },
];
