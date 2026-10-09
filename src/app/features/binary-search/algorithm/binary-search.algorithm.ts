import { SearchStep } from '../../../core/search-step';

export function binarySearchSteps(values: readonly number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [
    {
      low: 0,
      high: values.length - 1,
      mid: null,
      phase: 'ready',
      title: 'Ready to search',
      description:
        'The array is sorted. Start in the middle and eliminate half of the remaining values after each comparison.',
      activeLine: 1,
      iteration: 0,
    },
  ];

  let low = 0;
  let high = values.length - 1;
  let iteration = 0;
  while (low <= high) {
    iteration++;
    const mid = Math.floor((low + high) / 2);
    const value = values[mid];
    steps.push({
      low,
      high,
      mid,
      phase: 'compare',
      iteration,
      title: `Check the middle value: ${value}`,
      description: `The search range is index ${low} to ${high}. The middle is index ${mid}, which holds ${value}. Compare it with ${target}.`,
      activeLine: 3,
    });
    if (value === target) {
      steps.push({
        low,
        high,
        mid,
        phase: 'found',
        iteration,
        title: `Found ${target} at index ${mid}`,
        description: `The middle value matches the target. The search is complete after ${iteration} ${iteration === 1 ? 'comparison' : 'comparisons'}.`,
        activeLine: 5,
      });
      return steps;
    }
    if (value < target) {
      steps.push({
        low: mid + 1,
        high,
        mid,
        phase: 'discard',
        iteration,
        title: 'Discard the left half',
        description: `${value} is smaller than ${target}. Every value at or left of index ${mid} is too small, so move low to ${mid + 1}.`,
        activeLine: 7,
      });
      low = mid + 1;
    } else {
      steps.push({
        low,
        high: mid - 1,
        mid,
        phase: 'discard',
        iteration,
        title: 'Discard the right half',
        description: `${value} is larger than ${target}. Every value at or right of index ${mid} is too large, so move high to ${mid - 1}.`,
        activeLine: 8,
      });
      high = mid - 1;
    }
  }
  steps.push({
    low,
    high,
    mid: null,
    phase: 'missing',
    iteration,
    title: `${target} is not in the array`,
    description: 'Low has passed high, so no values remain to check. The target is not present.',
    activeLine: 11,
  });
  return steps;
}
