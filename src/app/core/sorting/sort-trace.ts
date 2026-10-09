import type { SortStep } from '../sorting-lesson';

type SortStepDetails = Pick<
  SortStep,
  'title' | 'explanation' | 'key' | 'pass' | 'held' | 'minimum' | 'pivot' | 'range' | 'buffers'
> & {
  readonly active?: readonly number[];
  readonly sorted?: readonly number[];
};

/** Snapshots own their arrays so seeking never changes earlier steps. */
export function createSortTrace(input: readonly number[]) {
  const values = [...input];
  const steps: SortStep[] = [];
  let comparisons = 0;
  let writes = 0;
  const record = ({ active = [], sorted = [], ...details }: SortStepDetails): void => {
    steps.push({
      values: [...values],
      active: [...active],
      sorted: [...sorted],
      ...details,
      ...(details.range ? { range: [...details.range] as [number, number] } : {}),
      ...(details.buffers
        ? {
            buffers: {
              ...details.buffers,
              left: [...details.buffers.left],
              right: [...details.buffers.right],
            },
          }
        : {}),
      comparisons,
      writes,
    });
  };
  record({
    title: 'Ready to sort',
    explanation:
      'Keep the entered order and sort from smallest to largest. Amber marks values being examined; teal marks the sorted region.',
    key: 'start',
    pass: 0,
  });
  return {
    values,
    steps,
    record,
    compare: (): void => {
      comparisons++;
    },
    write: (count = 1) => {
      writes += count;
    },
    finish: () =>
      record({
        title: 'Sorting complete',
        explanation:
          'Every value is now in ascending order. The counters show value comparisons and writes to array slots; assignments to local variables are excluded.',
        key: 'done',
        pass: Math.max(0, ...steps.map((step) => step.pass)),
        active: [],
        sorted: values.map((_, i) => i),
      }),
  };
}
