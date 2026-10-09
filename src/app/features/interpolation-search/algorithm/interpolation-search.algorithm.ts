import { SearchStep } from '../../../core/search-step';

export function interpolationSearchSteps(values: readonly number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [
    {
      low: 0,
      high: values.length - 1,
      mid: null,
      phase: 'ready',
      iteration: 0,
      title: 'Ready to estimate',
      description:
        'The list is sorted. Estimate the target’s position from its value relative to the range endpoints.',
      activeLine: 1,
    },
  ];
  let low = 0;
  let high = values.length - 1;
  let iteration = 0;

  while (low <= high && target >= values[low] && target <= values[high]) {
    iteration++;
    const sameEndpoints = values[high] === values[low];
    const probe = sameEndpoints
      ? low
      : low + Math.floor(((target - values[low]) * (high - low)) / (values[high] - values[low]));
    steps.push({
      low,
      high,
      mid: probe,
      phase: 'compare',
      iteration,
      title: `Estimate index ${probe}: ${values[probe]}`,
      description: `Within indices ${low}–${high}, the target’s value points to index ${probe}. Compare ${values[probe]} with ${target}.`,
      activeLine: 3,
      pointerLabel: 'PROBE',
    });
    if (values[probe] === target) {
      steps.push({
        low,
        high,
        mid: probe,
        phase: 'found',
        iteration,
        title: `Found ${target} at index ${probe}`,
        description: 'The estimated position contains the target.',
        activeLine: 4,
      });
      return steps;
    }
    if (values[probe] < target) {
      low = probe + 1;
      steps.push({
        low,
        high,
        mid: probe,
        phase: 'discard',
        iteration,
        title: 'Look farther right',
        description: `${values[probe]} is too small. Continue above index ${probe}.`,
        activeLine: 5,
      });
    } else {
      high = probe - 1;
      steps.push({
        low,
        high,
        mid: probe,
        phase: 'discard',
        iteration,
        title: 'Look farther left',
        description: `${values[probe]} is too large. Continue below index ${probe}.`,
        activeLine: 6,
      });
    }
  }
  steps.push({
    low,
    high,
    mid: null,
    phase: 'missing',
    iteration,
    title: `${target} is not in the array`,
    description: 'The remaining range is empty or the target falls outside its endpoint values.',
    activeLine: 8,
  });
  return steps;
}
