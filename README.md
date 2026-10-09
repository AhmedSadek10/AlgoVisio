# AlgoVisio

AlgoVisio is an interactive Angular app for learning algorithms through their decisions. Each lesson explains the idea, lets you change the input, and shows what the algorithm does at every step.

## Lessons

| Category | Lessons |
| --- | --- |
| Searching | Binary search, linear search, jump search, interpolation search |
| Sorting | Bubble sort, selection sort, insertion sort, quick sort, merge sort |
| Trees | Binary tree traversal (preorder, inorder, postorder), tree diameter, BST search, lowest common ancestor |
| Graphs | Depth-first search, breadth-first search, Dijkstra’s algorithm, Kruskal, Bellman–Ford |

Every lesson begins with an explanation and opens into the same **full-view dry-run workspace**. The array or graph, data structure, highlighted TypeScript/Python/C#/Java code, current-step explanation, and memory table stay together in movable, resizable blocks. Drag headers to swap blocks, resize with a corner handle or arrow keys, expand the entire workspace, or restore its original layout.

Use **← / →** to move between steps; manual navigation pauses playback. Arrows retain their native behavior in inputs, sliders, code panels, and resize handles. Normal **1× playback takes 3 seconds per step**, with adjustable speed.

Use the theme toggle in the header to switch between light and dark mode. The app follows your system theme until you choose a mode, then remembers your choice in this browser.

Searching lessons accept editable lists and targets. Binary, jump, and interpolation search sort unsorted input with a warning; linear search preserves the entered order. DFS shows a LIFO call stack, BFS shows a FIFO queue, and both show discovery depth, parents, visit order, and a discovery tree. Dijkstra shows a real binary min heap with pushes, pops, swaps, stale entries, distance comparisons, and the reconstructed shortest path. Code can be copied with runnable input generated from the current list or graph.

Kruskal shows sorted edges, cycle rejection, selected edges, component roots and sizes, and a disjoint-set forest. It uses union by size without path compression and reports a minimum spanning forest for disconnected graphs. Bellman–Ford shows each edge relaxation, pass count, early stopping, distance and predecessor updates, and reachable negative-cycle detection. A reachable negative cycle is reported without returning a target path.

Graph input supports **1–12 nodes** and **up to 30 edges**. Dijkstra accepts non-negative whole-number weights from 0 to 99. Kruskal and Bellman–Ford allow weights from -99 to 99; Kruskal requires undirected input. Bellman–Ford expands undirected edges into both directions. Invalid edits preserve the current graph.

Every lesson includes a **LeetCode practice** section with problem numbers, difficulty, direct links, and an explanation of how each problem relates to the lesson. Related search exercises call out logarithmic-time requirements; small-input sorting exercises let you practice bubble, selection, and insertion sort without implying they meet an O(n log n) requirement.

All eighteen lessons include TypeScript, Python, C#, and Java implementations with matching statement highlights. **Copy code** includes the current input and a runnable entry point. Java examples require Java 17+ and a `Solution.java` file; C# examples require C# 10+ in a .NET 6+ console project.

Binary tree traversal accepts level-order values with null child slots and includes balanced, sparse, skewed, and empty examples. Switch between preorder, inorder, and postorder to compare the tree, recursive call stack, visit order, code highlights, and node memory. Duplicate values retain distinct node identities. This lesson also includes TypeScript, Python, C#, and Java implementations with runnable input.

Tree diameter shows subtree heights and highlights a longest path measured in edges. BST search accepts an editable target and validates unique values and ordering throughout the tree. Lowest common ancestor works on any binary tree and selects nodes by identity, including duplicate values and a node paired with itself. Run `npm run check:trees` to verify the traces and displayed TypeScript against independent graph-distance and ancestor-chain references.

Sorting lessons accept editable arrays of 1–16 whole numbers and include sorted, reversed, duplicate, negative, and single-value examples. Each dry run shows the current array, original input, highlighted code, explanations, memory, comparison counts, and array writes. Bubble sort shows early stopping, selection sort tracks the minimum index, insertion sort shows held values and shifts, quick sort shows pivots and partitions, and merge sort shows temporary buffers while merging. All five include runnable TypeScript, Python, C#, and Java code. Run `npm run check:sorting` to verify sorting results and trace invariants on edge cases and generated inputs.

