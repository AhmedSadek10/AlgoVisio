import type { GraphLessonConfig } from '../../../core/graph-lesson';
import { depthFirstSearchSteps } from '../algorithm/depth-first-search.algorithm';
import { DEPTH_FIRST_SEARCH_ALGORITHM } from './depth-first-search.metadata';
import { DEPTH_FIRST_SEARCH_EXAMPLES } from './depth-first-search.examples';
import { DEPTH_FIRST_SEARCH_CODE } from './depth-first-search.code';

export const DEPTH_FIRST_SEARCH_LESSON: GraphLessonConfig = {
  algorithm: DEPTH_FIRST_SEARCH_ALGORITHM,
  examples: DEPTH_FIRST_SEARCH_EXAMPLES,
  implementations: DEPTH_FIRST_SEARCH_CODE,
  makeSteps: depthFirstSearchSteps,
  kind: 'dfs',
  articleTitle: 'Follow one path until it ends.',
  article: [
    'Depth-first search (DFS) explores a graph by committing to one route. From a starting node, it visits the first unvisited neighbor, then repeats from that neighbor. When there is nowhere new to go, it backs up to the most recent choice and tries the next edge.',
    'The stack is the key idea. Each item represents a node whose remaining neighbors still need attention. The top of the stack is the current position. This is the same pattern that recursive DFS uses through the call stack.',
    'DFS reaches every node connected to the start, but the order depends on how neighbors are listed. On a graph with cycles, the visited set prevents the search from going around forever. Disconnected nodes stay untouched in this lesson.',
  ],
  takeaways: [
    'Go deep before exploring siblings',
    'The stack remembers where to return',
    'Visited nodes stop cycles',
  ],
  practice: [
    {
      number: 547,
      title: 'Number of Provinces',
      url: 'https://leetcode.com/problems/number-of-provinces/',
      difficulty: 'Medium',
      relevance: 'Run DFS from each unvisited city to count connected components.',
    },
    {
      number: 200,
      title: 'Number of Islands',
      url: 'https://leetcode.com/problems/number-of-islands/',
      difficulty: 'Medium',
      relevance: 'Explore connected land cells with DFS and mark each cell visited once.',
    },
  ],
};
