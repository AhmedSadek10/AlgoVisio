import { SearchStep } from '../../../core/search-step';

export function jumpSearchSteps(values: readonly number[], target: number): SearchStep[] {
  const length = values.length;
  const blockSize = Math.max(1, Math.floor(Math.sqrt(length)));
  const steps: SearchStep[] = [
    {
      low: 0,
      high: length - 1,
      mid: null,
      phase: 'ready',
      iteration: 0,
      title: 'Ready to jump',
      description: `The list is sorted. Jump ahead ${blockSize} ${blockSize === 1 ? 'place' : 'places'} at a time to find the right block.`,
      activeLine: 1,
    },
  ];
  let start = 0;
  let iteration = 0;

  while (start < length) {
    const end = Math.min(start + blockSize, length) - 1;
    iteration++;
    steps.push({
      low: start,
      high: length - 1,
      mid: end,
      phase: 'compare',
      iteration,
      title: `Jump to index ${end}: ${values[end]}`,
      description: `This block runs from index ${start} to ${end}. Compare its last value, ${values[end]}, with ${target}.`,
      activeLine: 2,
      pointerLabel: 'JUMP',
    });
    if (values[end] >= target || end === length - 1) {
      steps.push({
        low: start,
        high: end,
        mid: null,
        phase: 'discard',
        iteration,
        title: `Scan the block ${start}–${end}`,
        description: `${target} can only be in this block. Check its values one by one.`,
        activeLine: 3,
      });
      for (let index = start; index <= end; index++) {
        iteration++;
        steps.push({
          low: index,
          high: end,
          mid: index,
          phase: 'compare',
          iteration,
          title: `Check index ${index}: ${values[index]}`,
          description: `Scan within the chosen block. Compare ${values[index]} with ${target}.`,
          activeLine: 4,
          pointerLabel: 'CHECK',
        });
        if (values[index] === target) {
          steps.push({
            low: index,
            high: end,
            mid: index,
            phase: 'found',
            iteration,
            title: `Found ${target} at index ${index}`,
            description: 'The scan found the target inside the selected block.',
            activeLine: 5,
          });
          return steps;
        }
        if (values[index] > target) {
          break;
        }
      }
      break;
    }
    start = end + 1;
    steps.push({
      low: start,
      high: length - 1,
      mid: end,
      phase: 'discard',
      iteration,
      title: 'Skip this block',
      description: `${values[end]} is less than ${target}, so every value up to index ${end} is too small.`,
      activeLine: 2,
    });
  }

  steps.push({
    low: length,
    high: length - 1,
    mid: null,
    phase: 'missing',
    iteration,
    title: `${target} is not in the array`,
    description: 'The block scan finished without finding the target.',
    activeLine: 6,
  });
  return steps;
}
