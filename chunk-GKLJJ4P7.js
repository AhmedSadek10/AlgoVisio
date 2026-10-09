import{a as c,b as x}from"./chunk-FYC7KM3Z.js";import"./chunk-V3PMXN6M.js";import{l as m}from"./chunk-BRHD6JZM.js";import{q as u}from"./chunk-34NHZ6JB.js";import{Fa as d,Ua as l,Xa as p}from"./chunk-KXQDCAUO.js";function v(r){let a=x(r),{values:t,record:s}=a;for(let e=0;e<t.length-1;e++){let o=Array.from({length:e},(i,y)=>y),n=e;s({title:`Find the minimum for index ${e}`,explanation:"Start with the first unsorted value as the minimum candidate.",key:"minimum",pass:e+1,active:[e],sorted:o,minimum:n});for(let i=e+1;i<t.length;i++)a.compare(),s({title:`Compare ${t[i]} with minimum ${t[n]}`,explanation:"Scan the whole unsorted suffix before deciding which value belongs next.",key:"compare",pass:e+1,active:[i,n],sorted:o,minimum:n}),t[i]<t[n]&&(n=i,s({title:`New minimum: ${t[i]}`,explanation:"Remember its index. The array stays unchanged until the scan finishes.",key:"update",pass:e+1,active:[i],sorted:o,minimum:n}));n!==e&&([t[e],t[n]]=[t[n],t[e]],a.write(2),s({title:"Place the minimum",explanation:`Swap the minimum into index ${e}. A distant swap can change the relative order of equal values.`,key:"swap",pass:e+1,active:[e,n],sorted:o,minimum:n})),s({title:`Index ${e} is final`,explanation:"The sorted prefix grows by one position. Nothing in this prefix moves again.",key:"passEnd",pass:e+1,sorted:[...o,e]})}return a.finish(),a.steps}var f=[{label:"Mixed values",values:[29,10,14,37,13,5]},{label:"Already sorted",values:[2,4,6,8,10,12]},{label:"Reverse order",values:[12,10,8,6,4,2]},{label:"Duplicates",values:[4,2,4,1,2,1]},{label:"Negative values",values:[-3,7,0,-8,2,-1]},{label:"Single value",values:[7]}];var I=`
function sortValues(values: number[]): number[] { // @step:start

  for (let index = 0; index < values.length - 1; index++) {
    let minimumIndex = index; // @step:minimum
    for (let candidateIndex = index + 1; candidateIndex < values.length; candidateIndex++) {
      if (values[candidateIndex] < values[minimumIndex]) { // @step:compare
        minimumIndex = candidateIndex; // @step:update
      }
    }
    if (minimumIndex !== index) {
      const temporaryValue = values[index]; // @step:swap
      values[index] = values[minimumIndex]; // @step:swap
      values[minimumIndex] = temporaryValue; // @step:swap
    } // @step:passEnd
  }
  return values; // @step:done
}
`,E=`
def sort_values(values):  # @step:start
    for index in range(len(values) - 1):
        minimum_index = index  # @step:minimum
        for candidate_index in range(index + 1, len(values)):
            if values[candidate_index] < values[minimum_index]:  # @step:compare
                minimum_index = candidate_index  # @step:update
        if minimum_index != index:
            temporary_value = values[index]  # @step:swap
            values[index] = values[minimum_index]  # @step:swap
            values[minimum_index] = temporary_value  # @step:swap
        # The sorted prefix grows by one. # @step:passEnd
    return values  # @step:done
`,w=`
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start

        for (int index = 0; index < values.Length - 1; index++) {
            int minimumIndex = index; // @step:minimum
            for (int candidateIndex = index + 1; candidateIndex < values.Length; candidateIndex++) {
                if (values[candidateIndex] < values[minimumIndex]) { // @step:compare
                    minimumIndex = candidateIndex; // @step:update
                }
            }
            if (minimumIndex != index) {
                double temporaryValue = values[index]; // @step:swap
                values[index] = values[minimumIndex]; // @step:swap
                values[minimumIndex] = temporaryValue; // @step:swap
            } // @step:passEnd
        }
        return values; // @step:done
    }
}
`,b=`
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start

        for (int index = 0; index < values.length - 1; index++) {
            int minimumIndex = index; // @step:minimum
            for (int candidateIndex = index + 1; candidateIndex < values.length; candidateIndex++) {
                if (values[candidateIndex] < values[minimumIndex]) { // @step:compare
                    minimumIndex = candidateIndex; // @step:update
                }
            }
            if (minimumIndex != index) {
                double temporaryValue = values[index]; // @step:swap
                values[index] = values[minimumIndex]; // @step:swap
                values[minimumIndex] = temporaryValue; // @step:swap
            } // @step:passEnd
        }
        return values; // @step:done
    }
}
`,h=[m("typescript",I),m("python",E),m("csharp",w),m("java",b)];var S={algorithm:u,examples:f,implementations:h,makeSteps:v,article:["Selection sort divides the array into a finished prefix and an unsorted suffix. Scan the suffix to find its smallest value, then swap that value into the first unfinished position.","Remembering a minimum index does not move any values. Only after the whole scan does the algorithm perform a swap. Each pass fixes one position, so it uses at most n \u2212 1 swaps.","Selection sort makes n(n \u2212 1)/2 value comparisons even on sorted input, so its time is O(n\xB2). It uses O(1) auxiliary space. Distant swaps make it unstable: in [2a, 2b, 1], the first swap gives [1, 2b, 2a]."],takeaways:["Find the minimum before swapping","Each pass fixes one prefix position","Few swaps, but quadratic comparisons","Distant swaps can reorder equal values"],practice:[{number:1051,title:"Height Checker",url:"https://leetcode.com/problems/height-checker/",difficulty:"Easy",relevance:"Selection-sort a copy by repeatedly choosing the minimum, then compare it with the original heights. The input has at most 100 values."},{number:2164,title:"Sort Even and Odd Indices Independently",url:"https://leetcode.com/problems/sort-even-and-odd-indices-independently/",difficulty:"Easy",relevance:"Select minima for even indices and maxima for odd indices. Small inputs let you practice selection sort in both directions."}]};var g=class r{lesson=S;static \u0275fac=function(t){return new(t||r)};static \u0275cmp=d({type:r,selectors:[["app-selection-sort-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(t,s){t&1&&p(0,"app-sorting-lesson",0),t&2&&l("lesson",s.lesson)},dependencies:[c],encapsulation:2,changeDetection:0})};export{g as SelectionSortPage};
