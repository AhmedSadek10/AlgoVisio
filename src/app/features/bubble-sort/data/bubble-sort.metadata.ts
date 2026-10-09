import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const BUBBLE_SORT_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'bubble-sort',
  name: 'Bubble sort',
  category: 'Sorting',
  icon: '⇧',
  description:
    'Compare adjacent values and swap them when they are out of order. Each pass moves the largest remaining value to its final position.',
  timeComplexity: 'O(n²) worst · O(n) best',
  spaceComplexity: 'O(1)',
  available: true,
};
