import type { GraphLessonConfig } from '../../../core/graph-lesson';
import { breadthFirstSearchSteps } from '../algorithm/breadth-first-search.algorithm';
import { BREADTH_FIRST_SEARCH_ALGORITHM } from './breadth-first-search.metadata';
import { BREADTH_FIRST_SEARCH_EXAMPLES } from './breadth-first-search.examples';
import { BREADTH_FIRST_SEARCH_CODE } from './breadth-first-search.code';

export const BREADTH_FIRST_SEARCH_LESSON: GraphLessonConfig = {
  algorithm: BREADTH_FIRST_SEARCH_ALGORITHM,
  examples: BREADTH_FIRST_SEARCH_EXAMPLES,
  implementations: BREADTH_FIRST_SEARCH_CODE,
  makeSteps: breadthFirstSearchSteps,
  kind: 'bfs',
  articleTitle: 'Explore the graph in waves.',
  article: [
    'Breadth-first search (BFS) explores all nearby nodes before moving farther away. It begins with a start node in a queue. Each time it removes the front node, it adds any newly discovered neighbors to the back.',
    'That queue creates layers: distance zero is the start, distance one contains its neighbors, and so on. For an unweighted graph, the first time BFS reaches a node is through a path with the fewest edges.',
    'A node is marked discovered when it enters the queue. This prevents duplicate entries when two paths lead to the same place. The visualization shows both the queue and visit order, so you can see each wave spread.',
  ],
  takeaways: [
    'Explore nearby nodes first',
    'A queue controls the order',
    'First discovery gives fewest edges',
  ],
  practice: [
    {
      number: 102,
      title: 'Binary Tree Level Order Traversal',
      url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      difficulty: 'Medium',
      relevance: 'Use a queue to group tree nodes by depth.',
    },
    {
      number: 994,
      title: 'Rotting Oranges',
      url: 'https://leetcode.com/problems/rotting-oranges/',
      difficulty: 'Medium',
      relevance: 'Start BFS from all rotten oranges and process each wave as one minute.',
    },
  ],
};
