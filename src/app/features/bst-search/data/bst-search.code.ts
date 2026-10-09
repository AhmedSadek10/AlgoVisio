import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';
const TYPESCRIPT_SOURCE = `
type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function search(root: TreeNode | null, target: number): number | null {
  let node = root; // @step:start
  while (node) { // @step:compare
    if (target === node.value) {
      return node.value; // @step:found
    }
    if (target < node.value) {
      node = node.left; // @step:left
    } else {
      node = node.right; // @step:right
    }
  }
  return null; // @step:done
}
`;

const PYTHON_SOURCE = `
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def search(root, target):
    node = root  # @step:start
    while node is not None:  # @step:compare
        if target == node.value:
            return node.value  # @step:found
        if target < node.value:
            node = node.left  # @step:left
        else:
            node = node.right  # @step:right
    return None  # @step:done
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
  static int? search(TreeNode? root, int target) {
    TreeNode? node = root; // @step:start
    while (node != null) { // @step:compare
      if (target == node.value) {
        return node.value; // @step:found
      }
      if (target < node.value) {
        node = node.left; // @step:left
      } else {
        node = node.right; // @step:right
      }
    }
    return null; // @step:done
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
  static Integer search(TreeNode root, int target) {
    TreeNode node = root; // @step:start
    while (node != null) { // @step:compare
      if (target == node.value) {
        return node.value; // @step:found
      }
      if (target < node.value) {
        node = node.left; // @step:left
      } else {
        node = node.right; // @step:right
      }
    }
    return null; // @step:done
  }
}
`;
export const BST_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
