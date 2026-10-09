import type { TreeLessonConfig } from '../../../core/tree-lesson';
import { bstSearchSteps, validateBst } from '../algorithm/bst-search.algorithm';
import { BST_SEARCH_ALGORITHM } from './bst-search.metadata';
import { BST_SEARCH_EXAMPLES } from './bst-search.examples';
import { BST_SEARCH_CODE } from './bst-search.code';
export const BST_SEARCH_LESSON: TreeLessonConfig = {
  algorithm: BST_SEARCH_ALGORITHM,
  examples: BST_SEARCH_EXAMPLES,
  implementations: {
    preorder: BST_SEARCH_CODE,
    inorder: BST_SEARCH_CODE,
    postorder: BST_SEARCH_CODE,
  },
  makeSteps: bstSearchSteps,
  operation: 'search',
  functionName: 'search',
  validate: validateBst,
  defaultOrder: 'postorder',
  articleTitle: 'Each comparison chooses one branch.',
  article: [
    'A binary search tree keeps every value in a left subtree smaller than its ancestor and every value in a right subtree larger. This lesson uses unique values and checks that rule across the entire tree.',
    'Compare the target with the current node. Equality ends the search. A smaller target goes left; a larger target goes right. Reaching an empty child means the target is absent.',
    'Search visits at most one root-to-leaf path: O(h) time and O(1) auxiliary space with an iterative cursor. A balanced tree gives O(log n) time, but a chain can take O(n).',
  ],
  takeaways: [
    'A binary tree is not automatically a BST.',
    'Discard one subtree after each comparison.',
    'Balanced trees give shorter search paths.',
    'A missing child means the target is absent.',
  ],
  practice: [
    {
      number: 700,
      title: 'Search in a Binary Search Tree',
      url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/',
      difficulty: 'Easy',
      relevance: 'Use the BST ordering to search one branch at a time.',
    },
  ],
};
