import{a as y}from"./chunk-Y3VTJHLR.js";import"./chunk-V3PMXN6M.js";import{l as c}from"./chunk-BRHD6JZM.js";import{c as S}from"./chunk-34NHZ6JB.js";import{Fa as w,Ua as O,Xa as A,a as b}from"./chunk-KXQDCAUO.js";function v(r,N,n){let u=[],s=[],C=[],p={},d=r.find(e=>e.id===n.first)??null,f=r.find(e=>e.id===n.second)??null,g="base",o=e=>e?`${e.value} (node ${e.id})`:"null",t=(e,l,a,i,L=[],R)=>{u.push({title:e,explanation:l,key:a,active:i,stack:[...s],visited:[...C],details:b({},p),highlighted:[...L],result:R})};if(t("Find the shared ancestor",`Call LowestCommonAncestor(root, p, q) with p = ${o(d)} and q = ${o(f)}. Compare node references, not values. Both targets must exist.`,"start",null),!d||!f)return t("No ancestor","Both selected nodes must exist in the tree. An empty tree returns null.","base",null,[],"No common ancestor"),u;let T=e=>{if(e&&(s.push(e.id),C.push(e.id)),t(e?`Check ${o(e)}`:"Check an empty subtree","Evaluate root == null || root == p || root == q. A matching condition ends this call immediately.","enter",e?.id??s.at(-1)??null),e===null||e===d||e===f)return e&&(p[e.id]=`returns ${e.value}`,s.pop()),t(e?"Return the selected node":"Return null",e?`root is ${e===d?"p":"q"}. Return this node. If the other target is below it, this node is already their LCA.`:"root is null. This empty subtree contributes no target.","base",e?.id??s.at(-1)??null,e?[e.id]:[]),e;t("Search the left subtree",`Keep ${e.value} on the call stack. Assign the recursive result to left.`,"left",e.id);let l=T(e.left);t("Search the right subtree",`left = ${o(l)}. Now assign the right subtree result to right.`,"right",e.id);let a=T(e.right);if(t("Check both returned results",`left = ${o(l)}; right = ${o(a)}. Check left != null && right != null.`,"combine",e.id),l!==null&&a!==null)return p[e.id]=`returns ${e.value}`,e===r[0]&&(g="ancestor"),s.pop(),t(`Return ${e.value}: both sides found a result`,"The target paths meet here. Return root as their lowest common ancestor.","ancestor",e.id,[e.id]),e;let i=l??a;return p[e.id]=`returns ${i?.value??"null"}`,e===r[0]&&(g="return"),s.pop(),t(`Return ${o(i)}`,l?"left is non-null, so left ?? right returns left. Pass this target or deeper ancestor upward unchanged.":a?"left is null, so left ?? right returns right. Pass this target or deeper ancestor upward unchanged.":"Both results are null, so left ?? right returns null.","return",e.id,i?[i.id]:[]),i},h=T(r[0]??null);return t("Lowest common ancestor found",`The initial call returned ${o(h)}. This is the deepest ancestor shared by p and q.`,g,null,[h.id],`LCA: ${h.value} (node ${h.id})`),u}var E=[{label:"3 and 8",input:"5, 3, 8, 1, 4, 7, 9, null, 2",query:{first:"1",second:"2"}},{label:"Opposite subtrees",input:"3, 5, 1, 6, 2, 0, 8, null, null, 7, 4",query:{first:"1",second:"2"}},{label:"Ancestor target",input:"3, 5, 1, 6, 2, 0, 8, null, null, 7, 4",query:{first:"1",second:"8"}},{label:"Same node",input:"3, 5, 1",query:{first:"1",second:"1"}},{label:"Duplicate values",input:"1, 2, 2, 3, null, null, 3",query:{first:"3",second:"4"}},{label:"Empty",input:"null"}];var M=`
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
`,$=`
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
`,x=`
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
`,P=`
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
`,m=[c("typescript",M),c("python",$),c("csharp",x),c("java",P)];var _={algorithm:S,examples:E,implementations:{preorder:m,inorder:m,postorder:m},makeSteps:v,operation:"ancestor",functionName:"lowestCommonAncestor",defaultOrder:"postorder",articleTitle:"Find where two target paths meet.",article:["The lowest common ancestor is the deepest node whose subtree contains both targets. A node is its own ancestor, so a target that contains the other target is the answer.","The function receives root and the two target node objects, p and q. If root is null, p, or q, return root. Otherwise recursively search the left and right subtrees.","If left and right are both non-null, return root: the targets meet here. Otherwise return left ?? right, passing the non-null result upward. A deeper ancestor found by a child call is preserved.","This algorithm works on any binary tree and uses node identity rather than value. The selectors show node IDs so duplicate values are unambiguous. Both targets must exist. Worst-case time is O(n), with O(h) recursion space."],takeaways:["No BST ordering is required.","Select nodes by identity, not just value.","One target can be the ancestor of the other.","Selecting the same node twice returns that node."],practice:[{number:236,title:"Lowest Common Ancestor of a Binary Tree",url:"https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",difficulty:"Medium",relevance:"Combine left and right recursion results to find the deepest shared ancestor."}]};var q=class r{lesson=_;static \u0275fac=function(n){return new(n||r)};static \u0275cmp=w({type:r,selectors:[["app-lowest-common-ancestor-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(n,u){n&1&&A(0,"app-tree-lesson",0),n&2&&O("lesson",u.lesson)},dependencies:[y],encapsulation:2,changeDetection:0})};export{q as LowestCommonAncestorPage};
