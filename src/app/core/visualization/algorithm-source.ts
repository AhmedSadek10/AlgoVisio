import { AlgorithmImplementation, CodeLanguage, CODE_LANGUAGE_LABELS } from './algorithm-code';
export function markedSource(language: CodeLanguage, source: string): AlgorithmImplementation {
  return {
    language,
    label: CODE_LANGUAGE_LABELS[language],
    lines: source
      .trim()
      .split('\n')
      .map((line) => {
        const match = line.match(/\s*(?:\/\/|#) @step:(\w+)$/);
        return { text: match ? line.slice(0, match.index) : line, key: match?.[1] };
      }),
  };
}
