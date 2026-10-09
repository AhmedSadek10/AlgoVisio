import type { SortStep } from '../../../core/sorting-lesson';
import { createSortTrace } from '../../../core/sorting/sort-trace';

export function selectionSortSteps(input: readonly number[]): SortStep[] {
  const trace = createSortTrace(input);
  const { values, record } = trace;
  for (let index = 0; index < values.length - 1; index++) {
    const sorted = Array.from({ length: index }, (_, index) => index);
    let minimum = index;
    record({
      title: `Find the minimum for index ${index}`,
      explanation: 'Start with the first unsorted value as the minimum candidate.',
      key: 'minimum',
      pass: index + 1,
      active: [index],
      sorted,
      minimum,
    });
    for (let candidateIndex = index + 1; candidateIndex < values.length; candidateIndex++) {
      trace.compare();
      record({
        title: `Compare ${values[candidateIndex]} with minimum ${values[minimum]}`,
        explanation: 'Scan the whole unsorted suffix before deciding which value belongs next.',
        key: 'compare',
        pass: index + 1,
        active: [candidateIndex, minimum],
        sorted,
        minimum,
      });
      if (values[candidateIndex] < values[minimum]) {
        minimum = candidateIndex;
        record({
          title: `New minimum: ${values[candidateIndex]}`,
          explanation: 'Remember its index. The array stays unchanged until the scan finishes.',
          key: 'update',
          pass: index + 1,
          active: [candidateIndex],
          sorted,
          minimum,
        });
      }
    }
    if (minimum !== index) {
      [values[index], values[minimum]] = [values[minimum], values[index]];
      trace.write(2);
      record({
        title: 'Place the minimum',
        explanation: `Swap the minimum into index ${index}. A distant swap can change the relative order of equal values.`,
        key: 'swap',
        pass: index + 1,
        active: [index, minimum],
        sorted,
        minimum,
      });
    }
    record({
      title: `Index ${index} is final`,
      explanation: 'The sorted prefix grows by one position. Nothing in this prefix moves again.',
      key: 'passEnd',
      pass: index + 1,
      sorted: [...sorted, index],
    });
  }
  trace.finish();
  return trace.steps;
}
