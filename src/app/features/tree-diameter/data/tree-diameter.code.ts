import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';
const TYPESCRIPT_SOURCE = `
type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function diameter(root: TreeNode | null): number {
  let best = 0;
  function height(node: TreeNode | null): number { // @step:enter
    if (!node) {
      return 0; // @step:empty
    }
    const left = height(node.left); // @step:left
    const right = height(node.right); // @step:right
    best = Math.max(best, left + right); // @step:combine
    return 1 + Math.max(left, right); // @step:return
  }
  height(root); // @step:start
  return best; // @step:done
}
`;

const PYTHON_SOURCE = `
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def diameter(root):
    best = 0
    def height(node):  # @step:enter
        nonlocal best
        if node is None:
            return 0  # @step:empty
        left = height(node.left)  # @step:left
        right = height(node.right)  # @step:right
        best = max(best, left + right)  # @step:combine
        return 1 + max(left, right)  # @step:return
    height(root)  # @step:start
    return best  # @step:done
`;

const CSHARP_SOURCE = `
using System;
class Solution {
  class TreeNode {
    public int value;
    public TreeNode? left;
    public TreeNode? right;
    public TreeNode(int value, TreeNode? left, TreeNode? right) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
  static int diameter(TreeNode? root) {
    int[] best = new int[] { 0 };
    height(root, best); // @step:start
    return best[0]; // @step:done
  }
  static int height(TreeNode? node, int[] best) { // @step:enter
    if (node == null) {
      return 0; // @step:empty
    }
    int left = height(node.left, best); // @step:left
    int right = height(node.right, best); // @step:right
    best[0] = Math.Max(best[0], left + right); // @step:combine
    return 1 + Math.Max(left, right); // @step:return
  }
}
`;

const JAVA_SOURCE = `
public class Solution {
  static class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;
    TreeNode(int value, TreeNode left, TreeNode right) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
  static int diameter(TreeNode root) {
    int[] best = new int[] { 0 };
    height(root, best); // @step:start
    return best[0]; // @step:done
  }
  static int height(TreeNode node, int[] best) { // @step:enter
    if (node == null) {
      return 0; // @step:empty
    }
    int left = height(node.left, best); // @step:left
    int right = height(node.right, best); // @step:right
    best[0] = Math.max(best[0], left + right); // @step:combine
    return 1 + Math.max(left, right); // @step:return
  }
}
`;
export const TREE_DIAMETER_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
