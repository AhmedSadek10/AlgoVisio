import { LessonPractice } from '../lesson-practice/lesson-practice';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { SearchLessonConfig } from '../../core/search-lesson';
import { createPlayback } from '../../core/visualization/playback';
import { AlgorithmIntro } from '../algorithm-intro/algorithm-intro';
import { RouterLink } from '@angular/router';
import { AlgorithmWorkspace } from '../algorithm-workspace/algorithm-workspace';
import { AlgorithmWorkbench, WorkbenchPanel } from '../algorithm-workbench/algorithm-workbench';
import { ArrayVisualizer } from '../data-structures/array-visualizer/array-visualizer';
import { AlgorithmCode } from '../algorithm-code/algorithm-code';
import { MemoryTable } from '../memory-table/memory-table';
import { StepExplanation } from '../step-explanation/step-explanation';
import { PlaybackControls } from '../playback-controls/playback-controls';
import {
  searchItems,
  searchVariables,
  searchMemory,
} from '../../core/visualization/search-lesson-adapter';

import { CodeLanguage } from '../../core/visualization/algorithm-code';
import { searchCodeInput } from '../../core/visualization/code-input';

@Component({
  selector: 'app-search-lesson',
  imports: [
    LessonPractice,
    AlgorithmIntro,
    RouterLink,
    AlgorithmWorkspace,
    AlgorithmWorkbench,
    ArrayVisualizer,
    AlgorithmCode,
    MemoryTable,
    StepExplanation,
    PlaybackControls,
  ],
  templateUrl: './search-lesson.html',
  styleUrl: './search-lesson.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLesson implements OnInit, OnDestroy {
  readonly lesson = input.required<SearchLessonConfig>();
  readonly algorithm = computed(() => this.lesson().algorithm);
  readonly examples = computed(() => this.lesson().examples);

  readonly values = signal<number[]>([]);
  readonly listDraft = signal('');
  readonly listWarning = signal(false);
  readonly target = signal(0);
  readonly targetDraft = signal('');
  readonly steps = computed(() => this.lesson().makeSteps(this.values(), this.target()));
  readonly playback = createPlayback(() => this.steps().length);
  readonly step = computed(() => this.steps()[this.playback.index()]);
  readonly selectedExample = signal(0);
  readonly codeLanguage = signal<CodeLanguage>('typescript');
  readonly notice = signal('');

  private readonly arrayPanel = viewChild<TemplateRef<unknown>>('arrayPanel');
  private readonly codePanel = viewChild<TemplateRef<unknown>>('codePanel');
  private readonly explanationPanel = viewChild<TemplateRef<unknown>>('explanationPanel');
  private readonly memoryPanel = viewChild<TemplateRef<unknown>>('memoryPanel');
  readonly panels = computed<readonly WorkbenchPanel[]>(() => {
    const templates = [
      this.arrayPanel(),
      this.codePanel(),
      this.explanationPanel(),
      this.memoryPanel(),
    ];
    if (templates.some((template) => !template)) {
      return [];
    }
    return [
      {
        id: 'array',
        title: 'Array',
        role: 'primary',
        span: 6,
        height: 320,
        template: templates[0]!,
      },
      {
        id: 'code',
        title: 'Source code',
        role: 'code',
        span: 6,
        height: 590,
        template: templates[1]!,
      },
      {
        id: 'explanation',
        title: 'Current step',
        role: 'explanation',
        span: 6,
        height: 220,
        template: templates[2]!,
      },
      { id: 'memory', title: 'Array memory', span: 6, height: 250, template: templates[3]! },
    ];
  });
  readonly arrayItems = computed(() => searchItems(this.values(), this.step()));
  readonly variables = computed(() =>
    searchVariables(this.step(), this.lesson().bounds, this.target()),
  );
  readonly memory = computed(() => searchMemory(this.values(), this.step()));
  readonly implementations = computed(() => this.lesson().implementations);
  readonly memoryColumns = [
    { key: 'index', label: 'Index' },
    { key: 'value', label: 'Value' },
    { key: 'state', label: 'State' },
  ];
  readonly inputCode = computed(() =>
    searchCodeInput(this.values(), this.target(), this.codeLanguage()),
  );
  private noticeTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.selectExample(0);
  }

  ngOnDestroy(): void {
    this.playback.stop();
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
  }

  selectExample(index: number): void {
    this.playback.stop();
    const preset = this.examples()[index];
    this.selectedExample.set(index);
    this.values.set([...preset.values]);
    this.listDraft.set(preset.values.join(', '));
    this.listWarning.set(false);
    this.target.set(preset.target);
    this.targetDraft.set(String(preset.target));
    this.playback.reset();
  }

  setTargetDraft(event: Event): void {
    this.targetDraft.set((event.target as HTMLInputElement).value);
  }

  setListDraft(event: Event): void {
    this.listDraft.set((event.target as HTMLInputElement).value);
  }

  applyList(): void {
    const input = this.listDraft().trim();
    const tokens = input ? input.split(/[\s,]+/).filter(Boolean) : [];
    if (tokens.length < 1 || tokens.length > 30) {
      this.showNotice('Enter between 1 and 30 whole numbers.');
      return;
    }

    const values = tokens.map(Number);
    if (
      tokens.some((token) => !/^-?\d+$/.test(token)) ||
      values.some((value) => !Number.isInteger(value) || value < -999 || value > 999)
    ) {
      this.showNotice('Use whole numbers from -999 to 999, separated by commas or spaces.');
      return;
    }

    const wasUnsorted =
      this.lesson().requiresSorted &&
      values.some((value, index) => index > 0 && value < values[index - 1]);
    if (this.lesson().requiresSorted) {
      values.sort((a, b) => a - b);
    }
    this.playback.stop();
    this.values.set(values);
    this.listDraft.set(values.join(', '));
    this.listWarning.set(wasUnsorted);
    this.selectedExample.set(-1);
    this.playback.reset();
    if (wasUnsorted) {
      this.showNotice('Your list was unsorted, so it was sorted before searching.');
    } else {
      this.showNotice('Custom list applied.');
    }
  }

  applyTarget(): void {
    if (!this.targetDraft().trim()) {
      this.showNotice('Enter a whole number between -999 and 999.');
      return;
    }
    const parsed = Number(this.targetDraft());
    if (!Number.isInteger(parsed) || parsed < -999 || parsed > 999) {
      this.showNotice('Enter a whole number between -999 and 999.');
      return;
    }
    this.playback.stop();
    this.target.set(parsed);
    this.selectedExample.set(-1);
    this.playback.reset();
  }

  randomize(): void {
    this.playback.stop();
    const sample = new Set<number>();
    while (sample.size < 11) {
      sample.add(Math.floor(Math.random() * 90) + 1);
    }
    const values = [...sample];
    if (this.lesson().requiresSorted) {
      values.sort((a, b) => a - b);
    }
    const target = values[Math.floor(Math.random() * values.length)];
    this.values.set(values);
    this.listDraft.set(values.join(', '));
    this.listWarning.set(false);
    this.target.set(target);
    this.targetDraft.set(String(target));
    this.selectedExample.set(-1);
    this.playback.reset();
  }

  private showNotice(message: string): void {
    this.notice.set(message);
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
    this.noticeTimer = setTimeout(() => this.notice.set(''), 3500);
  }
}
