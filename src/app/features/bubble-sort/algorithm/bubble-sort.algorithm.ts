import type { SortStep } from '../../../core/sorting-lesson';
import { createSortTrace } from '../../../core/sorting/sort-trace';

export function bubbleSortSteps(input: readonly number[]): SortStep[] {
  const trace = createSortTrace(input);
  const { values, record } = trace;
  for (let unsortedEnd = values.length - 1; unsortedEnd > 0; unsortedEnd--) {
    const pass = values.length - unsortedEnd;
    const sorted = values.map((_, i) => i).filter((i) => i > unsortedEnd);
    let swapped = false;
    record({
      title: `Begin pass ${pass}`,
      explanation: `Compare neighbors through index ${unsortedEnd}. The suffix to its right is already final.`,
      key: 'pass',
      pass,
      sorted,
    });
    for (let neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
      trace.compare();
      record({
        title: `Compare ${values[neighborIndex]} and ${values[neighborIndex + 1]}`,
        explanation:
          'If the left value is larger, swap the pair. Equal values keep their relative order.',
        key: 'compare',
        pass,
        active: [neighborIndex, neighborIndex + 1],
        sorted,
      });
      if (values[neighborIndex] > values[neighborIndex + 1]) {
        [values[neighborIndex], values[neighborIndex + 1]] = [
          values[neighborIndex + 1],
          values[neighborIndex],
        ];
        trace.write(2);
        swapped = true;
        record({
          title: 'Swap the neighbors',
          explanation:
            'The larger value moves one slot right toward the end of the unsorted region. A swap writes two array slots.',
          key: 'swap',
          pass,
          active: [neighborIndex, neighborIndex + 1],
          sorted,
        });
      }
    }
    record({
      title: `Index ${unsortedEnd} is final`,
      explanation: 'The largest remaining value has reached the end of this pass.',
      key: 'passEnd',
      pass,
      sorted: [unsortedEnd, ...sorted],
    });
    if (!swapped) {
      record({
        title: 'No swaps: stop early',
        explanation:
          'Every neighboring pair was already ordered. The entire array is sorted, so no further passes are needed.',
        key: 'early',
        pass,
        sorted: values.map((_, i) => i),
      });
      break;
    }
  }
  trace.finish();
  return trace.steps;
}
