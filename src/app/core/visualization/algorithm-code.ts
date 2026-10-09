export type CodeLanguage = 'typescript' | 'python' | 'csharp' | 'java';

export const CODE_LANGUAGE_LABELS: Record<CodeLanguage, string> = {
  typescript: 'TypeScript',
  python: 'Python',
  csharp: 'C#',
  java: 'Java',
};

export interface AlgorithmCodeLine {
  readonly text: string;
  readonly key?: string;
}

export interface AlgorithmImplementation {
  readonly language: CodeLanguage;
  readonly label: string;
  readonly lines: readonly AlgorithmCodeLine[];
}
