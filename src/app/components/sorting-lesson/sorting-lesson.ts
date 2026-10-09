import { LessonPractice } from '../lesson-practice/lesson-practice';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SortingLessonConfig } from '../../core/sorting-lesson';
import { parseSortInput } from '../../core/input/sort-input';
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
  sortSnapshot,
  originalSortSnapshot,
  sortVariables,
  sortMemory,
  sortBufferSnapshot,
} from '../../core/visualization/sort-lesson-adapter';
import { sortCodeInput } from '../../core/visualization/sort-code-input';
import { createPlayback } from '../../core/visualization/playback';

@Component({
  selector: 'app-sorting-lesson',
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
  templateUrl: './sorting-lesson.html',
  styleUrls: ['../../styles/lesson-layout.css', './sorting-lesson.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingLesson implements OnInit {
  readonly lesson = input.required<SortingLessonConfig>();
  readonly examples = computed(() => this.lesson().examples);
  readonly values = signal<readonly number[]>([]);
  readonly draft = signal('');
  readonly selectedExample = signal(0);
  readonly error = signal('');
  readonly language = signal<CodeLanguage>('typescript');
  readonly steps = computed(() => this.lesson().makeSteps(this.values()));
  readonly playback = createPlayback(() => this.steps().length);
  readonly step = computed(() => this.steps()[this.playback.index()]);
  readonly array = computed(() => sortSnapshot(this.step()));
  readonly original = computed(() => originalSortSnapshot(this.values()));
  readonly variables = computed(() => sortVariables(this.step()));
  readonly leftBuffer = computed(() => sortBufferSnapshot(this.step(), 'left'));
  readonly rightBuffer = computed(() => sortBufferSnapshot(this.step(), 'right'));
  readonly columns = [
    { key: 'index', label: 'Index' },
    { key: 'original', label: 'Original' },
    { key: 'current', label: 'Current' },
    { key: 'status', label: 'Status' },
  ];
  readonly memory = computed(() => sortMemory(this.values(), this.step()));
  readonly inputCode = computed(() => sortCodeInput(this.values(), this.language()));

  private readonly arrayPanel = viewChild<TemplateRef<unknown>>('arrayPanel');
  private readonly codePanel = viewChild<TemplateRef<unknown>>('codePanel');
  private readonly explanationPanel = viewChild<TemplateRef<unknown>>('explanationPanel');
  private readonly memoryPanel = viewChild<TemplateRef<unknown>>('memoryPanel');
  private readonly originalPanel = viewChild<TemplateRef<unknown>>('originalPanel');
  private readonly buffersPanel = viewChild<TemplateRef<unknown>>('buffersPanel');
  readonly panels = computed<readonly WorkbenchPanel[]>(() => {
    const templates = [
      this.arrayPanel(),
      this.codePanel(),
      this.explanationPanel(),
      this.memoryPanel(),
      this.originalPanel(),
    ];
    const titles = [
      'Array · current state',
      'Source code',
      'Current step',
      'Array memory',
      'Original input',
    ];
    if (this.lesson().showMergeBuffers) {
      templates.splice(3, 0, this.buffersPanel());
      titles.splice(3, 0, 'Merge buffers');
    }
    if (templates.some((template) => !template)) {
      return [];
    }
    return titles.map((title, i) => ({
      id: String(i),
      title,
      span: i < 2 || this.lesson().showMergeBuffers ? 6 : 4,
      height: i < 2 ? 360 : 300,
      template: templates[i]!,
      role: i === 0 ? 'primary' : i === 1 ? 'code' : i === 2 ? 'explanation' : undefined,
    }));
  });
  ngOnInit(): void {
    this.selectExample(0);
  }

  apply(): void {
    try {
      const values = parseSortInput(this.draft());
      this.playback.reset();
      this.values.set(values);
      this.error.set('');
      this.selectedExample.set(-1);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Unable to apply input.');
    }
  }
  selectExample(index: number): void {
    this.playback.reset();
    this.values.set(this.examples()[index].values);
    this.draft.set(this.examples()[index].values.join(', '));
    this.error.set('');
    this.selectedExample.set(index);
  }
}
