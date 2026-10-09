import{a as f}from"./chunk-Y3VTJHLR.js";import"./chunk-V3PMXN6M.js";import{l as i}from"./chunk-BRHD6JZM.js";import{b as g}from"./chunk-34NHZ6JB.js";import{Fa as c,Ua as p,Xa as h}from"./chunk-KXQDCAUO.js";function d(a){let n=(e,r,s)=>{if(e){if(e.value<=r||e.value>=s)throw new Error("BST search requires unique values: every left subtree must be smaller and every right subtree larger than its ancestors.");n(e.left,r,e.value),n(e.right,e.value,s)}};n(a[0]??null,-1/0,1/0)}function m(a,n,e){d(a);let r=[],s=[],t=a[0]??null,l=(o,b,y,N=[],E)=>{r.push({title:o,explanation:b,key:y,active:t?.id??null,stack:t?[t.id]:[],visited:[...s],highlighted:N,result:E})};for(l("Start at the root",`Search for ${e.target}. The BST ordering lets us discard one subtree at each comparison.`,"start");t;){if(s.push(t.id),l(`Compare with ${t.value}`,`Compare target ${e.target} with the current node ${t.value}.`,"compare"),e.target===t.value)return l("Target found",`${t.value} equals the target. Return its value.`,"found",[t.id],`Found ${t.value}`),r;let o=e.target<t.value;l(`Go ${o?"left":"right"}`,`${e.target} is ${o?"smaller":"larger"} than ${t.value}. Continue in its ${o?"left":"right"} subtree.`,o?"left":"right"),t=o?t.left:t.right}return l("Target absent","Reached a missing child. No node in this BST has the target value.","done",[],`${e.target} was not found`),r}var v=[{label:"Find 7",input:"8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13",query:{target:7}},{label:"Missing target",input:"8, 3, 10, 1, 6, null, 14",query:{target:5}},{label:"At the root",input:"8, 3, 10",query:{target:8}},{label:"Chain",input:"1, null, 2, null, 3, null, 4",query:{target:4}},{label:"Empty",input:"null",query:{target:7}}];var C=`
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
`,_=`
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
`,A=`
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
`,B=`
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
`,u=[i("typescript",C),i("python",_),i("csharp",A),i("java",B)];var T={algorithm:g,examples:v,implementations:{preorder:u,inorder:u,postorder:u},makeSteps:m,operation:"search",functionName:"search",validate:d,defaultOrder:"postorder",articleTitle:"Each comparison chooses one branch.",article:["A binary search tree keeps every value in a left subtree smaller than its ancestor and every value in a right subtree larger. This lesson uses unique values and checks that rule across the entire tree.","Compare the target with the current node. Equality ends the search. A smaller target goes left; a larger target goes right. Reaching an empty child means the target is absent.","Search visits at most one root-to-leaf path: O(h) time and O(1) auxiliary space with an iterative cursor. A balanced tree gives O(log n) time, but a chain can take O(n)."],takeaways:["A binary tree is not automatically a BST.","Discard one subtree after each comparison.","Balanced trees give shorter search paths.","A missing child means the target is absent."],practice:[{number:700,title:"Search in a Binary Search Tree",url:"https://leetcode.com/problems/search-in-a-binary-search-tree/",difficulty:"Easy",relevance:"Use the BST ordering to search one branch at a time."}]};var S=class a{lesson=T;static \u0275fac=function(e){return new(e||a)};static \u0275cmp=c({type:a,selectors:[["app-bst-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(e,r){e&1&&h(0,"app-tree-lesson",0),e&2&&p("lesson",r.lesson)},dependencies:[f],encapsulation:2,changeDetection:0})};export{S as BstSearchPage};
