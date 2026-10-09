import type { SortingLessonConfig } from '../../../core/sorting-lesson';
import { bubbleSortSteps } from '../algorithm/bubble-sort.algorithm';
import { BUBBLE_SORT_ALGORITHM } from './bubble-sort.metadata';
import { BUBBLE_SORT_EXAMPLES } from './bubble-sort.examples';
import { BUBBLE_SORT_CODE } from './bubble-sort.code';

export const BUBBLE_SORT_LESSON: SortingLessonConfig = {
  algorithm: BUBBLE_SORT_ALGORITHM,
  examples: BUBBLE_SORT_EXAMPLES,
  implementations: BUBBLE_SORT_CODE,
  makeSteps: bubbleSortSteps,
  article: [
    'Bubble sort compares neighbors from left to right. If a pair is out of order, swap it. A large value can move right repeatedly in one pass until it reaches its final position.',
    'After each pass, shrink the unsorted region by one. The largest values form a sorted suffix that later passes never touch. If a complete pass makes no swaps, every neighboring pair is ordered and the algorithm stops early.',
    'This version takes O(n) time on an already sorted array and O(n²) in the worst case. It uses O(1) auxiliary space and is stable because equal values are never swapped.',
  ],
  takeaways: [
    'Compare adjacent values',
    'A sorted suffix grows from the right',
    'No swaps means stop early',
    'Stable, but slow for large arrays',
  ],
  practice: [
    {
      number: 1051,
      title: 'Height Checker',
      url: 'https://leetcode.com/problems/height-checker/',
      difficulty: 'Easy',
      relevance:
        'Bubble-sort a copy, then count positions that differ from the original. At most 100 values make quadratic practice practical.',
    },
    {
      number: 2164,
      title: 'Sort Even and Odd Indices Independently',
      url: 'https://leetcode.com/problems/sort-even-and-odd-indices-independently/',
      difficulty: 'Easy',
      relevance:
        'Use adjacent swaps within the even and odd subsequences, sorting them in opposite directions. The input has at most 100 values.',
    },
  ],
};
