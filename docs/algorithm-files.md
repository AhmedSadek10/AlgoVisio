# Algorithm file guide

Every algorithm has the same six primary files. Each file has one role:

| File | What to edit here | Export |
| --- | --- | --- |
| `algorithm/<slug>.algorithm.ts` | Algorithm decisions and visualization steps | `<camelCaseName>Steps` |
| `data/<slug>.metadata.ts` | Name, category, description, complexity | `<UPPER_SNAKE_NAME>_ALGORITHM` |
| `data/<slug>.examples.ts` | The lesson's example inputs | `<UPPER_SNAKE_NAME>_EXAMPLES` |
| `data/<slug>.code.ts` | Full displayed source for TypeScript, Python, C#, Java | `<UPPER_SNAKE_NAME>_CODE` |
| `data/<slug>.lesson.ts` | Lesson text and connections to the other files | `<UPPER_SNAKE_NAME>_LESSON` |
| `<slug>.page.ts` | Angular route entry and category renderer | `<PascalCaseName>Page` |

For bubble sort, `<slug>` is `bubble-sort`, the step generator is `bubbleSortSteps`, and the lesson export is `BUBBLE_SORT_LESSON`.

## Find a lesson

| Lesson | Step generator | Displayed source | Example inputs | Configuration |
| --- | --- | --- | --- | --- |
| Bellman Ford | [Algorithm](../src/app/features/bellman-ford/algorithm/bellman-ford.algorithm.ts) | [Code](../src/app/features/bellman-ford/data/bellman-ford.code.ts) | [Examples](../src/app/features/bellman-ford/data/bellman-ford.examples.ts) | [Lesson](../src/app/features/bellman-ford/data/bellman-ford.lesson.ts) |
| Binary Search | [Algorithm](../src/app/features/binary-search/algorithm/binary-search.algorithm.ts) | [Code](../src/app/features/binary-search/data/binary-search.code.ts) | [Examples](../src/app/features/binary-search/data/binary-search.examples.ts) | [Lesson](../src/app/features/binary-search/data/binary-search.lesson.ts) |
| Breadth First Search | [Algorithm](../src/app/features/breadth-first-search/algorithm/breadth-first-search.algorithm.ts) | [Code](../src/app/features/breadth-first-search/data/breadth-first-search.code.ts) | [Examples](../src/app/features/breadth-first-search/data/breadth-first-search.examples.ts) | [Lesson](../src/app/features/breadth-first-search/data/breadth-first-search.lesson.ts) |
| Bubble Sort | [Algorithm](../src/app/features/bubble-sort/algorithm/bubble-sort.algorithm.ts) | [Code](../src/app/features/bubble-sort/data/bubble-sort.code.ts) | [Examples](../src/app/features/bubble-sort/data/bubble-sort.examples.ts) | [Lesson](../src/app/features/bubble-sort/data/bubble-sort.lesson.ts) |
| Depth First Search | [Algorithm](../src/app/features/depth-first-search/algorithm/depth-first-search.algorithm.ts) | [Code](../src/app/features/depth-first-search/data/depth-first-search.code.ts) | [Examples](../src/app/features/depth-first-search/data/depth-first-search.examples.ts) | [Lesson](../src/app/features/depth-first-search/data/depth-first-search.lesson.ts) |
| Dijkstra | [Algorithm](../src/app/features/dijkstra/algorithm/dijkstra.algorithm.ts) | [Code](../src/app/features/dijkstra/data/dijkstra.code.ts) | [Examples](../src/app/features/dijkstra/data/dijkstra.examples.ts) | [Lesson](../src/app/features/dijkstra/data/dijkstra.lesson.ts) |
| Insertion Sort | [Algorithm](../src/app/features/insertion-sort/algorithm/insertion-sort.algorithm.ts) | [Code](../src/app/features/insertion-sort/data/insertion-sort.code.ts) | [Examples](../src/app/features/insertion-sort/data/insertion-sort.examples.ts) | [Lesson](../src/app/features/insertion-sort/data/insertion-sort.lesson.ts) |
| Interpolation Search | [Algorithm](../src/app/features/interpolation-search/algorithm/interpolation-search.algorithm.ts) | [Code](../src/app/features/interpolation-search/data/interpolation-search.code.ts) | [Examples](../src/app/features/interpolation-search/data/interpolation-search.examples.ts) | [Lesson](../src/app/features/interpolation-search/data/interpolation-search.lesson.ts) |
| Jump Search | [Algorithm](../src/app/features/jump-search/algorithm/jump-search.algorithm.ts) | [Code](../src/app/features/jump-search/data/jump-search.code.ts) | [Examples](../src/app/features/jump-search/data/jump-search.examples.ts) | [Lesson](../src/app/features/jump-search/data/jump-search.lesson.ts) |
| Kruskal | [Algorithm](../src/app/features/kruskal/algorithm/kruskal.algorithm.ts) | [Code](../src/app/features/kruskal/data/kruskal.code.ts) | [Examples](../src/app/features/kruskal/data/kruskal.examples.ts) | [Lesson](../src/app/features/kruskal/data/kruskal.lesson.ts) |
| Linear Search | [Algorithm](../src/app/features/linear-search/algorithm/linear-search.algorithm.ts) | [Code](../src/app/features/linear-search/data/linear-search.code.ts) | [Examples](../src/app/features/linear-search/data/linear-search.examples.ts) | [Lesson](../src/app/features/linear-search/data/linear-search.lesson.ts) |
| Quick Sort | [Algorithm](../src/app/features/quick-sort/algorithm/quick-sort.algorithm.ts) | [Code](../src/app/features/quick-sort/data/quick-sort.code.ts) | [Examples](../src/app/features/quick-sort/data/quick-sort.examples.ts) | [Lesson](../src/app/features/quick-sort/data/quick-sort.lesson.ts) |
| Merge Sort | [Algorithm](../src/app/features/merge-sort/algorithm/merge-sort.algorithm.ts) | [Code](../src/app/features/merge-sort/data/merge-sort.code.ts) | [Examples](../src/app/features/merge-sort/data/merge-sort.examples.ts) | [Lesson](../src/app/features/merge-sort/data/merge-sort.lesson.ts) |
| Selection Sort | [Algorithm](../src/app/features/selection-sort/algorithm/selection-sort.algorithm.ts) | [Code](../src/app/features/selection-sort/data/selection-sort.code.ts) | [Examples](../src/app/features/selection-sort/data/selection-sort.examples.ts) | [Lesson](../src/app/features/selection-sort/data/selection-sort.lesson.ts) |
| Tree Traversal | [Algorithm](../src/app/features/tree-traversal/algorithm/tree-traversal.algorithm.ts) | [Code](../src/app/features/tree-traversal/data/tree-traversal.code.ts) | [Examples](../src/app/features/tree-traversal/data/tree-traversal.examples.ts) | [Lesson](../src/app/features/tree-traversal/data/tree-traversal.lesson.ts) |

