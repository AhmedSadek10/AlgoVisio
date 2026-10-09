import{a as d}from"./chunk-C7HHSF6C.js";import"./chunk-VE44PUAE.js";import"./chunk-IJWT65BB.js";import{l as p}from"./chunk-BRHD6JZM.js";import{h as m}from"./chunk-34NHZ6JB.js";import{Fa as h,Ua as c,Xa as u}from"./chunk-KXQDCAUO.js";function g(s,n){let t=s.length,l=Math.max(1,Math.floor(Math.sqrt(t))),r=[{low:0,high:t-1,mid:null,phase:"ready",iteration:0,title:"Ready to jump",description:`The list is sorted. Jump ahead ${l} ${l===1?"place":"places"} at a time to find the right block.`,activeLine:1}],i=0,o=0;for(;i<t;){let e=Math.min(i+l,t)-1;if(o++,r.push({low:i,high:t-1,mid:e,phase:"compare",iteration:o,title:`Jump to index ${e}: ${s[e]}`,description:`This block runs from index ${i} to ${e}. Compare its last value, ${s[e]}, with ${n}.`,activeLine:2,pointerLabel:"JUMP"}),s[e]>=n||e===t-1){r.push({low:i,high:e,mid:null,phase:"discard",iteration:o,title:`Scan the block ${i}\u2013${e}`,description:`${n} can only be in this block. Check its values one by one.`,activeLine:3});for(let a=i;a<=e;a++){if(o++,r.push({low:a,high:e,mid:a,phase:"compare",iteration:o,title:`Check index ${a}: ${s[a]}`,description:`Scan within the chosen block. Compare ${s[a]} with ${n}.`,activeLine:4,pointerLabel:"CHECK"}),s[a]===n)return r.push({low:a,high:e,mid:a,phase:"found",iteration:o,title:`Found ${n} at index ${a}`,description:"The scan found the target inside the selected block.",activeLine:5}),r;if(s[a]>n)break}break}i=e+1,r.push({low:i,high:t-1,mid:e,phase:"discard",iteration:o,title:"Skip this block",description:`${s[e]} is less than ${n}, so every value up to index ${e} is too small.`,activeLine:2})}return r.push({low:t,high:t-1,mid:null,phase:"missing",iteration:o,title:`${n} is not in the array`,description:"The block scan finished without finding the target.",activeLine:6}),r}var f=[{label:"Easy to find",values:[3,8,12,17,23,29,34,41,48,56,63],target:34},{label:"At the edge",values:[2,6,11,15,19,24,31,38,45,52,60],target:60},{label:"Not found",values:[4,9,14,20,26,32,39,46,54,61,70],target:35}];var x=`
function search(values: number[], target: number): number {
  const jump = Math.max(1, Math.floor(Math.sqrt(values.length))); // @step:1
  let start = 0; // @step:2
  while (start < values.length && values[Math.min(start + jump, values.length) - 1] < target) {
    start += jump; // @step:2
  }
  const end = Math.min(start + jump, values.length); // @step:3
  for (let index = start; index < end; index++) { // @step:4
    if (values[index] === target) {
      return index; // @step:5
    }
  } // @step:5
  return -1; // @step:6
}
`,M=`
def search(values, target):
    jump = max(1, int(len(values) ** 0.5))  # @step:1
    start = 0  # @step:1
    length = len(values)  # @step:1
    while start < length and values[min(start + jump, length) - 1] < target:  # @step:2
        start += jump
    end = min(start + jump, length)  # @step:3
    for index in range(start, end):  # @step:4
        if values[index] == target:  # @step:5
            return index
    return -1  # @step:6
`,C=`
using System;

public class Solution {
    public static int search(double[] values, double target) {
        int jump = Math.Max(1, (int)Math.Sqrt(values.Length)); // @step:1
        int start = 0; // @step:2
        while (start < values.Length && values[Math.Min(start + jump, values.Length) - 1] < target) { // @step:2
            start += jump; // @step:2
        }
        int end = Math.Min(start + jump, values.Length); // @step:3
        for (int index = start; index < end; index++) { // @step:4
            if (values[index] == target) { // @step:5
                return index; // @step:5
            }
        }
        return -1; // @step:6
    }
}
`,y=`
public class Solution {
    public static int search(double[] values, double target) {
        int jump = Math.max(1, (int)Math.sqrt(values.length)); // @step:1
        int start = 0; // @step:2
        while (start < values.length && values[Math.min(start + jump, values.length) - 1] < target) { // @step:2
            start += jump; // @step:2
        }
        int end = Math.min(start + jump, values.length); // @step:3
        for (int index = start; index < end; index++) { // @step:4
            if (values[index] == target) { // @step:5
                return index; // @step:5
            }
        }
        return -1; // @step:6
    }
}
`,S=[p("typescript",x),p("python",M),p("csharp",C),p("java",y)];var b={algorithm:m,examples:f,implementations:S,makeSteps:g,requiresSorted:!0,bounds:["BLOCK","CHECK","END"],idea:"Jump through a sorted list in blocks of about \u221An values. Once a block could contain the target, scan that block one value at a time.",ideaSteps:["Choose a jump size near \u221An","Check the end of each block","Select the first possible block","Scan that block for the target"],insightTitle:"Fewer checks than a full scan",insight:"The jump and scan stages each take about \u221An checks. Sorting is required.",practice:[{number:704,title:"Binary Search",url:"https://leetcode.com/problems/binary-search/",difficulty:"Easy",relevance:"Related sorted-search practice: compare block jumps with halving the range. This problem requires O(log n), so submit binary search."},{number:35,title:"Search Insert Position",url:"https://leetcode.com/problems/search-insert-position/",difficulty:"Easy",relevance:"Practice finding a sorted insertion boundary. Use binary search to meet the required O(log n) time; jump search has O(sqrt(n)) worst-case time."}]};var v=class s{lesson=b;static \u0275fac=function(t){return new(t||s)};static \u0275cmp=h({type:s,selectors:[["app-jump-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(t,l){t&1&&u(0,"app-search-lesson",0),t&2&&c("lesson",l.lesson)},dependencies:[d],encapsulation:2,changeDetection:0})};export{v as JumpSearchPage};
