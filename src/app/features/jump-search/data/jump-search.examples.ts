import type { SearchExample } from '../../../core/search-lesson';

export const JUMP_SEARCH_EXAMPLES: readonly SearchExample[] = [
  {
    label: 'Easy to find',
    values: [3, 8, 12, 17, 23, 29, 34, 41, 48, 56, 63],
    target: 34,
  },
  {
    label: 'At the edge',
    values: [2, 6, 11, 15, 19, 24, 31, 38, 45, 52, 60],
    target: 60,
  },
  {
    label: 'Not found',
    values: [4, 9, 14, 20, 26, 32, 39, 46, 54, 61, 70],
    target: 35,
  },
];
