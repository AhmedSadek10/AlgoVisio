import type { SearchLessonConfig } from '../../../core/search-lesson';
import { jumpSearchSteps } from '../algorithm/jump-search.algorithm';
import { JUMP_SEARCH_ALGORITHM } from './jump-search.metadata';
import { JUMP_SEARCH_EXAMPLES } from './jump-search.examples';
import { JUMP_SEARCH_CODE } from './jump-search.code';

export const JUMP_SEARCH_LESSON: SearchLessonConfig = {
  algorithm: JUMP_SEARCH_ALGORITHM,
  examples: JUMP_SEARCH_EXAMPLES,
  implementations: JUMP_SEARCH_CODE,
  makeSteps: jumpSearchSteps,
  requiresSorted: true,
  bounds: ['BLOCK', 'CHECK', 'END'],
  idea: 'Jump through a sorted list in blocks of about √n values. Once a block could contain the target, scan that block one value at a time.',
  ideaSteps: [
    'Choose a jump size near √n',
    'Check the end of each block',
    'Select the first possible block',
    'Scan that block for the target',
  ],
  insightTitle: 'Fewer checks than a full scan',
  insight: 'The jump and scan stages each take about √n checks. Sorting is required.',
  practice: [
    {
      number: 704,
      title: 'Binary Search',
      url: 'https://leetcode.com/problems/binary-search/',
      difficulty: 'Easy',
      relevance:
        'Related sorted-search practice: compare block jumps with halving the range. This problem requires O(log n), so submit binary search.',
    },
    {
      number: 35,
      title: 'Search Insert Position',
      url: 'https://leetcode.com/problems/search-insert-position/',
      difficulty: 'Easy',
      relevance:
        'Practice finding a sorted insertion boundary. Use binary search to meet the required O(log n) time; jump search has O(sqrt(n)) worst-case time.',
    },
  ],
};