Metadata always lives beside these files as `data/<slug>.metadata.ts`. The catalog imports those metadata exports to build the navigation list.

## Reading order

The Trees category also includes `tree-diameter`, `bst-search`, and `lowest-common-ancestor`, each following the six-file convention above. Their shared tree renderer adds query controls, result highlights, and subtree annotations through `TreeLessonConfig`. BST search validates the tree before applying edits; LCA queries use node IDs so duplicate values remain distinct.

Start with `data/<slug>.lesson.ts`. Its first four fields connect the metadata, examples, displayed implementations, and step generator. Then open the file for the part you want to understand or change. The page class only assigns the lesson configuration and passes it to its category renderer.

Every code file declares full language sources in TypeScript, Python, C#, Java order and builds its exported implementations with `markedSource`. Statement comments such as `// @step:swap` and `# @step:swap` connect the displayed line to a recorded step. Keep these keys in sync when editing either representation. Shared core files contain the parser and UI contracts; algorithm-specific source strings live only in feature code files.

Tree traversal has three selectable orders. Its code file contains a complete set of language sources for each order and exports them under `preorder`, `inorder`, and `postorder`. Its lesson uses the same `implementations` field as the other lessons, with a typed map for these variants.

Algorithm helpers may sit beside the main generator when they implement part of the algorithm. Dijkstra's `min-heap.ts` is one example. Such helpers do not replace or relocate any of the six standard files.

## Keep the convention

Run `npm run check:structure` after adding or moving an algorithm. It checks required files, the four data-file exports, and page classes. Then run the TypeScript and production build checks, and verify the lesson in the browser.
