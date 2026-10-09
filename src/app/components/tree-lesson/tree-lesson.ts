import { LessonPractice } from '../lesson-practice/lesson-practice';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  TemplateRef,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import type {
  TreeLessonConfig,
  TraversalOrder,
  TreeNode,
  TreeExample,
  TreeQuery,
} from '../../core/tree-lesson';
import { parseTree } from '../../core/input/tree-input';
import { lcaInputCode } from '../../core/input/lca-input';
import { AlgorithmIntro } from '../algorithm-intro/algorithm-intro';
import { AlgorithmWorkspace } from '../algorithm-workspace/algorithm-workspace';
import { AlgorithmWorkbench, WorkbenchPanel } from '../algorithm-workbench/algorithm-workbench';
import { DataStructureVisualizer } from '../data-structures/data-structure-visualizer/data-structure-visualizer';
import { AlgorithmCode } from '../algorithm-code/algorithm-code';
import { StepExplanation } from '../step-explanation/step-explanation';
import { PlaybackControls } from '../playback-controls/playback-controls';
import { MemoryTable } from '../memory-table/memory-table';
import { CodeLanguage } from '../../core/visualization/algorithm-code';
import {
  TreeSnapshot,
  SequenceSnapshot,
  MemoryRow,
} from '../../core/visualization/structure-snapshot';
import { createPlayback } from '../../core/visualization/playback';

