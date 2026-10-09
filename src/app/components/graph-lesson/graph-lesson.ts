import { LessonPractice } from '../lesson-practice/lesson-practice';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { GraphData, GraphLessonConfig } from '../../core/graph-lesson';
import { parseGraphInput } from '../../core/input/graph-input';
import { createPlayback } from '../../core/visualization/playback';
import { AlgorithmIntro } from '../algorithm-intro/algorithm-intro';

import { AlgorithmWorkspace } from '../algorithm-workspace/algorithm-workspace';
import { AlgorithmWorkbench, WorkbenchPanel } from '../algorithm-workbench/algorithm-workbench';
import { DataStructureVisualizer } from '../data-structures/data-structure-visualizer/data-structure-visualizer';
import { ArrayVisualizer } from '../data-structures/array-visualizer/array-visualizer';
import { AlgorithmCode } from '../algorithm-code/algorithm-code';
import { MemoryTable } from '../memory-table/memory-table';
import { StepExplanation } from '../step-explanation/step-explanation';
import { PlaybackControls } from '../playback-controls/playback-controls';
import {
  graphSnapshot,
  frontierSnapshot,
  graphMemory,
  graphVariables,
  discoveryTree,
  visitItems,
} from '../../core/visualization/graph-lesson-adapter';
import { graphCodeInput } from '../../core/visualization/code-input';
import { CodeLanguage } from '../../core/visualization/algorithm-code';

