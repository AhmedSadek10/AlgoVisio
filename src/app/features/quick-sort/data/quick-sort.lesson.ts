import type { SortingLessonConfig } from '../../../core/sorting-lesson';
import { quickSortSteps } from '../algorithm/quick-sort.algorithm';
import { QUICK_SORT_ALGORITHM } from './quick-sort.metadata';
import { QUICK_SORT_EXAMPLES } from './quick-sort.examples';
import { QUICK_SORT_CODE } from './quick-sort.code';
export const QUICK_SORT_LESSON: SortingLessonConfig = {
  algorithm: QUICK_SORT_ALGORITHM,
  examples: QUICK_SORT_EXAMPLES,
  implementations: QUICK_SORT_CODE,
  makeSteps: quickSortSteps,

  article: [
    'Quick sort chooses a pivot and partitions the range around it. This version uses the last value as the pivot. A boundary marks where the next smaller value belongs.',
    'Scan the range and move values smaller than the pivot before the boundary. Place the pivot at the boundary, then recursively sort the ranges on either side. Teal positions are final and will not move again.',
    'Average time is O(n log n), but choosing the last pivot gives O(n\u00b2) on sorted, reversed, or all-equal arrays. The recursive stack uses O(log n) space on average and O(n) in the worst case. Quick sort is not stable. Randomized pivots are a common improvement.',
  ],
  takeaways: [
    'Choose the last value as pivot',
    'Move smaller values before the boundary',
    'Exclude the finished pivot from recursion',
    'Fixed pivots can produce quadratic time',
  ],
  practice: [
    {
      number: 912,
      title: 'Sort an Array',
      url: 'https://leetcode.com/problems/sort-an-array/',
      difficulty: 'Medium',
      relevance:
        "Implement quicksort with randomized pivots and duplicate-aware partitioning. Avoid the quadratic behavior of the lesson's fixed last pivot.",
    },
    {
      number: 215,
      title: 'Kth Largest Element in an Array',
      url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      difficulty: 'Medium',
      relevance:
        'Extend partitioning into quickselect: continue only in the side containing the requested rank.',
    },
    {
      number: 75,
      title: 'Sort Colors',
      url: 'https://leetcode.com/problems/sort-colors/',
      difficulty: 'Medium',
      relevance:
        'Practice three-way partitioning into values below, equal to, and above a pivot; this problem has only three colors.',
    },
  ],
};
