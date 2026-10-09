import type { SortingLessonConfig } from '../../../core/sorting-lesson';
import { insertionSortSteps } from '../algorithm/insertion-sort.algorithm';
import { INSERTION_SORT_ALGORITHM } from './insertion-sort.metadata';
import { INSERTION_SORT_EXAMPLES } from './insertion-sort.examples';
import { INSERTION_SORT_CODE } from './insertion-sort.code';

export const INSERTION_SORT_LESSON: SortingLessonConfig = {
  algorithm: INSERTION_SORT_ALGORITHM,
  examples: INSERTION_SORT_EXAMPLES,
  implementations: INSERTION_SORT_CODE,
  makeSteps: insertionSortSteps,
  article: [
    'Insertion sort works like arranging cards in your hand. Start with one sorted value, hold the next value aside, and find where it belongs in the sorted prefix.',
    'Shift larger values one slot right, then insert the held value into the opening. During shifting, the array can contain temporary duplicates. The held variable keeps the original value safe until insertion.',
    'The prefix is ordered after each pass, but its values may move during later passes. This stable algorithm uses O(1) auxiliary space, takes O(n) time for sorted input, and O(n²) for reverse order. It is useful for small or nearly sorted lists.',
  ],
  takeaways: [
    'Save the next value before shifting',
    'Shift larger values to make room',
    'Sorted prefix positions can still move',
    'Efficient on nearly sorted input',
  ],
  practice: [
    {
      number: 147,
      title: 'Insertion Sort List',
      url: 'https://leetcode.com/problems/insertion-sort-list/',
      difficulty: 'Medium',
      relevance:
        'Apply insertion sort to a linked list: remove each node and insert it into the sorted prefix.',
    },
    {
      number: 1051,
      title: 'Height Checker',
      url: 'https://leetcode.com/problems/height-checker/',
      difficulty: 'Easy',
      relevance:
        'Grow a sorted prefix in a copy of the heights, then count mismatched positions. Small inputs suit insertion sort.',
    },
  ],
};
