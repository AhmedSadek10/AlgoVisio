import type { GraphLessonConfig } from '../../../core/graph-lesson';
import { dijkstraSteps } from '../algorithm/dijkstra.algorithm';
import { DIJKSTRA_ALGORITHM } from './dijkstra.metadata';
import { DIJKSTRA_EXAMPLES } from './dijkstra.examples';
import { DIJKSTRA_CODE } from './dijkstra.code';

export const DIJKSTRA_LESSON: GraphLessonConfig = {
  algorithm: DIJKSTRA_ALGORITHM,
  examples: DIJKSTRA_EXAMPLES,
  implementations: DIJKSTRA_CODE,
  makeSteps: dijkstraSteps,
  kind: 'dijkstra',
  articleTitle: 'Grow the cheapest known routes.',
  article: [
    'Dijkstra’s algorithm finds the shortest weighted paths from one start node. It stores a tentative distance for every node: zero for the start and infinity for everything else. At each turn, it settles the unsettled node with the smallest known distance.',
    'From that node, it tries every outgoing edge. If going through the current node makes a cheaper route to a neighbor, the algorithm updates that neighbor’s distance and predecessor. This update is called relaxation.',
    'A priority queue keeps the cheapest queued distance at its front. When a route improves, add a new entry instead of editing the old one. If an old entry is removed later, its stored distance no longer matches the table, so skip it. The visualization expands the binary heap operations; the C# and Java examples use their standard priority queues, while TypeScript includes a small heap helper below the algorithm.',
    'Non-negative weights guarantee that an accepted minimum distance is final. In this dry run, follow the graph, heap tree, heap array, local variables, and highlighted statement together. Choose TypeScript, Python, C#, or Java; predecessor links reconstruct the route to your selected target.',
  ],
  takeaways: [
    'Pop the min heap; skip stale entries',
    'Improve a distance, then push a new entry',
    'Negative weights are not allowed',
  ],
  practice: [
    {
      number: 743,
      title: 'Network Delay Time',
      url: 'https://leetcode.com/problems/network-delay-time/',
      difficulty: 'Medium',
      relevance:
        'Find shortest routes from the source, then take the largest finite arrival time. Detect unreachable nodes.',
    },
    {
      number: 1334,
      title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance',
      url: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
      difficulty: 'Medium',
      relevance:
        'Run Dijkstra from each city and count destinations within the distance threshold.',
    },
  ],
};
