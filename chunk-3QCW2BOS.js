import{a as m,b as c}from"./chunk-FYC7KM3Z.js";import"./chunk-V3PMXN6M.js";import{l as n}from"./chunk-BRHD6JZM.js";import{p as b}from"./chunk-34NHZ6JB.js";import{Fa as u,Ua as h,Xa as g}from"./chunk-KXQDCAUO.js";function f(i){let a=c(i),{values:s,record:r}=a;for(let t=s.length-1;t>0;t--){let o=s.length-t,l=s.map((e,p)=>p).filter(e=>e>t),d=!1;r({title:`Begin pass ${o}`,explanation:`Compare neighbors through index ${t}. The suffix to its right is already final.`,key:"pass",pass:o,sorted:l});for(let e=0;e<t;e++)a.compare(),r({title:`Compare ${s[e]} and ${s[e+1]}`,explanation:"If the left value is larger, swap the pair. Equal values keep their relative order.",key:"compare",pass:o,active:[e,e+1],sorted:l}),s[e]>s[e+1]&&([s[e],s[e+1]]=[s[e+1],s[e]],a.write(2),d=!0,r({title:"Swap the neighbors",explanation:"The larger value moves one slot right toward the end of the unsorted region. A swap writes two array slots.",key:"swap",pass:o,active:[e,e+1],sorted:l}));if(r({title:`Index ${t} is final`,explanation:"The largest remaining value has reached the end of this pass.",key:"passEnd",pass:o,sorted:[t,...l]}),!d){r({title:"No swaps: stop early",explanation:"Every neighboring pair was already ordered. The entire array is sorted, so no further passes are needed.",key:"early",pass:o,sorted:s.map((e,p)=>p)});break}}return a.finish(),a.steps}var v=[{label:"Mixed values",values:[29,10,14,37,13,5]},{label:"Already sorted",values:[2,4,6,8,10,12]},{label:"Reverse order",values:[12,10,8,6,4,2]},{label:"Duplicates",values:[4,2,4,1,2,1]},{label:"Negative values",values:[-3,7,0,-8,2,-1]},{label:"Single value",values:[7]}];var S=`
function sortValues(values: number[]): number[] { // @step:start

  for (let unsortedEnd = values.length - 1; unsortedEnd > 0; unsortedEnd--) { // @step:pass
    let swapped = false;
    for (let neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
      if (values[neighborIndex] > values[neighborIndex + 1]) { // @step:compare
        const temporaryValue = values[neighborIndex]; // @step:swap
        values[neighborIndex] = values[neighborIndex + 1]; // @step:swap
        values[neighborIndex + 1] = temporaryValue; // @step:swap
        swapped = true;
      }
    } // @step:passEnd
    if (!swapped) {
      break; // @step:early
    }
  }
  return values; // @step:done
}
`,E=`
def sort_values(values):  # @step:start
    for unsorted_end in range(len(values) - 1, 0, -1):  # @step:pass
        swapped = False
        for neighbor_index in range(unsorted_end):
            if values[neighbor_index] > values[neighbor_index + 1]:  # @step:compare
                temporary_value = values[neighbor_index]  # @step:swap
                values[neighbor_index] = values[neighbor_index + 1]  # @step:swap
                values[neighbor_index + 1] = temporary_value  # @step:swap
                swapped = True
        # The largest remaining value is now final. # @step:passEnd
        if not swapped:  # @step:early
            break
    return values  # @step:done
`,I=`
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start

        for (int unsortedEnd = values.Length - 1; unsortedEnd > 0; unsortedEnd--) { // @step:pass
            bool swapped = false;
            for (int neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
                if (values[neighborIndex] > values[neighborIndex + 1]) { // @step:compare
                    double temporaryValue = values[neighborIndex]; // @step:swap
                    values[neighborIndex] = values[neighborIndex + 1]; // @step:swap
                    values[neighborIndex + 1] = temporaryValue; // @step:swap
                    swapped = true;
                }
            } // @step:passEnd
            if (!swapped) { // @step:early
                break; // @step:early
            }
        }
        return values; // @step:done
    }
}
`,_=`
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start

        for (int unsortedEnd = values.length - 1; unsortedEnd > 0; unsortedEnd--) { // @step:pass
            boolean swapped = false;
            for (int neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
                if (values[neighborIndex] > values[neighborIndex + 1]) { // @step:compare
                    double temporaryValue = values[neighborIndex]; // @step:swap
                    values[neighborIndex] = values[neighborIndex + 1]; // @step:swap
                    values[neighborIndex + 1] = temporaryValue; // @step:swap
                    swapped = true;
                }
            } // @step:passEnd
            if (!swapped) { // @step:early
                break; // @step:early
            }
        }
        return values; // @step:done
    }
}
`,y=[n("typescript",S),n("python",E),n("csharp",I),n("java",_)];var x={algorithm:b,examples:v,implementations:y,makeSteps:f,article:["Bubble sort compares neighbors from left to right. If a pair is out of order, swap it. A large value can move right repeatedly in one pass until it reaches its final position.","After each pass, shrink the unsorted region by one. The largest values form a sorted suffix that later passes never touch. If a complete pass makes no swaps, every neighboring pair is ordered and the algorithm stops early.","This version takes O(n) time on an already sorted array and O(n\xB2) in the worst case. It uses O(1) auxiliary space and is stable because equal values are never swapped."],takeaways:["Compare adjacent values","A sorted suffix grows from the right","No swaps means stop early","Stable, but slow for large arrays"],practice:[{number:1051,title:"Height Checker",url:"https://leetcode.com/problems/height-checker/",difficulty:"Easy",relevance:"Bubble-sort a copy, then count positions that differ from the original. At most 100 values make quadratic practice practical."},{number:2164,title:"Sort Even and Odd Indices Independently",url:"https://leetcode.com/problems/sort-even-and-odd-indices-independently/",difficulty:"Easy",relevance:"Use adjacent swaps within the even and odd subsequences, sorting them in opposite directions. The input has at most 100 values."}]};var w=class i{lesson=x;static \u0275fac=function(s){return new(s||i)};static \u0275cmp=u({type:i,selectors:[["app-bubble-sort-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(s,r){s&1&&g(0,"app-sorting-lesson",0),s&2&&h("lesson",r.lesson)},dependencies:[m],encapsulation:2,changeDetection:0})};export{w as BubbleSortPage};
