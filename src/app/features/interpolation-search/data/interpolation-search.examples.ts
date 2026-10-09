import type { SearchExample } from '../../../core/search-lesson';

export const INTERPOLATION_SEARCH_EXAMPLES: readonly SearchExample[] = [
  {
    label: 'Easy to find',
    values: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
    target: 75,
  },
  {
    label: 'At the edge',
    values: [2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 102],
    target: 102,
  },
  {
    label: 'Not found',
    values: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105],
    target: 58,
  },
];
