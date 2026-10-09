import type { SearchLessonConfig } from '../../../core/search-lesson';
import { binarySearchSteps } from '../algorithm/binary-search.algorithm';
import { BINARY_SEARCH_ALGORITHM } from './binary-search.metadata';
import { BINARY_SEARCH_EXAMPLES } from './binary-search.examples';
import { BINARY_SEARCH_CODE } from './binary-search.code';

export const BINARY_SEARCH_LESSON: SearchLessonConfig = {
  algorithm: BINARY_SEARCH_ALGORITHM,
  examples: BINARY_SEARCH_EXAMPLES,
  implementations: BINARY_SEARCH_CODE,
  makeSteps: binarySearchSteps,
  requiresSorted: true,
  bounds: ['LOW', 'MID', 'HIGH'],
  idea: 'On a sorted list, compare the middle value with the target. Each comparison lets you remove half of the remaining values.',
  ideaSteps: [
    'Start with the full range',
    'Check the middle value',
    'Keep only the possible half',
    'Repeat until found or empty',
  ],
  insightTitle: 'Why it’s fast',
  insight: 'Each comparison halves the work. A million items take at most about 20 checks.',
  practice: [
    {
      number: 704,
      title: 'Binary Search',
      url: 'https://leetcode.com/problems/binary-search/',
      difficulty: 'Easy',
      relevance: 'Apply the same low, mid, and high bounds to locate a target in a sorted array.',
    },
    {
      number: 35,
      title: 'Search Insert Position',
      url: 'https://leetcode.com/problems/search-insert-position/',
      difficulty: 'Easy',
      relevance: 'Adapt binary search to return the insertion boundary when the target is absent.',
    },
  ],
};
