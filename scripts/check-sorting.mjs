import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../', import.meta.url));
const modules = new Map();

// Load pure TypeScript lesson modules without starting Angular or a browser.
function loadModule(filename) {
  const path = resolve(root, filename);
  if (modules.has(path)) return modules.get(path);
  const source = readFileSync(path, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  modules.set(path, module.exports);
  const importModule = (id) =>
    id.startsWith('.') ? loadModule(resolve(dirname(path), `${id}.ts`)) : require(id);
  new Function('require', 'module', 'exports', compiled)(importModule, module, module.exports);
  return module.exports;
}

const inputs = [[], [7], [1, 1, 1, 1], [3, 2, 1], [-999, 999, 0, -999], [2, 1, 2, 1]];
let seed = 47;
for (let count = 0; count < 200; count++) {
  const values = Array.from({ length: 1 + (count % 16) }, () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return (seed % 31) - 15;
  });
  inputs.push(
    values,
    [...values].sort((a, b) => a - b),
    [...values].sort((a, b) => b - a),
  );
}

let runs = 0;
for (const slug of [
  'bubble-sort',
  'selection-sort',
  'insertion-sort',
  'quick-sort',
  'merge-sort',
]) {
  const directory = `src/app/features/${slug}`;
  const makeSteps = Object.values(loadModule(`${directory}/algorithm/${slug}.algorithm.ts`))[0];
  const implementations = Object.values(loadModule(`${directory}/data/${slug}.code.ts`))[0];
  const typescript = implementations.find(
    (implementation) => implementation.language === 'typescript',
  );
  const source = typescript.lines.map((line) => line.text).join('\n');
  const executable = ts.transpileModule(`${source}\nexports.sortValues = sortValues;`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exported = {};
  new Function('exports', executable)(exported);
  const languageKeys = implementations.map(
    (implementation) => new Set(implementation.lines.map((line) => line.key).filter(Boolean)),
  );

  for (const input of inputs) {
    const original = [...input];
    const expected = [...input].sort((a, b) => a - b);
    const steps = makeSteps(input);
    assert.deepEqual(input, original, `${slug}: input changed`);
    assert.deepEqual(steps.at(-1).values, expected, `${slug}: incorrect final order`);
    assert.deepEqual(exported.sortValues([...input]), expected, `${slug}: displayed code differs`);
    assert.equal(steps[0].key, 'start');
    assert.equal(steps.at(-1).key, 'done');
    const snapshots = new Set();
    let comparisons = 0;
    let writes = 0;
    for (const step of steps) {
      assert.equal(step.values.length, input.length);
      for (const keys of languageKeys) assert(keys.has(step.key), `${slug}: missing ${step.key}`);
      for (const index of [...step.active, ...step.sorted])
        assert(index >= 0 && index < input.length);
      assert(step.comparisons >= comparisons && step.writes >= writes);
      comparisons = step.comparisons;
      writes = step.writes;
      for (const array of [
        step.values,
        step.active,
        step.sorted,
        ...(step.buffers ? [step.buffers.left, step.buffers.right] : []),
      ]) {
        assert(!snapshots.has(array), `${slug}: snapshots share mutable arrays`);
        snapshots.add(array);
      }
      if (slug === 'quick-sort') {
        for (const index of step.sorted) assert.equal(step.values[index], expected[index]);
        if (step.key === 'place') {
          const [low, high] = step.range;
          const pivot = step.values[step.pivot];
          assert(step.values.slice(low, step.pivot).every((value) => value < pivot));
          assert(step.values.slice(step.pivot + 1, high + 1).every((value) => value >= pivot));
        }
      }
      if (step.buffers) {
        const { left, right, leftIndex, rightIndex } = step.buffers;
        assert.deepEqual(
          left,
          [...left].sort((a, b) => a - b),
        );
        assert.deepEqual(
          right,
          [...right].sort((a, b) => a - b),
        );
        assert(leftIndex >= 0 && leftIndex <= left.length);
        assert(rightIndex >= 0 && rightIndex <= right.length);
      }
      if (slug === 'merge-sort' && step.key === 'merged') {
        const [low, high] = step.range;
        const range = step.values.slice(low, high + 1);
        assert.deepEqual(
          range,
          [...range].sort((a, b) => a - b),
        );
      }
    }
    runs++;
  }
}
console.log(
  `${runs} sorting runs passed: results, source examples, partitions, buffers, counters, and snapshot ownership.`,
);
