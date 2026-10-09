import { SearchStep } from '../search-step';
import { VisualItem, StepVariable, MemoryRow } from './structure-snapshot';
export function searchItems(values: readonly number[], step: SearchStep): VisualItem[] {
  return values.map((value, index) => ({
    id: String(index),
    label: String(value),
    marker:
      step.mid === index && step.phase !== 'discard'
        ? step.phase === 'found'
          ? 'FOUND'
          : step.pointerLabel || 'CHECK'
        : '',
    state:
      step.mid === index && step.phase === 'found'
        ? 'found'
        : step.mid === index && step.phase === 'compare'
          ? 'active'
          : index < step.low || index > step.high
            ? 'discarded'
            : 'idle',
  }));
}
export function searchVariables(
  step: SearchStep,
  bounds: readonly string[],
  target: number,
): StepVariable[] {
  return [
    { name: bounds[0], value: step.low },
    { name: bounds[1], value: step.mid ?? '—' },
    { name: bounds[2], value: step.high },
    { name: 'target', value: target },
    { name: 'iteration', value: step.iteration },
  ];
}
export function searchMemory(values: readonly number[], step: SearchStep): MemoryRow[] {
  return searchItems(values, step).map((item, index) => ({
    id: item.id,
    cells: {
      index,
      value: values[index],
      state:
        item.state === 'active'
          ? 'Checking'
          : item.state === 'found'
            ? 'Found'
            : item.state === 'discarded'
              ? 'Eliminated'
              : 'Remaining',
    },
    state: item.state,
  }));
}
