import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/app-shell/app-shell').then((module) => module.AppShell),
    children: [
      {
        path: 'algorithms/tree-diameter',
        title: 'Tree diameter | AlgoVisio',
        loadComponent: () =>
          import('./features/tree-diameter/tree-diameter.page').then(
            (module) => module.TreeDiameterPage,
          ),
      },
      {
        path: 'algorithms/bst-search',
        title: 'BST search | AlgoVisio',
        loadComponent: () =>
          import('./features/bst-search/bst-search.page').then((module) => module.BstSearchPage),
      },
      {
        path: 'algorithms/lowest-common-ancestor',
        title: 'Lowest common ancestor | AlgoVisio',
        loadComponent: () =>
          import('./features/lowest-common-ancestor/lowest-common-ancestor.page').then(
            (module) => module.LowestCommonAncestorPage,
          ),
      },
      {
        path: 'algorithms/bubble-sort',
        title: 'Bubble Sort Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/bubble-sort/bubble-sort.page').then((module) => module.BubbleSortPage),
      },
      {
        path: 'algorithms/selection-sort',
        title: 'Selection Sort Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/selection-sort/selection-sort.page').then(
            (module) => module.SelectionSortPage,
          ),
      },
      {
        path: 'algorithms/insertion-sort',
        title: 'Insertion Sort Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/insertion-sort/insertion-sort.page').then(
            (module) => module.InsertionSortPage,
          ),
      },
      {
        path: 'algorithms/quick-sort',
        title: 'Quick Sort Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/quick-sort/quick-sort.page').then((module) => module.QuickSortPage),
      },
      {
        path: 'algorithms/merge-sort',
        title: 'Merge Sort Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/merge-sort/merge-sort.page').then((module) => module.MergeSortPage),
      },
      {
        path: 'algorithms/tree-traversal',
        title: 'Binary Tree Traversal | AlgoVisio',
        loadComponent: () =>
          import('./features/tree-traversal/tree-traversal.page').then(
            (module) => module.TreeTraversalPage,
          ),
      },
      {
        path: 'algorithms/kruskal',
        title: 'Kruskal Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/kruskal/kruskal.page').then((module) => module.KruskalPage),
      },
      {
        path: 'algorithms/bellman-ford',
        title: 'Bellmanâ€“Ford Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/bellman-ford/bellman-ford.page').then(
            (module) => module.BellmanFordPage,
          ),
      },
      { path: '', pathMatch: 'full', redirectTo: 'algorithms/bubble-sort' },
      {
        path: 'algorithms/binary-search',
        title: 'Binary Search Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/binary-search/binary-search.page').then(
            (module) => module.BinarySearchPage,
          ),
      },
      {
        path: 'algorithms/linear-search',
        title: 'Linear Search Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/linear-search/linear-search.page').then(
            (module) => module.LinearSearchPage,
          ),
      },
      {
        path: 'algorithms/jump-search',
        title: 'Jump Search Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/jump-search/jump-search.page').then((module) => module.JumpSearchPage),
      },
      {
        path: 'algorithms/interpolation-search',
        title: 'Interpolation Search Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/interpolation-search/interpolation-search.page').then(
            (module) => module.InterpolationSearchPage,
          ),
      },
      {
        path: 'algorithms/depth-first-search',
        title: 'Depth-First Search Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/depth-first-search/depth-first-search.page').then(
            (module) => module.DepthFirstSearchPage,
          ),
      },
      {
        path: 'algorithms/breadth-first-search',
        title: 'Breadth-First Search Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/breadth-first-search/breadth-first-search.page').then(
            (module) => module.BreadthFirstSearchPage,
          ),
      },
      {
        path: 'algorithms/dijkstra',
        title: 'Dijkstra Visualizer | AlgoVisio',
        loadComponent: () =>
          import('./features/dijkstra/dijkstra.page').then((module) => module.DijkstraPage),
      },
    ],
  },
  { path: '**', redirectTo: 'algorithms/bubble-sort' },
];
