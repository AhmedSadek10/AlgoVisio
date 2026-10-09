import type { SortingLessonConfig } from '../../../core/sorting-lesson';
import { mergeSortSteps } from '../algorithm/merge-sort.algorithm';
import { MERGE_SORT_ALGORITHM } from './merge-sort.metadata';
import { MERGE_SORT_EXAMPLES } from './merge-sort.examples';
import { MERGE_SORT_CODE } from './merge-sort.code';
export const MERGE_SORT_LESSON: SortingLessonConfig = {
  algorithm: MERGE_SORT_ALGORITHM,
  examples: MERGE_SORT_EXAMPLES,
  implementations: MERGE_SORT_CODE,
  makeSteps: mergeSortSteps,
  showMergeBuffers: true,
  article: [
    'Merge sort splits a range into two halves until each range contains one value. It then combines sorted halves, building larger ordered ranges on the way back up.',
    'Copy both halves into temporary arrays. Compare their next values and write the smaller one back. Choose the left value on ties to preserve stability. Copy the remaining values when one half runs out. The buffer panel keeps values visible while destination slots are overwritten.',
    'Merge sort takes O(n log n) time in the best, average, and worst cases and O(n) auxiliary space. Teal marks the range just merged; these values can still move in later merges. Array writes count destination slots, excluding temporary buffer copies.',
  ],
  takeaways: [
    'Split before merging',
    'Read from temporary sorted halves',
    'Choose the left value on a tie',
    'Merged ranges can move in later merges',
  ],
  practice: [
    {
      number: 88,
      title: 'Merge Sorted Array',
      url: 'https://leetcode.com/problems/merge-sorted-array/',
      difficulty: 'Easy',
      relevance: 'Practice the merge step alone, combining two sorted arrays with two pointers.',
    },
    {
      number: 912,
      title: 'Sort an Array',
      url: 'https://leetcode.com/problems/sort-an-array/',
      difficulty: 'Medium',
      relevance: 'Apply divide, recursively sort, and merge to achieve O(n log n) time.',
    },
    {
      number: 148,
      title: 'Sort List',
      url: 'https://leetcode.com/problems/sort-list/',
      difficulty: 'Medium',
      relevance:
        'Adapt merge sort to linked lists by splitting the list and merging sorted halves.',
    },
  ],
};
