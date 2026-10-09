import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
type TreeNode = {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

// Both target nodes must exist in the tree.
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null { // @step:start
  if (root === null || root === p || root === q) { // @step:enter
    return root; // @step:base
  }

  const left = lowestCommonAncestor(root.left, p, q); // @step:left
  const right = lowestCommonAncestor(root.right, p, q); // @step:right

  if (left !== null && right !== null) { // @step:combine
    return root; // @step:ancestor
  }

  return left ?? right; // @step:return
}
`;

const PYTHON_SOURCE = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Both target nodes must exist in the tree.
def lowestCommonAncestor(root, p, q):  # @step:start
    if root is None or root is p or root is q:  # @step:enter
        return root  # @step:base

    left = lowestCommonAncestor(root.left, p, q)  # @step:left
    right = lowestCommonAncestor(root.right, p, q)  # @step:right

    if left is not None and right is not None:  # @step:combine
        return root  # @step:ancestor

    return left if left is not None else right  # @step:return
`;

const CSHARP_SOURCE = `
using System;

public class TreeNode {
    public int val;
    public TreeNode? left;
    public TreeNode? right;
    public TreeNode(int val = 0, TreeNode? left = null, TreeNode? right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    // Both target nodes must exist in the tree.
    public TreeNode? LowestCommonAncestor(TreeNode? root, TreeNode? p, TreeNode? q) { // @step:start
        if (root == null || root == p || root == q) { // @step:enter
            return root; // @step:base
        }

        TreeNode? left = LowestCommonAncestor(root.left, p, q); // @step:left
        TreeNode? right = LowestCommonAncestor(root.right, p, q); // @step:right

        if (left != null && right != null) { // @step:combine
            return root; // @step:ancestor
        }

        return left ?? right; // @step:return
    }
}
`;

const JAVA_SOURCE = `
public class Solution {
    static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    // Both target nodes must exist in the tree.
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) { // @step:start
        if (root == null || root == p || root == q) { // @step:enter
            return root; // @step:base
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q); // @step:left
        TreeNode right = lowestCommonAncestor(root.right, p, q); // @step:right

        if (left != null && right != null) { // @step:combine
            return root; // @step:ancestor
        }

        return left != null ? left : right; // @step:return
    }
}
`;

export const LOWEST_COMMON_ANCESTOR_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
