import type { GraphLessonConfig } from '../../../core/graph-lesson';
import { bellmanFordSteps } from '../algorithm/bellman-ford.algorithm';
import { BELLMAN_FORD_ALGORITHM } from './bellman-ford.metadata';
import { BELLMAN_FORD_EXAMPLES } from './bellman-ford.examples';
import { BELLMAN_FORD_CODE } from './bellman-ford.code';

export const BELLMAN_FORD_LESSON: GraphLessonConfig = {
  algorithm: BELLMAN_FORD_ALGORITHM,
  examples: BELLMAN_FORD_EXAMPLES,
  implementations: BELLMAN_FORD_CODE,
  makeSteps: bellmanFordSteps,
  kind: 'bellman-ford',
  articleTitle: 'Improve every route, one pass at a time.',
  article: [
    'Bellman–Ford finds the shortest weighted routes from one start node, even when some edges have negative weights. It begins with distance zero at the start and infinity everywhere else. For each edge u → v, it asks whether dist[u] + weight is smaller than dist[v]. If so, it updates both the distance and the predecessor.',
    'A shortest simple path contains at most V − 1 edges. Repeating a complete edge scan V − 1 times therefore gives improvements enough opportunities to reach every node, provided no reachable negative cycle exists. This dry run updates distances in place, so an improvement can sometimes travel across several edges during one pass.',
    'If a full pass makes no updates, the distances are already stable and the algorithm stops early. It then scans edges once more: an additional improvement proves that a negative cycle is reachable from the start. Repeating such a cycle lowers affected route costs forever, so those routes have no finite shortest distance. An unreachable negative cycle does not affect the start’s routes.',
    'Follow each pass, edge, candidate sum, and distance-table change alongside the highlighted code. Try the negative-cycle example to see why the final check matters. Undirected input expands each edge into both directions; a reachable negative undirected edge consequently creates a negative cycle. When a reachable cycle is found, this lesson reports it and does not return a target path.',
  ],
  takeaways: [
    'Relax every edge for up to V − 1 passes',
    'Stop early when a full pass changes nothing',
    'One extra scan detects reachable negative cycles',
  ],
  practice: [
    {
      number: 787,
      title: 'Cheapest Flights Within K Stops',
      url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      difficulty: 'Medium',
      relevance:
        "Limit edge-relaxation passes to K + 1 flights. Read the previous pass's distances so one pass cannot use extra flights.",
    },
    {
      number: 743,
      title: 'Network Delay Time',
      url: 'https://leetcode.com/problems/network-delay-time/',
      difficulty: 'Medium',
      relevance:
        'Use repeated edge relaxation to compute source distances, then report the last arrival or an unreachable node.',
    },
  ],
};
