# Visualization architecture

## Responsibilities

1. **Feature algorithm** generates immutable steps from user input. It does not manipulate DOM or control layout.
2. **Lesson adapter** translates a step into typed structure snapshots, variables, and memory rows. This is where algorithm-specific labels and highlighting belong.
3. **Data-structure visualizer** draws the supplied state. It does not run the algorithm or infer its next operation.
4. **Lesson component** combines input editing, concept text, and block templates. Pure parsers validate drafts; a shared playback controller owns timing and navigation.
5. **Workspace and workbench** manage full-view presentation, sizing, and block order. They have no dependency on graph or search steps.

Each component has its own folder. Every algorithm feature has the same `algorithm/<slug>.algorithm.ts`, four `data/<slug>.*.ts` files (`metadata`, `examples`, `code`, `lesson`), and `<slug>.page.ts`. Static algorithm data lives in the feature that owns it. Shared contracts, snapshot adapters, input parsers, and playback live in `core/`. See [the file guide](algorithm-files.md) for the complete convention.

The shared `CodeLanguage` contract supports TypeScript, Python, C#, and Java. `markedSource` parses `@step` comments in every feature’s explicit source strings. Search retains numbered statement keys; sorting, tree, and graph lessons also use semantic keys. All feature code files use this same parser. Input generators produce language-specific examples. For C# and Java, copying inserts the generated entry-point method inside the `Solution` class.

Graph steps may supply a `trace` containing statement keys, variables, comparisons, edge states, and a final summary. Kruskal also supplies DSU parent links and accepted edge IDs, which the adapter maps to a generic tree, arrays, graph, and memory table. Bellman–Ford supplies pass and relaxation state; its reachable negative-cycle flag keeps tentative distances clearly labeled. Neither algorithm requires a dedicated renderer.

`StepExplanation` receives a title, explanation, phase, variables, comparison, and result. `MemoryTable` receives columns and rows. Both can be reused for non-graph algorithms.

## Adding another algorithm

1. Create the standard six files described in [the file guide](algorithm-files.md).
2. Export feature metadata, example inputs, and all four language implementations from their matching data files.
3. Connect these exports and the step generator in the typed lesson configuration.
4. Keep the page class to one `lesson` field and reuse the appropriate category renderer.
5. Add the metadata to the catalog and the page to the lazy routes.
6. Run `npm run check:structure`, `npm run typecheck`, and `npm run build`, then check the lesson in a browser.

If a new structure shape is necessary, extend the snapshot union and add its renderer without modifying other algorithm features.

## Graph geometry

`core/visualization/graph-layout.ts` computes positions from node IDs and edge endpoints. It lays out connected components independently, spaces nodes with a deterministic spring simulation, resolves collisions, and packs disconnected groups with padding. A single node is centered. Direction affects arrow rendering rather than which component contains a node.

`GraphVisualizer` caches geometry separately from highlights, distances, and the selected start. Playback updates visual state without rearranging the graph. Edges stop outside the node discs; opposite directed edges use separate curves and weight labels. Label sizes adapt to longer node names, and the canvas shares the available panel height with its caption and legend.

Graph nodes support pointer capture for dragging. Screen coordinates are transformed into SVG coordinates, and custom positions are clamped inside the canvas. Position overrides and selection reset when topology changes, while playback and start-node changes preserve them. Drag gestures suppress the subsequent click so rearranging a node does not change the algorithm start. Keyboard arrows move a focused node; Enter or Space selects it. Reset positions restores automatic geometry.

Workbench panels use stable rows rather than dense grid packing. `components/algorithm-workbench/workbench-layout.ts` assigns rows when a lesson loads or the layout resets. Horizontal resizing uses empty columns first, then adjusts the next panel in that row, with a minimum width of three columns. Height changes preserve other panel sizes; each row reserves enough space for its tallest panel. Reordering exchanges slots without rebuilding the layout. Below 640px of workspace width, panels stack and resizing changes only their height. Pointer and keyboard resize requests have separate types so pixel sizes cannot be confused with column changes.
