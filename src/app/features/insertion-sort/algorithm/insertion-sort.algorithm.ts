import type { SortStep } from '../../../core/sorting-lesson';
import { createSortTrace } from '../../../core/sorting/sort-trace';

export function insertionSortSteps(input: readonly number[]): SortStep[] {
  const trace = createSortTrace(input);
  const { values, record } = trace;
  for (let index = 1; index < values.length; index++) {
    const held = values[index];
    let insertionIndex = index - 1;
    const prefix = Array.from({ length: index }, (_, index) => index);
    record({
      title: `Hold ${held} aside`,
      explanation:
        'Save the next value in a local variable before shifting array slots. The prefix is sorted, but its positions can still move.',
      key: 'hold',
      pass: index,
      active: [index],
      sorted: prefix,
      held,
    });
    while (insertionIndex >= 0) {
      trace.compare();
      record({
        title: `Compare ${values[insertionIndex]} with held value ${held}`,
        explanation:
          'Shift only values strictly larger than the held value. Equal values stay in their original relative order.',
        key: 'compare',
        pass: index,
        active: [insertionIndex, insertionIndex + 1],
        held,
      });
      if (values[insertionIndex] <= held) {
        break;
      }
      values[insertionIndex + 1] = values[insertionIndex];
      trace.write();
      record({
        title: 'Shift one position right',
        explanation:
          'Copy the larger value into the next slot. The temporary duplicate is expected: the held value remains safe outside the array.',
        key: 'shift',
        pass: index,
        active: [insertionIndex, insertionIndex + 1],
        held,
      });
      insertionIndex--;
    }
    values[insertionIndex + 1] = held;
    trace.write();
    record({
      title: `Insert ${held} at index ${insertionIndex + 1}`,
      explanation:
        'The expanded prefix is sorted. Unlike selection sort, these are ordered values, not necessarily their final positions.',
      key: 'insert',
      pass: index,
      active: [insertionIndex + 1],
      sorted: [...prefix, index],
    });
  }
  trace.finish();
  return trace.steps;
}
