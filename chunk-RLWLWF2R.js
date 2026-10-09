import{a as E}from"./chunk-Y3VTJHLR.js";import"./chunk-V3PMXN6M.js";import{l}from"./chunk-BRHD6JZM.js";import{a as T}from"./chunk-34NHZ6JB.js";import{Fa as c,Ua as f,Xa as b,a as d}from"./chunk-KXQDCAUO.js";function y(s){let a=[],t=[],g=[],m={},o=[],n=(e,r,i,h,M=o)=>{a.push({title:e,explanation:r,key:i,active:h,stack:[...t],visited:[...g],details:d({},m),highlighted:[...M],result:`Diameter: ${Math.max(0,o.length-1)} edges`})};n("Compute heights from the leaves","An empty subtree has height 0. A leaf has height 1. At each node, left height + right height gives the path length in edges through that node.","start",null);let u=e=>{if(!e)return n("Empty subtree","Return height 0 to the parent.","empty",t.at(-1)??null),[];t.push(e.id),n(`Enter ${e.value}`,"Keep this call on the stack while computing both child heights.","enter",e.id),n("Compute left height",`Process the left subtree of ${e.value}.`,"left",e.id);let r=u(e.left);n("Compute right height",`Process the right subtree of ${e.value}.`,"right",e.id);let i=u(e.right),h=[...r].reverse().concat(e.id,i);return h.length>o.length&&(o=h),g.push(e.id),m[e.id]=`height ${1+Math.max(r.length,i.length)}`,n(`Combine at ${e.value}`,`Left height ${r.length} + right height ${i.length} = ${r.length+i.length} edges through this node. Best so far: ${Math.max(0,o.length-1)}.`,"combine",e.id,h),t.pop(),n(`Return height ${1+Math.max(r.length,i.length)}`,"Return one plus the larger child height. The global diameter may be entirely inside a subtree.","return",e.id),[e.id,...r.length>=i.length?r:i]};return u(s[0]??null),n("Diameter complete",s.length?"The highlighted nodes form a longest path. The path need not pass through the root.":"The empty tree has diameter 0.","done",null),a}var N=[{label:"Balanced",input:"1, 2, 3, 4, 5"},{label:"Below the root",input:"1, 2, null, 3, 4, 5, null, null, 6, 7, null, null, 8"},{label:"Chain",input:"1, null, 2, null, 3, null, 4"},{label:"Single node",input:"9"},{label:"Empty",input:"null"}];var S=`
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
`,C=`
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
`,D=`
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
`,_=`
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
`,p=[l("typescript",S),l("python",C),l("csharp",D),l("java",_)];var v={algorithm:T,examples:N,implementations:{preorder:p,inorder:p,postorder:p},makeSteps:y,operation:"diameter",functionName:"diameter",defaultOrder:"postorder",articleTitle:"The longest path can start anywhere.",article:["The diameter is the number of edges on the longest path between two nodes. It may pass through the root, or lie completely inside one subtree.","Compute heights in postorder. An empty subtree has height 0, and a leaf has height 1. At each node, the left and right heights sum to the number of edges on the longest path through that node.","Keep the largest sum seen anywhere. Return one plus the larger child height to the parent. Each node is processed once, using O(n) time and O(h) recursion space."],takeaways:["Count edges, not nodes.","Process children before their parent.","The longest path need not cross the root.","An empty or single-node tree has diameter 0."],practice:[{number:543,title:"Diameter of Binary Tree",url:"https://leetcode.com/problems/diameter-of-binary-tree/",difficulty:"Easy",relevance:"Combine child heights while tracking the longest path in edges."}]};var R=class s{lesson=v;static \u0275fac=function(t){return new(t||s)};static \u0275cmp=c({type:s,selectors:[["app-tree-diameter-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(t,g){t&1&&b(0,"app-tree-lesson",0),t&2&&f("lesson",g.lesson)},dependencies:[E],encapsulation:2,changeDetection:0})};export{R as TreeDiameterPage};
