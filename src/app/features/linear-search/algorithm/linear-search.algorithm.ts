import { SearchStep } from '../../../core/search-step';

export function linearSearchSteps(values: readonly number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [
    {
      low: 0,
      high: values.length - 1,
      mid: null,
      phase: 'ready',
      iteration: 0,
      title: 'Ready to scan',
      description: 'Start at the first value. Linear search does not need a sorted array.',
      activeLine: 1,
    },
  ];

  for (let index = 0; index < values.length; index++) {
    const iteration = index + 1;
    steps.push({
      low: index,
      high: values.length - 1,
      mid: index,
      phase: 'compare',
      iteration,
      title: `Check index ${index}: ${values[index]}`,
      description: `Compare ${values[index]} with ${target}. If they match, stop; otherwise move one position right.`,
      activeLine: 2,
      pointerLabel: 'CHECK',
    });
    if (values[index] === target) {
      steps.push({
        low: index,
        high: values.length - 1,
        mid: index,
        phase: 'found',
        iteration,
        title: `Found ${target} at index ${index}`,
        description: `The value matches after ${iteration} ${iteration === 1 ? 'comparison' : 'comparisons'}.`,
        activeLine: 3,
      });
      return steps;
    }
    steps.push({
      low: index + 1,
      high: values.length - 1,
      mid: index,
      phase: 'discard',
      iteration,
      title: `Move past ${values[index]}`,
      description: `${values[index]} is not the target. Continue with index ${index + 1}.`,
      activeLine: 4,
    });
  }

  steps.push({
    low: values.length,
    high: values.length - 1,
    mid: null,
    phase: 'missing',
    iteration: values.length,
    title: `${target} is not in the list`,
    description: 'Every value was checked and none matched the target.',
    activeLine: 5,
  });
  return steps;
}
