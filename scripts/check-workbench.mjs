import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(
  new URL('../src/app/components/algorithm-workbench/workbench-layout.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exported = {};
new Function('exports', compiled)(exported);
const { dropColumn, placePanels, positionPanels, movePanelToSpace, movePanelNearSpace, resizePanel, swapPanels } = exported;
const readingLayout = exported.placeLessonPanels([
  { id: 'visual', role: 'primary', span: 4, height: 380 },
  { id: 'stack', span: 4, height: 380 },
  { id: 'code', role: 'code', span: 4, height: 380 },
  { id: 'step', role: 'explanation', span: 6, height: 250 },
  { id: 'memory', span: 6, height: 250 },
  { id: 'output', span: 6, height: 250 },
]);
assert.deepEqual(readingLayout.map((panel) => panel.id),
  ['visual', 'code', 'step', 'stack', 'memory', 'output'],
  'Reading order puts code before supporting state');
const codeSlot = readingLayout.find((panel) => panel.id === 'code');
const stepSlot = readingLayout.find((panel) => panel.id === 'step');
assert.equal(codeSlot.top, 0, 'Code is visible in the first row');
assert.equal(codeSlot.span, 6, 'Code receives half the workbench width');
assert.equal(codeSlot.column, 7);
assert.equal(stepSlot.column, 1);
assert.equal(stepSlot.top + stepSlot.height, codeSlot.height);
for (const [i, a] of readingLayout.entries()) {
  for (const b of readingLayout.slice(i + 1)) {
    const horizontal = a.column < b.column + b.span && b.column < a.column + a.span;
    const vertical = a.top < b.top + b.height + 12 && b.top < a.top + a.height + 12;
    assert(!(horizontal && vertical), `Default panels ${a.id} and ${b.id} must not overlap`);
  }
}
assert.deepEqual(exported.placeLessonPanels(readingLayout), readingLayout,
  'Reset returns the same readable default arrangement');
for (const offset of [20, 300, 670]) {
  assert.equal(dropColumn(offset, offset, 1820), 1, 'A vertical drag keeps its column');
  assert.equal(dropColumn(916 + offset, offset, 1820), 7, 'Preserve grab offset when moving sideways');
}
const upwardLayout = [
  { id: 'tree', row: 0, column: 1, top: 0, span: 4, height: 380 },
  { id: 'step', row: 0, column: 5, top: 0, span: 4, height: 380 },
  { id: 'code', row: 0, column: 9, top: 0, span: 4, height: 380 },
  { id: 'output', row: 1, column: 7, top: 392, span: 6, height: 250 },
  { id: 'memory', row: 2, column: 1, top: 654, span: 6, height: 250 },
  { id: 'stack', row: 2, column: 7, top: 654, span: 6, height: 250 },
];
const upward = movePanelToSpace(upwardLayout, 'memory', dropColumn(670, 670, 1820), 440);
assert(upward, 'Dragging upward from the header middle must fit the empty left slot');
assert.equal(upward.find((panel) => panel.id === 'memory').top, 392);
assert.equal(upward.find((panel) => panel.id === 'memory').column, 1);
const backDown = movePanelToSpace(upward, 'memory', 1, 720);
assert(backDown);
assert.equal(backDown.find((panel) => panel.id === 'memory').top, 654);
const currentStepLayout = upwardLayout.map((panel) =>
  panel.id === 'memory' ? { ...panel, column: 7 } :
  panel.id === 'stack' ? { ...panel, column: 5, top: 0, span: 4, height: 380 } :
  panel.id === 'output' ? { ...panel, column: 1 } :
  panel.id === 'step' ? { ...panel, column: 7, top: 392, span: 6, height: 250 } : panel,
);
const lowerLeft = movePanelNearSpace(currentStepLayout, 'step', 3, 710, 3.2);
assert(lowerLeft, 'Snap Current step into the empty half beside Node memory');
assert.equal(lowerLeft.find((panel) => panel.id === 'step').column, 1);
assert.equal(lowerLeft.find((panel) => panel.id === 'step').top, 654);
assert.equal(movePanelNearSpace(currentStepLayout, 'step', 3, 440, 3.2), null,
  'Do not snap into an occupied row or an unrelated gap');
const original = placePanels([
  { id: 'tree', span: 4, height: 380 },
  { id: 'stack', span: 4, height: 380 },
  { id: 'code', span: 4, height: 600 },
  { id: 'step', span: 6, height: 250 },
  { id: 'memory', span: 6, height: 250 },
  { id: 'output', span: 6, height: 250 },
]);
const before = JSON.stringify(original);
const screenshotLayout = original.map((panel) =>
  panel.id === 'code'
    ? { ...panel, height: 380 }
    : panel.id === 'memory'
      ? { ...panel, span: 5, height: 216 }
      : panel,
);
const besideOutput = movePanelToSpace(screenshotLayout, 'memory', 7, 730);
assert(besideOutput);
const outputSlot = besideOutput.find((panel) => panel.id === 'output');
const memorySlot = besideOutput.find((panel) => panel.id === 'memory');
assert.equal(
  memorySlot.top,
  outputSlot.top,
  'Dropping beside Processed nodes must align to that row',
);
assert.equal(memorySlot.column, 7);
assert.equal(memorySlot.height, 216);
assert(
  memorySlot.top > positionPanels(screenshotLayout).find((panel) => panel.id === 'memory').top,
  'The panel must move down rather than snap back',
);
const moved = movePanelToSpace(original, 'output', 1, 480);
assert(moved);
assert.equal(moved.find((panel) => panel.id === 'output').top, 392);
assert.equal(moved.find((panel) => panel.id === 'output').height, 208);
assert.equal(moved.find((panel) => panel.id === 'code').top, 0);
assert.equal(moved.find((panel) => panel.id === 'memory').column, 7);
assert.equal(JSON.stringify(original), before);
assert.equal(movePanelToSpace(original, 'step', 9, 480), null, 'Do not overlap source code');
assert.equal(movePanelToSpace(original, 'step', 1, -10), null);
const tooSmall = original.map((panel) => (panel.id === 'code' ? { ...panel, height: 500 } : panel));
assert.equal(movePanelToSpace(tooSmall, 'output', 1, 430), null, 'Respect minimum panel height');
const bottom = movePanelToSpace(original, 'tree', 12, 1150);
assert(bottom);
assert.equal(bottom.find((panel) => panel.id === 'tree').column, 9, 'Clamp to the right grid edge');
const resized = resizePanel(
  moved,
  'output',
  { kind: 'keyboard', columns: 0, height: 30 },
  1200,
  false,
);
assert.deepEqual(resized, moved, 'Reject a resize into the row below');
const swapped = swapPanels(moved, 0, 5);
assert.equal(swapped[0].top, 0);
assert.equal(swapped[0].height, 380);
assert.equal(swapped[5].top, 392);
assert.equal(swapped[5].height, 208);
assert.deepEqual(
  positionPanels(placePanels(original)),
  positionPanels(original),
  'Reset restores row placement',
);
console.log(
  'Workbench checks passed: empty-space drops, gap fitting, collision rejection, boundaries, swaps, resize, and reset.',
);
