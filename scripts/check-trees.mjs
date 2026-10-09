import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL('../', import.meta.url));
const modules = new Map();
function loadModule(filename) {
  const path = resolve(root, filename);
  if (modules.has(path)) return modules.get(path);
  const compiled = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  modules.set(path, module.exports);
  const importModule = (id) =>
    id.startsWith('.') ? loadModule(resolve(dirname(path), `${id}.ts`)) : require(id);
  new Function('require', 'module', 'exports', compiled)(importModule, module, module.exports);
  return module.exports;
}

const { parseTree } = loadModule('src/app/core/input/tree-input.ts');
const { lcaInputCode } = loadModule('src/app/core/input/lca-input.ts');
const { validateBst } = loadModule('src/app/features/bst-search/algorithm/bst-search.algorithm.ts');
for (const input of ['5, 3, 7, null, 6', '5, 5', '5, 3, 7, null, null, 4']) {
  assert.throws(() => validateBst(parseTree(input)), /BST search requires unique values/);
}

// Independent references use graph distances and ancestor chains, rather than recursion heights.
function diameterReference(nodes) {
  let best = 0;
  for (const start of nodes) {
    const queue = [[start.id, 0]];
    const seen = new Set([start.id]);
    for (const [id, distance] of queue) {
      best = Math.max(best, distance);
      const node = nodes.find((node) => node.id === id);
      for (const neighbor of [node.parentId, node.left?.id, node.right?.id]) {
        if (neighbor != null && !seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push([neighbor, distance + 1]);
        }
      }
    }
  }
  return best;
}
function ancestorReference(nodes, first, second) {
  const ancestors = new Set();
  let node = nodes.find((node) => node.id === first);
  while (node) {
    ancestors.add(node.id);
    node = nodes.find((parent) => parent.id === node.parentId);
  }
  node = nodes.find((node) => node.id === second);
  while (node) {
    if (ancestors.has(node.id)) return node.id;
    node = nodes.find((parent) => parent.id === node.parentId);
  }
  return null;
}

let runs = 0;
for (const [slug, functionName] of [
  ['tree-diameter', 'diameter'],
  ['bst-search', 'search'],
  ['lowest-common-ancestor', 'lowestCommonAncestor'],
]) {
  const prefix = slug.replaceAll('-', '_').toUpperCase();
  const lesson = loadModule(`src/app/features/${slug}/data/${slug}.lesson.ts`)[`${prefix}_LESSON`];
  const implementations = lesson.implementations.postorder;
  const source = implementations
    .find((code) => code.language === 'typescript')
    .lines.map((line) => line.text)
    .join('\n');
  const executable = ts.transpileModule(`${source}\nexports.run = ${functionName};`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exported = {};
  new Function('exports', executable)(exported);
  if (slug === 'lowest-common-ancestor') {
    for (const example of lesson.examples) {
      const nodes = parseTree(example.input);
      const query = { first: nodes[0]?.id ?? '', second: nodes.at(-1)?.id ?? '', ...example.query };
      const expected = ancestorReference(nodes, query.first, query.second);
      const inputCode = lcaInputCode('typescript', nodes, query);
      const copied = ts.transpileModule(
        `${source}\n${inputCode}\nexports.correct = ancestor === ${expected == null ? 'null' : `node${expected}`};`,
        {
          compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
        },
      ).outputText;
      const copyExports = {};
      new Function('exports', 'console', copied)(copyExports, { log() {} });
      assert.equal(copyExports.correct, true, 'Copied code must retain target object references');
      for (const language of ['typescript', 'python', 'csharp', 'java']) {
        assert(
          !lcaInputCode(language, nodes, query).includes('this.id'),
          'Copied input should not require IDs',
        );
      }
    }
  }
  const inputs = [
    ...lesson.examples.map((example) => example.input),
    'null',
    '0',
    '0, -3, 5, -5, -1, 2, 9',
  ];
  if (slug !== 'bst-search') {
    // Exercise arbitrary shapes, duplicate values, and diameters below the root.
    for (let mask = 0; mask < 128; mask++) {
      const tokens = ['1'];
      let parents = 1;
      for (let bit = 0; bit < 7 && parents; bit += 2) {
        parents--;
        for (let side = 0; side < 2; side++) {
          const present = mask & (1 << (bit + side));
          tokens.push(present ? String((bit + side) % 3) : 'null');
          if (present) parents++;
        }
      }
      inputs.push(tokens.join(', '));
    }
  }
  for (const input of inputs) {
    const nodes = parseTree(input);
    const original = JSON.stringify(nodes);
    const queries =
      slug === 'lowest-common-ancestor'
        ? nodes.length
          ? nodes.flatMap((first) =>
              nodes.map((second) => ({ first: first.id, second: second.id, target: 7 })),
            )
          : [{ first: '', second: '', target: 7 }]
        : slug === 'bst-search'
          ? [...nodes.map((node) => node.value), -999, 999].map((target) => ({
              target,
              first: '',
              second: '',
            }))
          : [{ target: 7, first: '', second: '' }];
    for (const query of queries) {
      const steps = lesson.makeSteps(nodes, 'postorder', query);
      const final = steps.at(-1);
      assert.equal(steps[0].key, 'start');
      assert.equal(final.stack.length, slug === 'bst-search' && final.key === 'found' ? 1 : 0);
      for (const step of steps) {
        for (const code of implementations)
          assert(
            code.lines.some((line) => line.key === step.key),
            `${slug}: ${code.language} missing ${step.key}`,
          );
        for (const id of [
          ...step.stack,
          ...step.visited,
          ...(step.highlighted ?? []),
          ...(step.active == null ? [] : [step.active]),
        ])
          assert(nodes.some((node) => node.id === id));
      }
      if (slug === 'tree-diameter') {
        const expected = diameterReference(nodes);
        assert.equal(final.result, `Diameter: ${expected} edges`);
        assert.equal(exported.run(nodes[0] ?? null), expected);
        assert.equal(Math.max(0, final.highlighted.length - 1), expected);
        for (let i = 1; i < final.highlighted.length; i++) {
          const a = nodes.find((node) => node.id === final.highlighted[i - 1]);
          const b = nodes.find((node) => node.id === final.highlighted[i]);
          assert(
            a.parentId === b.id || b.parentId === a.id,
            'Diameter highlight must be a continuous path',
          );
        }
      } else if (slug === 'bst-search') {
        const expected = nodes.find((node) => node.value === query.target)?.value ?? null;
        assert.equal(final.key, expected == null ? 'done' : 'found');
        assert.equal(exported.run(nodes[0] ?? null, query.target), expected);
      } else {
        const expected = ancestorReference(nodes, query.first, query.second);
        assert.equal(final.highlighted[0] ?? null, expected);
        const p = nodes.find((node) => node.id === query.first) ?? null;
        const q = nodes.find((node) => node.id === query.second) ?? null;
        assert.equal(
          exported.run(nodes[0] ?? null, p, q),
          nodes.find((node) => node.id === expected) ?? null,
        );
      }
      assert.equal(JSON.stringify(nodes), original, `${slug}: mutated input`);
      runs++;
    }
  }
}
console.log(
  `Tree lessons and displayed TypeScript passed ${runs} runs, including all node pairs, duplicate values, missing targets, invalid BSTs, and empty trees.`,
);
