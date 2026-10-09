import type { SearchExample } from '../../../core/search-lesson';

export const LINEAR_SEARCH_EXAMPLES: readonly SearchExample[] = [
  {
    label: 'Easy to find',
    values: [18, 4, 32, 9, 25, 7, 41, 12],
    target: 9,
  },
  {
    label: 'At the edge',
    values: [14, 3, 28, 11, 6, 35, 20, 8],
    target: 8,
  },
  {
    label: 'Not found',
    values: [21, 5, 17, 42, 13, 30, 2, 19],
    target: 99,
  },
];
