import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import type { TraversalOrder } from '../../../core/tree-lesson';
import { markedSource } from '../../../core/visualization/algorithm-source';

const PREORDER_TYPESCRIPT_SOURCE = `
type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function traverse(root: TreeNode | null): number[] {
  const order: number[] = [];

  function visit(node: TreeNode | null): void { // @step:enter
    if (node === null) {
      return; // @step:empty
    }
    order.push(node.value); // @step:visit
    visit(node.left); // @step:left
    visit(node.right); // @step:right
    return; // @step:return
  }

  visit(root); // @step:start
  return order; // @step:done
}
`;

const PREORDER_PYTHON_SOURCE = `
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def traverse(root):
    order = []

    def visit(node):  # @step:enter
        if node is None:
            return  # @step:empty
        order.append(node.value)  # @step:visit
        visit(node.left)  # @step:left
        visit(node.right)  # @step:right
        return  # @step:return

    visit(root)  # @step:start
    return order  # @step:done
`;

const PREORDER_CSHARP_SOURCE = `
using System;
using System.Collections.Generic;
class Solution {
    class TreeNode {
        public int value;
        public TreeNode? left;
        public TreeNode? right;
        public TreeNode(int value, TreeNode? left = null, TreeNode? right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    static List<int> Traverse(TreeNode? root) {
        var order = new List<int>();

        void Visit(TreeNode? node) { // @step:enter
            if (node == null) {
                return; // @step:empty
            }
            order.Add(node.value); // @step:visit
            Visit(node.left); // @step:left
            Visit(node.right); // @step:right
            return; // @step:return
        }

        Visit(root); // @step:start
        return order; // @step:done
    }
}
`;

const PREORDER_JAVA_SOURCE = `
import java.util.*;
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

    static List<Integer> traverse(TreeNode root) {
        List<Integer> order = new ArrayList<>();
        visit(root, order); // @step:start
        return order; // @step:done
    }

    private static void visit(TreeNode node, List<Integer> order) { // @step:enter
        if (node == null) {
            return; // @step:empty
        }
        order.add(node.value); // @step:visit
        visit(node.left, order); // @step:left
        visit(node.right, order); // @step:right
        return; // @step:return
    }
}
`;

const PREORDER_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', PREORDER_TYPESCRIPT_SOURCE),
  markedSource('python', PREORDER_PYTHON_SOURCE),
  markedSource('csharp', PREORDER_CSHARP_SOURCE),
  markedSource('java', PREORDER_JAVA_SOURCE),
];

const INORDER_TYPESCRIPT_SOURCE = `
type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function traverse(root: TreeNode | null): number[] {
  const order: number[] = [];

  function visit(node: TreeNode | null): void { // @step:enter
    if (node === null) {
      return; // @step:empty
    }
    visit(node.left); // @step:left
    order.push(node.value); // @step:visit
    visit(node.right); // @step:right
    return; // @step:return
  }

  visit(root); // @step:start
  return order; // @step:done
}
`;

const INORDER_PYTHON_SOURCE = `
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def traverse(root):
    order = []

    def visit(node):  # @step:enter
        if node is None:
            return  # @step:empty
        visit(node.left)  # @step:left
        order.append(node.value)  # @step:visit
        visit(node.right)  # @step:right
        return  # @step:return

    visit(root)  # @step:start
    return order  # @step:done
`;

const INORDER_CSHARP_SOURCE = `
using System;
using System.Collections.Generic;
class Solution {
    class TreeNode {
        public int value;
        public TreeNode? left;
        public TreeNode? right;
        public TreeNode(int value, TreeNode? left = null, TreeNode? right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    static List<int> Traverse(TreeNode? root) {
        var order = new List<int>();

        void Visit(TreeNode? node) { // @step:enter
            if (node == null) {
                return; // @step:empty
            }
            Visit(node.left); // @step:left
            order.Add(node.value); // @step:visit
            Visit(node.right); // @step:right
            return; // @step:return
        }

        Visit(root); // @step:start
        return order; // @step:done
    }
}
`;

const INORDER_JAVA_SOURCE = `
import java.util.*;
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

    static List<Integer> traverse(TreeNode root) {
        List<Integer> order = new ArrayList<>();
        visit(root, order); // @step:start
        return order; // @step:done
    }

    private static void visit(TreeNode node, List<Integer> order) { // @step:enter
        if (node == null) {
            return; // @step:empty
        }
        visit(node.left, order); // @step:left
        order.add(node.value); // @step:visit
        visit(node.right, order); // @step:right
        return; // @step:return
    }
}
`;

const INORDER_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', INORDER_TYPESCRIPT_SOURCE),
  markedSource('python', INORDER_PYTHON_SOURCE),
  markedSource('csharp', INORDER_CSHARP_SOURCE),
  markedSource('java', INORDER_JAVA_SOURCE),
];

const POSTORDER_TYPESCRIPT_SOURCE = `
type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

function traverse(root: TreeNode | null): number[] {
  const order: number[] = [];

  function visit(node: TreeNode | null): void { // @step:enter
    if (node === null) {
      return; // @step:empty
    }
    visit(node.left); // @step:left
    visit(node.right); // @step:right
    order.push(node.value); // @step:visit
    return; // @step:return
  }

  visit(root); // @step:start
  return order; // @step:done
}
`;

const POSTORDER_PYTHON_SOURCE = `
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def traverse(root):
    order = []

    def visit(node):  # @step:enter
        if node is None:
            return  # @step:empty
        visit(node.left)  # @step:left
        visit(node.right)  # @step:right
        order.append(node.value)  # @step:visit
        return  # @step:return

    visit(root)  # @step:start
    return order  # @step:done
`;

const POSTORDER_CSHARP_SOURCE = `
using System;
using System.Collections.Generic;
class Solution {
    class TreeNode {
        public int value;
        public TreeNode? left;
        public TreeNode? right;
        public TreeNode(int value, TreeNode? left = null, TreeNode? right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    static List<int> Traverse(TreeNode? root) {
        var order = new List<int>();

        void Visit(TreeNode? node) { // @step:enter
            if (node == null) {
                return; // @step:empty
            }
            Visit(node.left); // @step:left
            Visit(node.right); // @step:right
            order.Add(node.value); // @step:visit
            return; // @step:return
        }

        Visit(root); // @step:start
        return order; // @step:done
    }
}
`;

const POSTORDER_JAVA_SOURCE = `
import java.util.*;
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

    static List<Integer> traverse(TreeNode root) {
        List<Integer> order = new ArrayList<>();
        visit(root, order); // @step:start
        return order; // @step:done
    }

    private static void visit(TreeNode node, List<Integer> order) { // @step:enter
        if (node == null) {
            return; // @step:empty
        }
        visit(node.left, order); // @step:left
        visit(node.right, order); // @step:right
        order.add(node.value); // @step:visit
        return; // @step:return
    }
}
`;

const POSTORDER_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', POSTORDER_TYPESCRIPT_SOURCE),
  markedSource('python', POSTORDER_PYTHON_SOURCE),
  markedSource('csharp', POSTORDER_CSHARP_SOURCE),
  markedSource('java', POSTORDER_JAVA_SOURCE),
];

export const TREE_TRAVERSAL_CODE: Readonly<
  Record<TraversalOrder, readonly AlgorithmImplementation[]>
> = {
  preorder: PREORDER_CODE,
  inorder: INORDER_CODE,
  postorder: POSTORDER_CODE,
};
