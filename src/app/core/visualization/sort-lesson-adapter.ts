import type { SortStep } from '../sorting-lesson';
import type { ItemState, MemoryRow, SequenceSnapshot, StepVariable } from './structure-snapshot';

function sortItemState(step: SortStep, index: number): ItemState {
  if (step.active.includes(index)) {
    return 'active';
  }
  if (step.sorted.includes(index)) {
    return 'visited';
  }
  return 'idle';
}

export function sortSnapshot(step: SortStep): SequenceSnapshot {
  return {
    kind: 'array',
    operation: step.title,
    items: step.values.map((value, index) => ({
      id: String(index),
      label: String(value),
      state: sortItemState(step, index),
      marker:
        step.pivot === index
          ? 'PIVOT'
          : step.minimum === index
            ? 'MIN'
            : step.sorted.includes(index)
              ? 'SORTED'
              : '',
    })),
  };
}

export function originalSortSnapshot(values: readonly number[]): SequenceSnapshot {
  return {
    kind: 'array',
    operation: 'Original input for comparison',
    items: values.map((value, index) => ({ id: String(index), label: String(value) })),
  };
}

export function sortVariables(step: SortStep): readonly StepVariable[] {
  const variables: StepVariable[] = [
    { name: 'pass', value: step.pass },
    { name: 'comparisons', value: step.comparisons },
    { name: 'array writes', value: step.writes },
  ];
  if (step.held !== undefined) {
    variables.push({ name: 'held', value: step.held });
  }
  if (step.minimum !== undefined) {
    variables.push({ name: 'minimum index', value: step.minimum });
  }
  if (step.pivot !== undefined) {
    variables.push({ name: 'pivot', value: step.values[step.pivot] });
    variables.push({ name: 'pivot index', value: step.pivot });
  }
  if (step.range) {
    variables.push({ name: 'range', value: `${step.range[0]}–${step.range[1]}` });
  }
  return variables;
}

export function sortBufferSnapshot(step: SortStep, side: 'left' | 'right'): SequenceSnapshot {
  const values = step.buffers?.[side] ?? [];
  const cursor = step.buffers?.[side === 'left' ? 'leftIndex' : 'rightIndex'] ?? 0;
  return {
    kind: 'array',
    operation: `${side === 'left' ? 'Left' : 'Right'} temporary array`,
    items: values.map((value, index) => ({
      id: String(index),
      label: String(value),
      state: index < cursor ? 'visited' : index === cursor ? 'active' : 'idle',
      marker: index < cursor ? 'COPIED' : index === cursor ? 'NEXT' : '',
    })),
  };
}

export function sortMemory(original: readonly number[], step: SortStep): readonly MemoryRow[] {
  return step.values.map((value, index) => {
    const state = sortItemState(step, index);
    return {
      id: String(index),
      cells: {
        index,
        original: original[index],
        current: value,
        status: state === 'active' ? 'Current' : state === 'visited' ? 'Sorted region' : 'Unsorted',
      },
      state,
    };
  });
}
