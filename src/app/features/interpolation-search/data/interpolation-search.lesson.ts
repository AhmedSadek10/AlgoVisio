import type { SearchLessonConfig } from '../../../core/search-lesson';
import { interpolationSearchSteps } from '../algorithm/interpolation-search.algorithm';
import { INTERPOLATION_SEARCH_ALGORITHM } from './interpolation-search.metadata';
import { INTERPOLATION_SEARCH_EXAMPLES } from './interpolation-search.examples';
import { INTERPOLATION_SEARCH_CODE } from './interpolation-search.code';

export const INTERPOLATION_SEARCH_LESSON: SearchLessonConfig = {
  algorithm: INTERPOLATION_SEARCH_ALGORITHM,
  examples: INTERPOLATION_SEARCH_EXAMPLES,
  implementations: INTERPOLATION_SEARCH_CODE,
  makeSteps: interpolationSearchSteps,
  requiresSorted: true,
  bounds: ['LOW', 'PROBE', 'HIGH'],
  idea: 'Use the values at both ends of a sorted range to estimate where the target lies. Probe there, then narrow the range.',
  ideaSteps: [
    'Read the range endpoints',
    'Estimate the target position',
    'Compare the probed value',
    'Narrow the range and repeat',
  ],
  insightTitle: 'Best with even spacing',
  insight:
    'On evenly distributed data, average time can be O(log log n). Uneven data can take O(n) in the worst case.',
  practice: [
    {
      number: 704,
      title: 'Binary Search',
      url: 'https://leetcode.com/problems/binary-search/',
      difficulty: 'Easy',
      relevance:
        'Compare value-based probes with midpoint probes. This problem requires O(log n); interpolation search alone does not guarantee it, so use binary search.',
    },
    {
      number: 35,
      title: 'Search Insert Position',
      url: 'https://leetcode.com/problems/search-insert-position/',
      difficulty: 'Easy',
      relevance:
        'Practice sorted boundaries and missing targets. Use binary search for the required O(log n) guarantee rather than relying on uniformly distributed values.',
    },
  ],
};
