import type { SearchLessonConfig } from '../../../core/search-lesson';
import { linearSearchSteps } from '../algorithm/linear-search.algorithm';
import { LINEAR_SEARCH_ALGORITHM } from './linear-search.metadata';
import { LINEAR_SEARCH_EXAMPLES } from './linear-search.examples';
import { LINEAR_SEARCH_CODE } from './linear-search.code';

export const LINEAR_SEARCH_LESSON: SearchLessonConfig = {
  algorithm: LINEAR_SEARCH_ALGORITHM,
  examples: LINEAR_SEARCH_EXAMPLES,
  implementations: LINEAR_SEARCH_CODE,
  makeSteps: linearSearchSteps,
  requiresSorted: false,
  bounds: ['NEXT', 'CHECK', 'LAST'],
  idea: 'Look at each value from left to right. Stop when it matches the target or when no values remain.',
  ideaSteps: [
    'Start at index zero',
    'Compare the current value',
    'Move right if it differs',
    'Stop at a match or the end',
  ],
  insightTitle: 'Works on any list',
  insight: 'Linear search needs no sorting. In the worst case it checks every value once.',
  practice: [
    {
      number: 27,
      title: 'Remove Element',
      url: 'https://leetcode.com/problems/remove-element/',
      difficulty: 'Easy',
      relevance: 'Scan every element, compare it with the target, and compact the values you keep.',
    },
    {
      number: 1295,
      title: 'Find Numbers with Even Number of Digits',
      url: 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits/',
      difficulty: 'Easy',
      relevance: 'Practice a linear scan that tests a condition and counts matching values.',
    },
  ],
};
