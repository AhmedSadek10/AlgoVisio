import type { TreeLessonConfig } from '../../../core/tree-lesson';
import { treeDiameterSteps } from '../algorithm/tree-diameter.algorithm';
import { TREE_DIAMETER_ALGORITHM } from './tree-diameter.metadata';
import { TREE_DIAMETER_EXAMPLES } from './tree-diameter.examples';
import { TREE_DIAMETER_CODE } from './tree-diameter.code';
export const TREE_DIAMETER_LESSON: TreeLessonConfig = {
  algorithm: TREE_DIAMETER_ALGORITHM,
  examples: TREE_DIAMETER_EXAMPLES,
  implementations: {
    preorder: TREE_DIAMETER_CODE,
    inorder: TREE_DIAMETER_CODE,
    postorder: TREE_DIAMETER_CODE,
  },
  makeSteps: treeDiameterSteps,
  operation: 'diameter',
  functionName: 'diameter',
  defaultOrder: 'postorder',
  articleTitle: 'The longest path can start anywhere.',
  article: [
    'The diameter is the number of edges on the longest path between two nodes. It may pass through the root, or lie completely inside one subtree.',
    'Compute heights in postorder. An empty subtree has height 0, and a leaf has height 1. At each node, the left and right heights sum to the number of edges on the longest path through that node.',
    'Keep the largest sum seen anywhere. Return one plus the larger child height to the parent. Each node is processed once, using O(n) time and O(h) recursion space.',
  ],
  takeaways: [
    'Count edges, not nodes.',
    'Process children before their parent.',
    'The longest path need not cross the root.',
    'An empty or single-node tree has diameter 0.',
  ],
  practice: [
    {
      number: 543,
      title: 'Diameter of Binary Tree',
      url: 'https://leetcode.com/problems/diameter-of-binary-tree/',
      difficulty: 'Easy',
      relevance: 'Combine child heights while tracking the longest path in edges.',
    },
  ],
};
