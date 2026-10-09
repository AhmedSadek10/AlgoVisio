import{a as p}from"./chunk-C7HHSF6C.js";import"./chunk-VE44PUAE.js";import"./chunk-IJWT65BB.js";import{l as a}from"./chunk-BRHD6JZM.js";import{g as c}from"./chunk-34NHZ6JB.js";import{Fa as o,Ua as s,Xa as l}from"./chunk-KXQDCAUO.js";function h(t,i){let n=[{low:0,high:t.length-1,mid:null,phase:"ready",iteration:0,title:"Ready to scan",description:"Start at the first value. Linear search does not need a sorted array.",activeLine:1}];for(let e=0;e<t.length;e++){let r=e+1;if(n.push({low:e,high:t.length-1,mid:e,phase:"compare",iteration:r,title:`Check index ${e}: ${t[e]}`,description:`Compare ${t[e]} with ${i}. If they match, stop; otherwise move one position right.`,activeLine:2,pointerLabel:"CHECK"}),t[e]===i)return n.push({low:e,high:t.length-1,mid:e,phase:"found",iteration:r,title:`Found ${i} at index ${e}`,description:`The value matches after ${r} ${r===1?"comparison":"comparisons"}.`,activeLine:3}),n;n.push({low:e+1,high:t.length-1,mid:e,phase:"discard",iteration:r,title:`Move past ${t[e]}`,description:`${t[e]} is not the target. Continue with index ${e+1}.`,activeLine:4})}return n.push({low:t.length,high:t.length-1,mid:null,phase:"missing",iteration:t.length,title:`${i} is not in the list`,description:"Every value was checked and none matched the target.",activeLine:5}),n}var m=[{label:"Easy to find",values:[18,4,32,9,25,7,41,12],target:9},{label:"At the edge",values:[14,3,28,11,6,35,20,8],target:8},{label:"Not found",values:[21,5,17,42,13,30,2,19],target:99}];var f=`
function search(values: number[], target: number): number {
  for (let index = 0; index < values.length; index++) { // @step:1
    const value = values[index]; // @step:2
    if (value === target) {
      return index; // @step:3
    }
  } // @step:4
  return -1; // @step:5
}
`,S=`
def search(values, target):
    for index in range(len(values)):  # @step:1
        value = values[index]  # @step:2
        if value == target:  # @step:3
            return index
        continue  # @step:4
    return -1  # @step:5
`,v=`
using System;

public class Solution {
    public static int search(double[] values, double target) {
        for (int index = 0; index < values.Length; index++) { // @step:1
            double value = values[index]; // @step:2
            if (value == target) { // @step:3
                return index; // @step:3
            }
        } // @step:4
        return -1; // @step:5
    }
}
`,E=`
public class Solution {
    public static int search(double[] values, double target) {
        for (int index = 0; index < values.length; index++) { // @step:1
            double value = values[index]; // @step:2
            if (value == target) { // @step:3
                return index; // @step:3
            }
        } // @step:4
        return -1; // @step:5
    }
}
`,d=[a("typescript",f),a("python",S),a("csharp",v),a("java",E)];var u={algorithm:c,examples:m,implementations:d,makeSteps:h,requiresSorted:!1,bounds:["NEXT","CHECK","LAST"],idea:"Look at each value from left to right. Stop when it matches the target or when no values remain.",ideaSteps:["Start at index zero","Compare the current value","Move right if it differs","Stop at a match or the end"],insightTitle:"Works on any list",insight:"Linear search needs no sorting. In the worst case it checks every value once.",practice:[{number:27,title:"Remove Element",url:"https://leetcode.com/problems/remove-element/",difficulty:"Easy",relevance:"Scan every element, compare it with the target, and compact the values you keep."},{number:1295,title:"Find Numbers with Even Number of Digits",url:"https://leetcode.com/problems/find-numbers-with-even-number-of-digits/",difficulty:"Easy",relevance:"Practice a linear scan that tests a condition and counts matching values."}]};var g=class t{lesson=u;static \u0275fac=function(n){return new(n||t)};static \u0275cmp=o({type:t,selectors:[["app-linear-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(n,e){n&1&&l(0,"app-search-lesson",0),n&2&&s("lesson",e.lesson)},dependencies:[p],encapsulation:2,changeDetection:0})};export{g as LinearSearchPage};
