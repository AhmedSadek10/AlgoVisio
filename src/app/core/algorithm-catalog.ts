import { TREE_DIAMETER_ALGORITHM } from '../features/tree-diameter/data/tree-diameter.metadata';
import { BST_SEARCH_ALGORITHM } from '../features/bst-search/data/bst-search.metadata';
import { LOWEST_COMMON_ANCESTOR_ALGORITHM } from '../features/lowest-common-ancestor/data/lowest-common-ancestor.metadata';
import { MERGE_SORT_ALGORITHM } from '../features/merge-sort/data/merge-sort.metadata';
import { QUICK_SORT_ALGORITHM } from '../features/quick-sort/data/quick-sort.metadata';
import { BINARY_SEARCH_ALGORITHM } from '../features/binary-search/data/binary-search.metadata';
import { LINEAR_SEARCH_ALGORITHM } from '../features/linear-search/data/linear-search.metadata';
import { JUMP_SEARCH_ALGORITHM } from '../features/jump-search/data/jump-search.metadata';
import { INTERPOLATION_SEARCH_ALGORITHM } from '../features/interpolation-search/data/interpolation-search.metadata';
import { DEPTH_FIRST_SEARCH_ALGORITHM } from '../features/depth-first-search/data/depth-first-search.metadata';
import { BREADTH_FIRST_SEARCH_ALGORITHM } from '../features/breadth-first-search/data/breadth-first-search.metadata';
import { DIJKSTRA_ALGORITHM } from '../features/dijkstra/data/dijkstra.metadata';
import { KRUSKAL_ALGORITHM } from '../features/kruskal/data/kruskal.metadata';
import { BELLMAN_FORD_ALGORITHM } from '../features/bellman-ford/data/bellman-ford.metadata';
import { TREE_TRAVERSAL_ALGORITHM } from '../features/tree-traversal/data/tree-traversal.metadata';
import { BUBBLE_SORT_ALGORITHM } from '../features/bubble-sort/data/bubble-sort.metadata';
import { SELECTION_SORT_ALGORITHM } from '../features/selection-sort/data/selection-sort.metadata';
import { INSERTION_SORT_ALGORITHM } from '../features/insertion-sort/data/insertion-sort.metadata';

export interface AlgorithmCatalogEntry {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly icon: string;
  readonly description: string;
  readonly requirement?: string;
  readonly timeComplexity?: string;
  readonly spaceComplexity?: string;
  readonly available: boolean;
}

export const ALGORITHM_CATALOG: readonly AlgorithmCatalogEntry[] = [
  BUBBLE_SORT_ALGORITHM,
  SELECTION_SORT_ALGORITHM,
  INSERTION_SORT_ALGORITHM,
  QUICK_SORT_ALGORITHM,
  MERGE_SORT_ALGORITHM,
  BINARY_SEARCH_ALGORITHM,
  LINEAR_SEARCH_ALGORITHM,
  JUMP_SEARCH_ALGORITHM,
  INTERPOLATION_SEARCH_ALGORITHM,
  TREE_TRAVERSAL_ALGORITHM,
  TREE_DIAMETER_ALGORITHM,
  BST_SEARCH_ALGORITHM,
  LOWEST_COMMON_ANCESTOR_ALGORITHM,
  DEPTH_FIRST_SEARCH_ALGORITHM,
  BREADTH_FIRST_SEARCH_ALGORITHM,
  DIJKSTRA_ALGORITHM,
  KRUSKAL_ALGORITHM,
  BELLMAN_FORD_ALGORITHM,
];
