import type { AlgorithmCatalogEntry } from '../../../core/algorithm-catalog';

export const TREE_TRAVERSAL_ALGORITHM: AlgorithmCatalogEntry = {
  slug: 'tree-traversal',
  name: 'Binary tree traversal',
  category: 'Trees',
  icon: '⑂',
  description:
    'Explore a binary tree in preorder, inorder, or postorder. Watch how the position of the visit changes the result while recursion follows the same branches.',
  requirement:
    'Each node has at most two children. Inorder is sorted only for a binary search tree.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(h) stack',
  available: true,
};