@Component({
  selector: 'app-tree-lesson',
  imports: [
    LessonPractice,
    AlgorithmIntro,
    AlgorithmWorkspace,
    AlgorithmWorkbench,
    DataStructureVisualizer,
    AlgorithmCode,
    StepExplanation,
    PlaybackControls,
    MemoryTable,
  ],
  templateUrl: './tree-lesson.html',
  styleUrl: '../../styles/lesson-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeLesson implements OnInit {
  readonly lesson = input.required<TreeLessonConfig>();
  readonly orders: readonly TraversalOrder[] = ['preorder', 'inorder', 'postorder'];
  readonly examples = computed(() => this.lesson().examples);
  readonly draft = signal('');
  readonly appliedInput = signal('');
  readonly selectedExample = computed(() => {
    const values = this.appliedInput().replace(/\s/g, '');
    const query = this.query();
    return (
      this.examples().find(
        (example) =>
          example.input.replace(/\s/g, '') === values &&
          (this.lesson().operation !== 'search' || example.query?.target === query.target) &&
          (this.lesson().operation !== 'ancestor' ||
            (example.query?.first === query.first && example.query?.second === query.second)),
      )?.label ?? 'Custom tree'
    );
  });
  readonly nodes = signal<TreeNode[]>([]);
  readonly order = signal<TraversalOrder>('inorder');
  readonly error = signal('');
  readonly targetDraft = signal('7');
  readonly firstDraft = signal('');
  readonly secondDraft = signal('');
  readonly query = signal<TreeQuery>({ target: 7, first: '', second: '' });
  readonly appliedTargets = computed(() => {
    const query = this.query();
    const label = (id: string) => this.nodes().find((node) => node.id === id)?.value ?? 'none';
    return `Applied targets: p = ${label(query.first)}, q = ${label(query.second)}`;
  });
  readonly language = signal<CodeLanguage>('typescript');
  readonly steps = computed(() =>
    this.lesson().makeSteps(this.nodes(), this.order(), this.query()),
  );
  readonly playback = createPlayback(() => this.steps().length);
  readonly step = computed(() => this.steps()[this.playback.index()]);
  readonly code = computed(() => this.lesson().implementations[this.order()]);
  readonly tree = computed<TreeSnapshot>(() => ({
    kind: 'tree',
    nodes: this.nodes().map((node) => ({
      id: node.id,
      parentId: node.parentId,
      label: String(node.value),
      detail:
        this.lesson().operation === 'diameter'
          ? (this.step().details?.[node.id] ?? node.side)
          : node.side,
      marker: this.step().highlighted?.includes(node.id)
        ? this.lesson().operation === 'diameter'
          ? 'Longest path'
          : this.lesson().operation === 'ancestor'
            ? `LCA candidate · ${node.id}`
            : 'Found'
        : this.lesson().operation === 'ancestor'
          ? `node ${node.id}`
          : undefined,
      state: this.step().highlighted?.includes(node.id)
        ? 'found'
        : this.step().active === node.id
          ? 'active'
          : this.step().visited.includes(node.id)
            ? 'visited'
            : 'idle',
    })),
  }));
  readonly stack = computed<SequenceSnapshot>(() => ({
    kind: 'stack',
    operation:
      this.lesson().operation === 'search'
        ? 'Current search node'
        : 'Recursive calls · newest frame at the top',
    items: this.step().stack.map((id) => ({
      id,
      label: String(this.nodes().find((node) => node.id === id)!.value),
    })),
  }));
  readonly output = computed<SequenceSnapshot>(() => ({
    kind: 'array',
    operation: this.lesson().operation ? 'Processed nodes' : `${this.order()} visit order`,
    items: this.step().visited.map((id) => ({
      id,
      label: String(this.nodes().find((node) => node.id === id)!.value),
      state: 'visited',
    })),
  }));
  readonly columns = [
    { key: 'value', label: 'Value' },
    { key: 'parent', label: 'Parent' },
    { key: 'side', label: 'Child' },
    { key: 'visit', label: 'Visit #' },
  ];
  readonly memory = computed<readonly MemoryRow[]>(() =>
    this.nodes().map((node) => ({
      id: node.id,
      cells: {
        value: node.value,
        parent: this.nodes().find((parent) => parent.id === node.parentId)?.value ?? '—',
        side: node.side,
        visit: this.step().visited.includes(node.id)
          ? this.step().visited.indexOf(node.id) + 1
          : '—',
      },
      state: this.step().active === node.id ? 'active' : 'idle',
    })),
  );
  private readonly treePanel = viewChild<TemplateRef<unknown>>('treePanel');
  private readonly stackPanel = viewChild<TemplateRef<unknown>>('stackPanel');
  private readonly outputPanel = viewChild<TemplateRef<unknown>>('outputPanel');
  private readonly codePanel = viewChild<TemplateRef<unknown>>('codePanel');
  private readonly explanationPanel = viewChild<TemplateRef<unknown>>('explanationPanel');
  private readonly memoryPanel = viewChild<TemplateRef<unknown>>('memoryPanel');
  readonly panels = computed<readonly WorkbenchPanel[]>(() => {
    const templates = [
      this.treePanel(),
      this.stackPanel(),
      this.codePanel(),
      this.explanationPanel(),
      this.memoryPanel(),
      this.outputPanel(),
    ];
    if (templates.some((template) => !template)) {
      return [];
    }
    return [
      'Tree',
      this.lesson().operation === 'search' ? 'Search cursor' : 'Call stack',
      'Source code',
      'Current step',
      'Node memory',
      this.lesson().operation ? 'Processed nodes' : 'Visit order',
    ].map((title, i) => ({
      id: String(i),
      title,
      span: i < 3 ? 4 : 6,
      height: i < 3 ? 380 : 250,
      template: templates[i]!,
      role: i === 0 ? 'primary' : i === 2 ? 'code' : i === 3 ? 'explanation' : undefined,
    }));
  });
  readonly inputCode = computed(() => {
    const language = this.language();
    if (this.lesson().operation === 'ancestor') {
      return lcaInputCode(language, this.nodes(), this.query());
    }
    const expression = (node: TreeNode | null): string => {
      if (!node) {
        return language === 'python' ? 'None' : 'null';
      }
      const left = expression(node.left);
      const right = expression(node.right);
      if (language === 'typescript') {
        return `{ value: ${node.value}, left: ${left}, right: ${right} }`;
      }
      return `${language === 'python' ? '' : 'new '}TreeNode(${node.value}, ${left}, ${right})`;
    };
    const root = expression(this.nodes()[0] ?? null);
    const functionName = this.lesson().functionName ?? 'traverse';
    const query = this.query();
    const args = this.lesson().operation === 'search' ? `, ${query.target}` : '';
    const inputRoot = root;
    if (language === 'python') {
      return `root = ${inputRoot}\nprint(${functionName}(root${args}))`;
    }
    if (language === 'typescript') {
      return `const root: TreeNode | null = ${inputRoot};\nconsole.log(${functionName}(root${args}));`;
    }
    if (language === 'csharp') {
      return `  static void Main() {
    TreeNode? root = ${inputRoot};
    Console.WriteLine(${this.lesson().operation ? `${functionName}(root${args})` : 'string.Join(", ", Traverse(root))'});
  }`;
    }
    return `  public static void main(String[] args) {
    TreeNode root = ${inputRoot};
    System.out.println(${functionName}(root${args}));
  }`;
  });
  ngOnInit(): void {
    this.order.set(this.lesson().defaultOrder);
    this.selectExample(this.examples()[0]);
  }

  apply(): void {
    try {
      const nodes = parseTree(this.draft());
      this.lesson().validate?.(nodes);
      if (
        this.lesson().operation === 'search' &&
        (!/^-?\d+$/.test(this.targetDraft()) || Math.abs(Number(this.targetDraft())) > 999)
      ) {
        throw new Error('Enter a whole-number target from -999 to 999.');
      }
      const first = this.firstDraft();
      const second = this.secondDraft();
      if (
        this.lesson().operation === 'ancestor' &&
        nodes.length &&
        (!nodes.some((node) => node.id === first) || !nodes.some((node) => node.id === second))
      ) {
        throw new Error('Choose two nodes from the current tree.');
      }
      this.playback.reset();
      this.query.set({ target: Number(this.targetDraft()), first, second });
      this.nodes.set(nodes);
      this.appliedInput.set(this.draft().trim());
      this.error.set('');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Unable to apply input.');
    }
  }
  selectExample(example: TreeExample): void {
    this.draft.set(example.input);
    this.targetDraft.set(String(example.query?.target ?? 7));
    const nodes = parseTree(example.input);
    this.firstDraft.set(example.query?.first ?? nodes[0]?.id ?? '');
    this.secondDraft.set(example.query?.second ?? nodes.at(-1)?.id ?? '');
    this.apply();
  }
  editTree(text: string): void {
    this.draft.set(text);
    const nodes = this.draftNodes();
    if (!nodes.some((node) => node.id === this.firstDraft())) {
      this.firstDraft.set('');
    }
    if (!nodes.some((node) => node.id === this.secondDraft())) {
      this.secondDraft.set('');
    }
  }
  selectAncestorTarget(target: 'first' | 'second', id: string): void {
    (target === 'first' ? this.firstDraft : this.secondDraft).set(id);
    this.apply();
  }
  readonly draftNodes = computed(() => {
    try {
      return parseTree(this.draft());
    } catch {
      return [];
    }
  });
  selectOrder(order: TraversalOrder): void {
    this.playback.reset();
    this.order.set(order);
  }
}