@Component({
  selector: 'app-graph-lesson',
  imports: [
    LessonPractice,
    AlgorithmIntro,
    AlgorithmWorkspace,
    AlgorithmWorkbench,
    DataStructureVisualizer,
    ArrayVisualizer,
    AlgorithmCode,
    MemoryTable,
    StepExplanation,
    PlaybackControls,
  ],
  templateUrl: './graph-lesson.html',
  styleUrl: '../../styles/lesson-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphLesson implements OnInit {
  readonly lesson = input.required<GraphLessonConfig>();
  readonly graph = signal<GraphData>({ nodes: [], edges: [], directed: false });
  readonly nodesDraft = signal('');
  readonly edgesDraft = signal('');
  readonly directedDraft = signal(false);
  readonly start = signal('');
  readonly target = signal('');
  readonly selectedExample = signal(0);
  readonly error = signal('');
  readonly steps = computed(() =>
    this.lesson().makeSteps(this.graph(), this.start(), this.target()),
  );
  readonly playback = createPlayback(() => this.steps().length);
  readonly step = computed(() => this.steps()[this.playback.index()]);
  readonly codeLanguage = signal<CodeLanguage>('typescript');
  readonly weighted = computed(() => !['dfs', 'bfs'].includes(this.lesson().kind));
  readonly spanning = computed(() => this.lesson().kind === 'kruskal');
  readonly shortestPath = computed(
    () => this.lesson().kind === 'dijkstra' || this.lesson().kind === 'bellman-ford',
  );
  private readonly graphPanel = viewChild<TemplateRef<unknown>>('graphPanel');
  private readonly frontierPanel = viewChild<TemplateRef<unknown>>('frontierPanel');
  private readonly codePanel = viewChild<TemplateRef<unknown>>('codePanel');
  private readonly explanationPanel = viewChild<TemplateRef<unknown>>('explanationPanel');
  private readonly memoryPanel = viewChild<TemplateRef<unknown>>('memoryPanel');
  private readonly orderPanel = viewChild<TemplateRef<unknown>>('orderPanel');
  private readonly treePanel = viewChild<TemplateRef<unknown>>('treePanel');
  readonly panels = computed<readonly WorkbenchPanel[]>(() => {
    const templates = [
      this.graphPanel(),
      this.frontierPanel(),
      this.codePanel(),
      this.explanationPanel(),
      this.memoryPanel(),
      this.orderPanel(),
      this.treePanel(),
    ];
    if (templates.some((template) => !template)) {
      return [];
    }
    const weighted = this.lesson().kind === 'dijkstra';
    const panels: WorkbenchPanel[] = [
      {
        id: 'graph',
        title: 'Graph',
        role: 'primary',
        span: 6,
        height: 420,
        template: templates[0]!,
      },
      {
        id: 'frontier',
        title: weighted
          ? 'Min heap'
          : this.spanning()
            ? 'Sorted edges'
            : this.lesson().kind === 'bellman-ford'
              ? 'Edges per pass'
              : this.lesson().kind === 'dfs'
                ? 'Call stack'
                : 'Queue',
        span: 6,
        height: 420,
        template: templates[1]!,
      },
      {
        id: 'code',
        title: 'Source code',
        role: 'code',
        span: 6,
        height: 650,
        template: templates[2]!,
      },
      {
        id: 'explanation',
        title: 'Current step',
        role: 'explanation',
        span: 6,
        height: 225,
        template: templates[3]!,
      },
      {
        id: 'memory',
        title: this.spanning()
          ? 'Disjoint-set memory'
          : this.shortestPath()
            ? 'Distances & parents'
            : 'Discovery memory',
        span: 6,
        height: 220,
        template: templates[4]!,
      },
      {
        id: 'order',
        title: this.spanning()
          ? 'Selected edges'
          : this.lesson().kind === 'bellman-ford'
            ? 'Relaxation history'
            : 'Visit order',
        span: 6,
        height: 180,
        template: templates[5]!,
      },
    ];
    if (!this.shortestPath()) {
      panels.push({
        id: 'tree',
        title: this.spanning() ? 'Disjoint-set forest' : 'Discovery tree',
        span: 6,
        height: 300,
        template: templates[6]!,
      });
    }
    return panels;
  });
  readonly graphView = computed(() =>
    graphSnapshot(this.graph(), this.step(), this.start(), this.lesson().kind),
  );
  readonly frontierView = computed(() =>
    frontierSnapshot(this.lesson().kind, this.step(), this.graph()),
  );
  readonly memory = computed(() => graphMemory(this.graph(), this.step()));
  readonly variables = computed(() => graphVariables(this.step()));
  readonly treeView = computed(() => discoveryTree(this.step(), this.start()));
  readonly orderItems = computed(() => visitItems(this.step(), this.graph()));
  readonly memoryColumns = computed(() =>
    this.spanning()
      ? [
          { key: 'node', label: 'Node' },
          { key: 'parent', label: 'DSU parent' },
          { key: 'root', label: 'Root' },
          { key: 'size', label: 'Component size' },
        ]
      : [
          { key: 'node', label: 'Node' },
          { key: 'distance', label: this.shortestPath() ? 'Distance' : 'Depth' },
          { key: 'parent', label: 'Parent' },
          { key: 'status', label: 'State' },
        ],
  );
  readonly inputCode = computed(() =>
    graphCodeInput(
      this.graph(),
      this.lesson().kind,
      this.start(),
      this.target(),
      this.codeLanguage(),
    ),
  );
  readonly comparison = computed(() => {
    if (this.step().trace) {
      return this.step().trace!.comparison ?? '';
    }
    const trace = this.step().dryRun;
    if (!trace || trace.candidate === null || !trace.neighbor) {
      return '';
    }
    const improves = trace.previousDistance === null || trace.candidate < trace.previousDistance;
    return `${trace.extracted?.distance} + ${trace.weight} = ${trace.candidate} ${improves ? '<' : '≥'} ${trace.previousDistance ?? '∞'} · ${improves ? 'Improve the route' : 'Keep the current route'}`;
  });
  readonly result = computed(
    () =>
      this.step().trace?.summary ??
      (this.step().path?.length
        ? this.step().path!.join(' → ') + ' · cost ' + this.step().distances[this.target()]
        : this.step().phase === 'done'
          ? 'Visit order: ' + this.step().order.join(' → ')
          : ''),
  );
  ngOnInit(): void {
    this.selectExample(0);
  }

  selectExample(index: number): void {
    this.playback.stop();
    const example = this.lesson().examples[index];
    const edges = example.edges.map(([from, to, weight], edgeIndex) => ({
      id: `edge-${edgeIndex}`,
      from,
      to,
      weight,
    }));
    this.graph.set({ nodes: [...example.nodes], edges, directed: example.directed });
    this.nodesDraft.set(example.nodes.join(', '));
    this.edgesDraft.set(
      example.edges
        .map(([from, to, weight]) => `${from} ${to}${this.weighted() ? ` ${weight}` : ''}`)
        .join('\n'),
    );
    this.directedDraft.set(example.directed);
    this.start.set(example.start);
    this.target.set(example.target ?? example.nodes[example.nodes.length - 1]);
    this.selectedExample.set(index);
    this.error.set('');
    this.playback.reset();
  }

  setNodesDraft(event: Event): void {
    this.nodesDraft.set((event.target as HTMLInputElement).value);
  }
  setEdgesDraft(event: Event): void {
    this.edgesDraft.set((event.target as HTMLTextAreaElement).value);
  }
  setDirectedDraft(event: Event): void {
    this.directedDraft.set((event.target as HTMLInputElement).checked);
  }

  applyGraph(): void {
    try {
      const graph = parseGraphInput(
        {
          nodes: this.nodesDraft(),
          edges: this.edgesDraft(),
          directed: this.directedDraft(),
        },
        this.lesson().kind,
      );

      this.playback.reset();
      this.graph.set(graph);
      if (!graph.nodes.includes(this.start())) {
        this.start.set(graph.nodes[0]);
      }
      if (!graph.nodes.includes(this.target())) {
        this.target.set(graph.nodes[graph.nodes.length - 1]);
      }
      this.selectedExample.set(-1);
      this.error.set('');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Unable to apply graph input.');
    }
  }

  selectStart(node: string): void {
    if (this.spanning()) {
      return;
    }
    this.playback.stop();
    this.start.set(node);
    this.playback.reset();
  }
  selectTarget(event: Event): void {
    this.playback.stop();
    this.target.set((event.target as HTMLSelectElement).value);
    this.playback.reset();
  }
}
