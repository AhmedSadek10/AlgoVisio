export interface PracticeProblem {
  readonly title: string;
  readonly number: number;
  readonly url: string;
  readonly difficulty: 'Easy' | 'Medium' | 'Hard';
  readonly relevance: string;
}