## Reusable visualization components

The renderers consume typed snapshots and do not import algorithm features. Supported structures are arrays, stacks, queues, deques, linked lists, sets, maps, trees, graphs, and min/max heaps. Heap trees reuse the generic tree component; the backing heap array reuses the array component. An algorithm adapter controls labels, highlights, operations, and removed items.

See [the architecture and component guide](docs/architecture.md) for contracts and examples of adding a new lesson.

## Run locally

Requires Node.js 20.19+ and npm.

## Deploy to GitHub Pages

Run `npm run deploy` to build the production app for `/AlgoVisio/` and publish it to the repository's `gh-pages` branch. GitHub authentication and push access to `origin` are required.

In the repository's **Settings → Pages**, select **Deploy from a branch**, choose **gh-pages** and **/ (root)**, then save. The site will be available at https://AhmedSadek10.github.io/AlgoVisio/ after GitHub finishes publishing.

Lesson URLs use hash routing so direct links and refreshes work on static hosting, for example `/AlgoVisio/#/algorithms/binary-search`. Run `npm run build:pages` to build locally without publishing, or `npm run deploy -- --dry-run` to check deployment without pushing. Run `npm run deploy` again to publish future updates.

## Local development commands

```bash
npm ci
npm start
```

Open `http://localhost:4200`.

| Command | Purpose |
| --- | --- |
| `npm run build` | Compile the production app and check Angular templates |
| `npm run typecheck` | Check TypeScript without generating output |
| `npm run check:structure` | Check the uniform algorithm folder and export conventions |
| `npm run check:readability` | Check explicit control-flow blocks and readable displayed implementations |
| `npm run format:check` | Check source formatting |
| `npm run format` | Apply source formatting |

## Project structure

Every algorithm uses the same layout. Replace `bubble-sort` with any other lesson name:

```text
src/app/features/bubble-sort/
├── algorithm/
│   └── bubble-sort.algorithm.ts  # Runs the algorithm and records steps
├── data/
│   ├── bubble-sort.metadata.ts   # Name, category, description, complexity
│   ├── bubble-sort.examples.ts   # Inputs shown by the example buttons
│   ├── bubble-sort.code.ts       # Full TypeScript, Python, C#, Java source
│   └── bubble-sort.lesson.ts     # Connects data, explanations, and step generator
└── bubble-sort.page.ts           # Connects the lesson to its renderer
```

All thirteen page classes contain one `lesson` field. All lesson configurations use `algorithm`, `examples`, `implementations`, and `makeSteps`. Category-specific fields describe things such as search bounds, graph practice problems, or tree traversal order.

Displayed code always lives in `features/<algorithm>/data/<algorithm>.code.ts`. Each file contains full source strings for all four languages, followed by the exported implementations. Tree traversal includes explicit sources for preorder, inorder, and postorder. Source comments such as `@step:compare` identify highlighted statements; the shared marker parser removes them from the display.

Shared Angular renderers live in `components/`; contracts, input parsers, snapshot adapters, and playback live in `core/`. The algorithm catalog registers feature metadata. Dijkstra's `algorithm/min-heap.ts` is an additional implementation helper beside its step generator.

Use [the algorithm file guide](docs/algorithm-files.md) to find any lesson's files. Run `npm run check:structure` to detect missing files, inconsistent exports, or logic added to page classes.

Built with Angular 20, standalone components, signals, TypeScript, SVG, and component-scoped CSS. Everything runs in the browser. Validation currently uses compiler checks and manual browser checks; there is no automated test suite.



## Reading the code

Start with [bubble sort](src/app/features/bubble-sort/algorithm/bubble-sort.algorithm.ts) for a small example. The function records comparisons and swaps as independent snapshots. Its [page configuration](src/app/features/bubble-sort/bubble-sort.page.ts) supplies the explanation and code examples to the shared sorting lesson.

The [sorting adapter](src/app/core/visualization/sort-lesson-adapter.ts) converts those snapshots into array highlights, counters, and memory rows. The [playback controller](src/app/core/visualization/playback.ts) handles seeking, timing, speed, and cleanup for all lesson types. Renderers only draw the state they receive.

See [the maintenance guide](docs/maintaining.md) for coding conventions, validation steps, and design tradeoffs.
