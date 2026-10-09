import{a as m}from"./chunk-C7HHSF6C.js";import"./chunk-VE44PUAE.js";import"./chunk-IJWT65BB.js";import{l as n}from"./chunk-BRHD6JZM.js";import{f as c}from"./chunk-34NHZ6JB.js";import{Fa as h,Ua as p,Xa as d}from"./chunk-KXQDCAUO.js";function u(r,s){let t=[{low:0,high:r.length-1,mid:null,phase:"ready",title:"Ready to search",description:"The array is sorted. Start in the middle and eliminate half of the remaining values after each comparison.",activeLine:1,iteration:0}],i=0,a=r.length-1,o=0;for(;i<=a;){o++;let e=Math.floor((i+a)/2),l=r[e];if(t.push({low:i,high:a,mid:e,phase:"compare",iteration:o,title:`Check the middle value: ${l}`,description:`The search range is index ${i} to ${a}. The middle is index ${e}, which holds ${l}. Compare it with ${s}.`,activeLine:3}),l===s)return t.push({low:i,high:a,mid:e,phase:"found",iteration:o,title:`Found ${s} at index ${e}`,description:`The middle value matches the target. The search is complete after ${o} ${o===1?"comparison":"comparisons"}.`,activeLine:5}),t;l<s?(t.push({low:e+1,high:a,mid:e,phase:"discard",iteration:o,title:"Discard the left half",description:`${l} is smaller than ${s}. Every value at or left of index ${e} is too small, so move low to ${e+1}.`,activeLine:7}),i=e+1):(t.push({low:i,high:e-1,mid:e,phase:"discard",iteration:o,title:"Discard the right half",description:`${l} is larger than ${s}. Every value at or right of index ${e} is too large, so move high to ${e-1}.`,activeLine:8}),a=e-1)}return t.push({low:i,high:a,mid:null,phase:"missing",iteration:o,title:`${s} is not in the array`,description:"Low has passed high, so no values remain to check. The target is not present.",activeLine:11}),t}var g=[{label:"Easy to find",values:[3,8,12,17,23,29,34,41,48,56,63],target:34},{label:"At the edge",values:[2,6,11,15,19,24,31,38,45,52,60],target:60},{label:"Not found",values:[4,9,14,20,26,32,39,46,54,61,70],target:35}];var y=`
function search(values: number[], target: number): number {
  let low = 0;
  let high = values.length - 1; // @step:1
  while (low <= high) { // @step:2
    const middle = low + Math.floor((high - low) / 2); // @step:3
    if (values[middle] === target) {
      return middle; // @step:5
    }
    if (values[middle] < target) {
      low = middle + 1; // @step:7
    } else {
      high = middle - 1; // @step:8
    }
  } // @step:9
  return -1; // @step:11
}
`,w=`
def search(values, target):
    low = 0  # @step:1
    high = len(values) - 1  # @step:1
    while low <= high:  # @step:2
        middle = low + (high - low) // 2  # @step:3
        if values[middle] == target:  # @step:5
            return middle
        if values[middle] < target:  # @step:7
            low = middle + 1
        else:  # @step:8
            high = middle - 1
    return -1  # @step:11
`,b=`
using System;

public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.Length - 1; // @step:1
        while (low <= high) { // @step:2
            int middle = low + (high - low) / 2; // @step:3
            if (values[middle] == target) { // @step:5
                return middle; // @step:5
            } // @step:6
            if (values[middle] < target) { // @step:7
                low = middle + 1; // @step:7
            }
            else { // @step:8
                high = middle - 1; // @step:8
            }
        } // @step:9
        return -1; // @step:11
    }
}
`,E=`
public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.length - 1; // @step:1
        while (low <= high) { // @step:2
            int middle = low + (high - low) / 2; // @step:3
            if (values[middle] == target) { // @step:5
                return middle; // @step:5
            } // @step:6
            if (values[middle] < target) { // @step:7
                low = middle + 1; // @step:7
            }
            else { // @step:8
                high = middle - 1; // @step:8
            }
        } // @step:9
        return -1; // @step:11
    }
}
`,f=[n("typescript",y),n("python",w),n("csharp",b),n("java",E)];var S={algorithm:c,examples:g,implementations:f,makeSteps:u,requiresSorted:!0,bounds:["LOW","MID","HIGH"],idea:"On a sorted list, compare the middle value with the target. Each comparison lets you remove half of the remaining values.",ideaSteps:["Start with the full range","Check the middle value","Keep only the possible half","Repeat until found or empty"],insightTitle:"Why it\u2019s fast",insight:"Each comparison halves the work. A million items take at most about 20 checks.",practice:[{number:704,title:"Binary Search",url:"https://leetcode.com/problems/binary-search/",difficulty:"Easy",relevance:"Apply the same low, mid, and high bounds to locate a target in a sorted array."},{number:35,title:"Search Insert Position",url:"https://leetcode.com/problems/search-insert-position/",difficulty:"Easy",relevance:"Adapt binary search to return the insertion boundary when the target is absent."}]};var v=class r{lesson=S;static \u0275fac=function(t){return new(t||r)};static \u0275cmp=h({type:r,selectors:[["app-binary-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(t,i){t&1&&d(0,"app-search-lesson",0),t&2&&p("lesson",i.lesson)},dependencies:[m],encapsulation:2,changeDetection:0})};export{v as BinarySearchPage};
