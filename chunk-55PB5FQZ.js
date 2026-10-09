import{a as h}from"./chunk-Y3VTJHLR.js";import"./chunk-V3PMXN6M.js";import{l as t}from"./chunk-BRHD6JZM.js";import{o as v}from"./chunk-34NHZ6JB.js";import{Fa as p,Ua as u,Xa as c}from"./chunk-KXQDCAUO.js";function f(l,i){let s=[],o=[],a=[],r=(e,n,R,E)=>s.push({title:e,explanation:n,key:R,active:E,stack:[...o],visited:[...a]});r("Begin at the root",`${i} visits each node once. The stack records unfinished recursive calls.`,"start",null);let d=e=>{if(!e){r("Missing child","This subtree is empty. Return immediately to the parent call.","empty",o.at(-1)??null);return}o.push(e.id),r(`Enter ${e.value}`,"Push this node onto the call stack. Its children are separate subtrees.","enter",e.id);let n=()=>{a.push(e.id),r(`Visit ${e.value}`,`Append ${e.value} to the output in ${i} order. Entering a call and visiting a value are different events.`,"visit",e.id)};i==="preorder"&&n(),r("Explore the left subtree",`Keep ${e.value} on the stack while recursively processing its left child.`,"left",e.id),d(e.left),i==="inorder"&&n(),r("Explore the right subtree",`The left subtree is complete. Recursively process the right child of ${e.value}.`,"right",e.id),d(e.right),i==="postorder"&&n(),o.pop(),r(`Return from ${e.value}`,"Both child calls are complete. Pop this frame and resume its parent.","return",e.id)};return d(l[0]??null),r("Traversal complete",`Visited ${a.length} nodes. Time is O(n); recursion uses O(h) space. Storing the output takes another O(n).`,"done",null),s}var T=[{label:"Balanced BST",input:"8, 4, 12, 2, 6, 10, 14"},{label:"Missing children",input:"1, null, 2, 3"},{label:"Skewed tree",input:"4, 3, null, 2, null, 1"},{label:"Empty tree",input:"null"}];var y=`
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
`,b=`
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
`,S=`
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
`,O=`
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
`,_=[t("typescript",y),t("python",b),t("csharp",S),t("java",O)],A=`
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
`,P=`
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
`,L=`
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
`,C=`
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
`,I=[t("typescript",A),t("python",P),t("csharp",L),t("java",C)],V=`
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
`,D=`
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
`,w=`
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
`,k=`
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
`,U=[t("typescript",V),t("python",D),t("csharp",w),t("java",k)],g={preorder:_,inorder:I,postorder:U};var m={algorithm:v,examples:T,implementations:g,makeSteps:f,articleTitle:"One tree. Three ways to visit it.",article:["A tree connects a root to children without cycles. Each child begins a subtree; nodes without children are leaves. A binary tree gives each node a left and a right child slot.","Preorder visits the root before its children: root \u2192 left \u2192 right. Inorder visits between the children: left \u2192 root \u2192 right. Postorder visits after both children: left \u2192 right \u2192 root.","All three use the same recursive structure. A missing child returns immediately, and a finished call returns to its parent. The call stack uses O(h) space for height h: O(log n) for a balanced tree and O(n) for a chain. The output uses O(n) space."],takeaways:["Preorder helps copy a tree.","Inorder sorts values in a binary search tree.","Postorder processes children before parents.","A binary tree need not be a search tree."],defaultOrder:"inorder",practice:[{number:144,title:"Binary Tree Preorder Traversal",url:"https://leetcode.com/problems/binary-tree-preorder-traversal/",difficulty:"Easy",relevance:"Visit the node before its children: root, left, right. Try both recursion and an explicit stack."},{number:94,title:"Binary Tree Inorder Traversal",url:"https://leetcode.com/problems/binary-tree-inorder-traversal/",difficulty:"Easy",relevance:"Visit the node between its subtrees: left, root, right."},{number:145,title:"Binary Tree Postorder Traversal",url:"https://leetcode.com/problems/binary-tree-postorder-traversal/",difficulty:"Easy",relevance:"Visit the node after both subtrees: left, right, root."}]};var N=class l{lesson=m;static \u0275fac=function(s){return new(s||l)};static \u0275cmp=p({type:l,selectors:[["app-tree-traversal-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(s,o){s&1&&c(0,"app-tree-lesson",0),s&2&&u("lesson",o.lesson)},dependencies:[h],encapsulation:2,changeDetection:0})};export{N as TreeTraversalPage};
