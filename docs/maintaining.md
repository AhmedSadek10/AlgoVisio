# Maintaining AlgoVisio

## Where a change belongs

| Change | Location |
| --- | --- |
| Algorithm decisions and recorded steps | `src/app/features/<algorithm>/algorithm/` |
| Lesson descriptions and wiring | `features/<algorithm>/data/<algorithm>.lesson.ts` |
| Displayed source in all four languages | `features/<algorithm>/data/<algorithm>.code.ts` |
| Example inputs | `features/<algorithm>/data/<algorithm>.examples.ts` |
| Names, descriptions, and complexity | `features/<algorithm>/data/<algorithm>.metadata.ts` |
| User input validation | `src/app/core/input/` |
| Conversion from a step to visible state | `src/app/core/visualization/*-adapter.ts` |
| Playback timing and navigation | `src/app/core/visualization/playback.ts` |
| Reusable rendering and interaction | `src/app/components/` |
| Layout shared by graph, sorting, and tree lessons | `src/app/styles/lesson-layout.css` |

Keep algorithm functions independent of Angular and the DOM. Copy mutable arrays when recording a step so later operations cannot rewrite the history. Use named objects when an operation needs several pieces of metadata. Prefer local, descriptive names and comments that explain an invariant or a decision.

Extract shared behavior when multiple lessons need the same rule. A feature owns its static inputs and configuration; its category renderer owns editable input state; its playback controller owns the timer. Avoid base component classes that couple unrelated lesson types together.

## Checking a change

Run `npm run check:structure`, `npm run check:readability`, `npm run typecheck`, `npm run format:check`, and `npm run build`. The structure check enforces the feature file names, exports, and small page classes. The readability check inspects executable TypeScript and the source strings shown in all four languages. The production build also checks Angular templates. These checks do not replace exercising the app in a browser.

For changes to shared lesson behavior, check one search, sorting, graph, and tree lesson:

- Play, pause, change speed, reach the end, and play again.
- Move by buttons, the step slider, and arrow keys while playing; manual navigation should pause.
- Use arrow keys in input fields, code panels, and resize handles without moving the lesson.
- Apply a shorter input after seeking near the end; playback should reset safely.
- Submit invalid input and verify that the existing visualization remains available.
- Switch routes during playback and verify that the new lesson starts independently.
- Check a narrow viewport and confirm that workspace controls and panels remain usable.
- Resize a block with the pointer and handle arrow keys: keep its row stable, adjust only the next block's width, and leave other block heights unchanged. Check swapping blocks and Reset layout; in a narrow workspace, resizing should affect only height.

For algorithm changes, inspect sorted, reversed, duplicate, negative, and single-value inputs. Check both the final answer and intermediate snapshots, including counters and highlighted statements.

Run `npm run check:sorting` after changing sorting algorithms or shared sort traces. It checks all five algorithms against generated inputs, verifies displayed TypeScript results and source highlight keys in all four languages, and checks partition, buffer, counter, and snapshot invariants.

## Design tradeoffs

Steps are generated up front to make backwards navigation immediate and deterministic. This uses more memory than streaming events, so inputs are intentionally small. The complexity displayed in a lesson describes the algorithm, not the extra cost of recording its visualization history.

The displayed source snippets and the step generators serve different purposes and must stay in sync. If a decision changes, update the relevant snippets and semantic statement markers too.

Write one statement per line and declare unrelated variables separately. Use explicit blocks for conditionals and loops, including early returns. Prefer names that describe a variable's role, and keep indentation consistent within each language. Displayed source strings need their own review because Prettier does not format their contents. When one visualized operation spans several statements, repeat its `@step` marker on those lines so the whole operation is highlighted.

Keep introductory DFS and BFS examples focused on traversal: neighbors, visited nodes, recursion or a queue, and visit order. Parent and depth tables belong to the internal visualization snapshots; the displayed traversal functions return only the visit order. Add path or distance tracking to displayed code only when that lesson teaches it. Update the runnable input generator when a displayed function's return type changes.

Apply the same rule to other lessons: searches return an index, sorts return the sorted array, and tree traversals expose `traverse(root)` with the accumulator kept inside the implementation. Shortest-path examples return distances and a target path, plus negative-cycle status for Bellman–Ford; predecessor tables remain local because they are needed to reconstruct that path. Kruskal returns selected edges, total weight, and component count to describe disconnected forests. Prefer standard-library priority queues where available. Preserve deterministic tie order where needed to keep the displayed steps and target path consistent across languages.

There is currently no automated test suite. Compiler checks catch type and template errors but cannot prove algorithm correctness or interaction behavior. The browser checklist above is the current regression workflow.

See [the algorithm file guide](algorithm-files.md) before adding or moving feature files. Algorithm source strings belong to their feature code file, even when another algorithm uses similar syntax. Shared utilities should handle generic formatting or rendering rather than hide algorithm-specific snippets.
