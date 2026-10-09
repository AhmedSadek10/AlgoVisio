import type { PracticeProblem } from './practice-problem';
import { AlgorithmCatalogEntry } from './algorithm-catalog';
import { AlgorithmImplementation } from './visualization/algorithm-code';

export interface SortStep {
  readonly values: readonly number[];
  readonly active: readonly number[];
  readonly sorted: readonly number[];
  readonly title: string;
  readonly explanation: string;
  readonly key: string;
  readonly pass: number;
  readonly comparisons: number;
  readonly writes: number;
  readonly held?: number;
  readonly minimum?: number;
  readonly pivot?: number;
  readonly range?: readonly [number, number];
  readonly buffers?: {
    readonly left: readonly number[];
    readonly right: readonly number[];
    readonly leftIndex: number;
    readonly rightIndex: number;
  };
}
export interface SortingLessonConfig {
  readonly practice: readonly PracticeProblem[];
  readonly showMergeBuffers?: boolean;
  readonly algorithm: AlgorithmCatalogEntry;
  readonly article: readonly string[];
  readonly takeaways: readonly string[];
  readonly implementations: readonly AlgorithmImplementation[];
  readonly examples: readonly SortingExample[];
  readonly makeSteps: (values: readonly number[]) => SortStep[];
}

export interface SortingExample {
  readonly label: string;
  readonly values: readonly number[];
}
