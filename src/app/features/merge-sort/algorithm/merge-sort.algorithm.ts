import type { SortStep } from '../../../core/sorting-lesson';
import { createSortTrace } from '../../../core/sorting/sort-trace';

/** Top-down merge sort. Buffer snapshots keep overwritten values visible. */
export function mergeSortSteps(input: readonly number[]): SortStep[] {
  const trace = createSortTrace(input);
  const values = trace.values;
  let pass = 0;

  function sortRange(low: number, high: number): void {
    if (low >= high) {
      if (low === high) {
        trace.record({
          title: 'One value is already ordered',
          explanation: `Index ${low} needs no further splitting. It may move in a later merge.`,
          key: 'base',
          pass,
          active: [low],
        });
      }
      return;
    }

    const middle = low + Math.floor((high - low) / 2);
    const range: readonly [number, number] = [low, high];
    trace.record({
      title: 'Split the range',
      explanation: `Split indices ${low}–${high} into ${low}–${middle} and ${middle + 1}–${high}. Sort both halves before merging.`,
      key: 'split',
      pass,
      range,
      active: [low, middle, high],
    });
    sortRange(low, middle);
    sortRange(middle + 1, high);

    pass++;
    const left = values.slice(low, middle + 1);
    const right = values.slice(middle + 1, high + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let writeIndex = low;

    function record(
      key: string,
      title: string,
      explanation: string,
      active: readonly number[] = [],
    ): void {
      trace.record({
        title,
        explanation,
        key,
        pass,
        range,
        active,
        buffers: { left, right, leftIndex, rightIndex },
      });
    }
    record(
      'buffers',
      'Copy the sorted halves',
      'Temporary arrays preserve both halves while the original array is overwritten. Writes count destination array slots only.',
    );
    while (leftIndex < left.length && rightIndex < right.length) {
      trace.compare();
      record(
        'compare',
        'Compare the next buffer values',
        `Compare left ${left[leftIndex]} with right ${right[rightIndex]}. Take the left value on a tie to keep the sort stable.`,
        [writeIndex],
      );
      if (left[leftIndex] <= right[rightIndex]) {
        values[writeIndex] = left[leftIndex];
        leftIndex++;
        trace.write();
        record(
          'writeLeft',
          'Take from the left',
          `Write ${values[writeIndex]} at index ${writeIndex}.`,
          [writeIndex],
        );
      } else {
        values[writeIndex] = right[rightIndex];
        rightIndex++;
        trace.write();
        record(
          'writeRight',
          'Take from the right',
          `Write ${values[writeIndex]} at index ${writeIndex}.`,
          [writeIndex],
        );
      }
      writeIndex++;
    }
    while (leftIndex < left.length) {
      values[writeIndex] = left[leftIndex];
      leftIndex++;
      trace.write();
      record(
        'remainderLeft',
        'Copy the remaining left value',
        `The right buffer is exhausted. Write ${values[writeIndex]} at index ${writeIndex}.`,
        [writeIndex],
      );
      writeIndex++;
    }
    while (rightIndex < right.length) {
      values[writeIndex] = right[rightIndex];
      rightIndex++;
      trace.write();
      record(
        'remainderRight',
        'Copy the remaining right value',
        `The left buffer is exhausted. Write ${values[writeIndex]} at index ${writeIndex}.`,
        [writeIndex],
      );
      writeIndex++;
    }
    trace.record({
      title: 'Range merged',
      explanation: `Indices ${low}–${high} are ordered. They may move again when merged with a neighboring range.`,
      key: 'merged',
      pass,
      range,
      sorted: Array.from({ length: high - low + 1 }, (_, index) => low + index),
      buffers: { left, right, leftIndex, rightIndex },
    });
  }

  sortRange(0, values.length - 1);
  trace.finish();
  return trace.steps;
}
