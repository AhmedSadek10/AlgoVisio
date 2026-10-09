import type { TreeLessonConfig } from '../../../core/tree-lesson';
import { lowestCommonAncestorSteps } from '../algorithm/lowest-common-ancestor.algorithm';
import { LOWEST_COMMON_ANCESTOR_ALGORITHM } from './lowest-common-ancestor.metadata';
import { LOWEST_COMMON_ANCESTOR_EXAMPLES } from './lowest-common-ancestor.examples';
import { LOWEST_COMMON_ANCESTOR_CODE } from './lowest-common-ancestor.code';
export const LOWEST_COMMON_ANCESTOR_LESSON: TreeLessonConfig = {
  algorithm: LOWEST_COMMON_ANCESTOR_ALGORITHM,
  examples: LOWEST_COMMON_ANCESTOR_EXAMPLES,
  implementations: {
    preorder: LOWEST_COMMON_ANCESTOR_CODE,
    inorder: LOWEST_COMMON_ANCESTOR_CODE,
    postorder: LOWEST_COMMON_ANCESTOR_CODE,
  },
  makeSteps: lowestCommonAncestorSteps,
  operation: 'ancestor',
  functionName: 'lowestCommonAncestor',
  defaultOrder: 'postorder',
  articleTitle: 'Find where two target paths meet.',
  article: [
    'The lowest common ancestor is the deepest node whose subtree contains both targets. A node is its own ancestor, so a target that contains the other target is the answer.',
    'The function receives root and the two target node objects, p and q. If root is null, p, or q, return root. Otherwise recursively search the left and right subtrees.',
    'If left and right are both non-null, return root: the targets meet here. Otherwise return left ?? right, passing the non-null result upward. A deeper ancestor found by a child call is preserved.',
    'This algorithm works on any binary tree and uses node identity rather than value. The selectors show node IDs so duplicate values are unambiguous. Both targets must exist. Worst-case time is O(n), with O(h) recursion space.',
  ],
  takeaways: [
    'No BST ordering is required.',
    'Select nodes by identity, not just value.',
    'One target can be the ancestor of the other.',
    'Selecting the same node twice returns that node.',
  ],
  practice: [
    {
      number: 236,
      title: 'Lowest Common Ancestor of a Binary Tree',
      url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      difficulty: 'Medium',
      relevance: 'Combine left and right recursion results to find the deepest shared ancestor.',
    },
  ],
};
