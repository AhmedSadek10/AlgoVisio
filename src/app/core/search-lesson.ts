import type { PracticeProblem } from './practice-problem';
import { AlgorithmCatalogEntry } from './algorithm-catalog';
import { SearchStep } from './search-step';
import type { AlgorithmImplementation } from './visualization/algorithm-code';

export interface SearchExample {
  readonly label: string;
  readonly values: readonly number[];
  readonly target: number;
}

export interface SearchLessonConfig {
  readonly practice: readonly PracticeProblem[];
  readonly algorithm: AlgorithmCatalogEntry;
  readonly examples: readonly SearchExample[];
  readonly requiresSorted: boolean;
  readonly makeSteps: (values: readonly number[], target: number) => SearchStep[];
  readonly idea: string;
  readonly ideaSteps: readonly string[];
  readonly insightTitle: string;
  readonly insight: string;
  readonly implementations: readonly AlgorithmImplementation[];
  readonly bounds: readonly [string, string, string];
}
