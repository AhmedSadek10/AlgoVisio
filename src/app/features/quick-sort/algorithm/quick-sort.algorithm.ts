import type { SortStep } from '../../../core/sorting-lesson';
import { createSortTrace } from '../../../core/sorting/sort-trace';

/** Lomuto partitioning: the last value is the pivot for each range. */
export function quickSortSteps(input: readonly number[]): SortStep[] {
  const trace = createSortTrace(input);
  const values = trace.values;
  const sorted = new Set<number>();
  let pass = 0;

  function sortRange(low: number, high: number): void {
    if (low > high) {
      return;
    }
    if (low === high) {
      sorted.add(low);
      trace.record({
        title: 'One value remains',
        explanation: `Index ${low} is already in its final position.`,
        key: 'base',
        pass,
        sorted: [...sorted],
      });
      return;
    }

    pass++;
    const pivot = values[high];
    let boundary = low;
    const range: readonly [number, number] = [low, high];
    trace.record({
      title: `Choose pivot ${pivot}`,
      explanation: `Partition indices ${low}–${high}. Values smaller than ${pivot} will move before the boundary.`,
      key: 'pivot',
      pass,
      pivot: high,
      range,
      active: [high],
      sorted: [...sorted],
    });

    for (let index = low; index < high; index++) {
      trace.compare();
      trace.record({
        title: `Compare ${values[index]} with ${pivot}`,
        explanation: `${values[index]} ${values[index] < pivot ? 'belongs before the boundary' : 'stays on the greater-or-equal side'}. Boundary index: ${boundary}.`,
        key: 'compare',
        pass,
        pivot: high,
        range,
        active: [index, high],
        sorted: [...sorted],
      });
      if (values[index] < pivot) {
        if (index !== boundary) {
          const temporary = values[index];
          values[index] = values[boundary];
          values[boundary] = temporary;
          trace.write(2);
          trace.record({
            title: 'Move a smaller value left',
            explanation: `Swap indices ${index} and ${boundary}, then advance the boundary.`,
            key: 'swap',
            pass,
            pivot: high,
            range,
            active: [index, boundary],
            sorted: [...sorted],
          });
        }
        boundary++;
      }
    }

    if (boundary !== high) {
      const temporary = values[boundary];
      values[boundary] = values[high];
      values[high] = temporary;
      trace.write(2);
    }
    sorted.add(boundary);
    trace.record({
      title: 'Place the pivot',
      explanation: `Pivot ${pivot} is final at index ${boundary}. Its left side is smaller; its right side is greater or equal.`,
      key: 'place',
      pass,
      pivot: boundary,
      range,
      active: [boundary],
      sorted: [...sorted],
    });
    trace.record({
      title: 'Sort both partitions',
      explanation:
        'Apply the same partitioning to the left range, then the right range. Exclude the finished pivot.',
      key: 'recurse',
      pass,
      range,
      sorted: [...sorted],
    });
    sortRange(low, boundary - 1);
    sortRange(boundary + 1, high);
  }

  sortRange(0, values.length - 1);
  trace.finish();
  return trace.steps;
}
