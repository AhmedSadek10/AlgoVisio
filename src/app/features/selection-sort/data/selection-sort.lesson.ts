import type { SortingLessonConfig } from '../../../core/sorting-lesson';
import { selectionSortSteps } from '../algorithm/selection-sort.algorithm';
import { SELECTION_SORT_ALGORITHM } from './selection-sort.metadata';
import { SELECTION_SORT_EXAMPLES } from './selection-sort.examples';
import { SELECTION_SORT_CODE } from './selection-sort.code';

export const SELECTION_SORT_LESSON: SortingLessonConfig = {
  algorithm: SELECTION_SORT_ALGORITHM,
  examples: SELECTION_SORT_EXAMPLES,
  implementations: SELECTION_SORT_CODE,
  makeSteps: selectionSortSteps,
  article: [
    'Selection sort divides the array into a finished prefix and an unsorted suffix. Scan the suffix to find its smallest value, then swap that value into the first unfinished position.',
    'Remembering a minimum index does not move any values. Only after the whole scan does the algorithm perform a swap. Each pass fixes one position, so it uses at most n − 1 swaps.',
    'Selection sort makes n(n − 1)/2 value comparisons even on sorted input, so its time is O(n²). It uses O(1) auxiliary space. Distant swaps make it unstable: in [2a, 2b, 1], the first swap gives [1, 2b, 2a].',
  ],
  takeaways: [
    'Find the minimum before swapping',
    'Each pass fixes one prefix position',
    'Few swaps, but quadratic comparisons',
    'Distant swaps can reorder equal values',
  ],
  practice: [
    {
      number: 1051,
      title: 'Height Checker',
      url: 'https://leetcode.com/problems/height-checker/',
      difficulty: 'Easy',
      relevance:
        'Selection-sort a copy by repeatedly choosing the minimum, then compare it with the original heights. The input has at most 100 values.',
    },
    {
      number: 2164,
      title: 'Sort Even and Odd Indices Independently',
      url: 'https://leetcode.com/problems/sort-even-and-odd-indices-independently/',
      difficulty: 'Easy',
      relevance:
        'Select minima for even indices and maxima for odd indices. Small inputs let you practice selection sort in both directions.',
    },
  ],
};
