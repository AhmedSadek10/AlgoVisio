import type { TreeLessonConfig } from '../../../core/tree-lesson';
import { treeTraversalSteps } from '../algorithm/tree-traversal.algorithm';
import { TREE_TRAVERSAL_ALGORITHM } from './tree-traversal.metadata';
import { TREE_TRAVERSAL_EXAMPLES } from './tree-traversal.examples';
import { TREE_TRAVERSAL_CODE } from './tree-traversal.code';

export const TREE_TRAVERSAL_LESSON: TreeLessonConfig = {
  algorithm: TREE_TRAVERSAL_ALGORITHM,
  examples: TREE_TRAVERSAL_EXAMPLES,
  implementations: TREE_TRAVERSAL_CODE,
  makeSteps: treeTraversalSteps,
  articleTitle: 'One tree. Three ways to visit it.',
  article: [
    'A tree connects a root to children without cycles. Each child begins a subtree; nodes without children are leaves. A binary tree gives each node a left and a right child slot.',
    'Preorder visits the root before its children: root → left → right. Inorder visits between the children: left → root → right. Postorder visits after both children: left → right → root.',
    'All three use the same recursive structure. A missing child returns immediately, and a finished call returns to its parent. The call stack uses O(h) space for height h: O(log n) for a balanced tree and O(n) for a chain. The output uses O(n) space.',
  ],
  takeaways: [
    'Preorder helps copy a tree.',
    'Inorder sorts values in a binary search tree.',
    'Postorder processes children before parents.',
    'A binary tree need not be a search tree.',
  ],
  defaultOrder: 'inorder',
  practice: [
    {
      number: 144,
      title: 'Binary Tree Preorder Traversal',
      url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/',
      difficulty: 'Easy',
      relevance:
        'Visit the node before its children: root, left, right. Try both recursion and an explicit stack.',
    },
    {
      number: 94,
      title: 'Binary Tree Inorder Traversal',
      url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      difficulty: 'Easy',
      relevance: 'Visit the node between its subtrees: left, root, right.',
    },
    {
      number: 145,
      title: 'Binary Tree Postorder Traversal',
      url: 'https://leetcode.com/problems/binary-tree-postorder-traversal/',
      difficulty: 'Easy',
      relevance: 'Visit the node after both subtrees: left, right, root.',
    },
  ],
};
