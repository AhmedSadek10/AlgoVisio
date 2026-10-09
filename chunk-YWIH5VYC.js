import{a as g,b as y}from"./chunk-FYC7KM3Z.js";import"./chunk-V3PMXN6M.js";import{l as p}from"./chunk-BRHD6JZM.js";import{e as b}from"./chunk-34NHZ6JB.js";import{Fa as c,Ua as m,Xa as h}from"./chunk-KXQDCAUO.js";function f(d){let a=y(d),e=a.values,s=new Set,i=0;function v(n,o){if(n>o)return;if(n===o){s.add(n),a.record({title:"One value remains",explanation:`Index ${n} is already in its final position.`,key:"base",pass:i,sorted:[...s]});return}i++;let l=e[o],t=n,u=[n,o];a.record({title:`Choose pivot ${l}`,explanation:`Partition indices ${n}\u2013${o}. Values smaller than ${l} will move before the boundary.`,key:"pivot",pass:i,pivot:o,range:u,active:[o],sorted:[...s]});for(let r=n;r<o;r++)if(a.compare(),a.record({title:`Compare ${e[r]} with ${l}`,explanation:`${e[r]} ${e[r]<l?"belongs before the boundary":"stays on the greater-or-equal side"}. Boundary index: ${t}.`,key:"compare",pass:i,pivot:o,range:u,active:[r,o],sorted:[...s]}),e[r]<l){if(r!==t){let _=e[r];e[r]=e[t],e[t]=_,a.write(2),a.record({title:"Move a smaller value left",explanation:`Swap indices ${r} and ${t}, then advance the boundary.`,key:"swap",pass:i,pivot:o,range:u,active:[r,t],sorted:[...s]})}t++}if(t!==o){let r=e[t];e[t]=e[o],e[o]=r,a.write(2)}s.add(t),a.record({title:"Place the pivot",explanation:`Pivot ${l} is final at index ${t}. Its left side is smaller; its right side is greater or equal.`,key:"place",pass:i,pivot:t,range:u,active:[t],sorted:[...s]}),a.record({title:"Sort both partitions",explanation:"Apply the same partitioning to the left range, then the right range. Exclude the finished pivot.",key:"recurse",pass:i,range:u,sorted:[...s]}),v(n,t-1),v(t+1,o)}return v(0,e.length-1),a.finish(),a.steps}var x=[{label:"Mixed values",values:[29,10,14,37,13,5]},{label:"Already sorted",values:[2,4,6,8,10,12]},{label:"Reverse order",values:[12,10,8,6,4,2]},{label:"Duplicates",values:[4,2,4,1,2,1]},{label:"Negative values",values:[-3,7,0,-8,2,-1]},{label:"Single value",values:[7]}];var k=`
function sortValues(values: number[]): number[] { // @step:start
  sortRange(values, 0, values.length - 1);
  return values; // @step:done
}

function sortRange(values: number[], low: number, high: number): void {
  if (low >= high) { // @step:base
    return;
  }
  const pivotIndex = partition(values, low, high);
  sortRange(values, low, pivotIndex - 1); // @step:recurse
  sortRange(values, pivotIndex + 1, high); // @step:recurse
}

function partition(values: number[], low: number, high: number): number {
  const pivot = values[high]; // @step:pivot
  let boundary = low;
  for (let index = low; index < high; index++) {
    if (values[index] < pivot) { // @step:compare
      if (index !== boundary) {
        const temporary = values[index]; // @step:swap
        values[index] = values[boundary]; // @step:swap
        values[boundary] = temporary; // @step:swap
      }
      boundary++;
    }
  }
  if (boundary !== high) { // @step:place
    const temporary = values[boundary]; // @step:place
    values[boundary] = values[high]; // @step:place
    values[high] = temporary; // @step:place
  }
  return boundary;
}
`,C=`
def sort_values(values):  # @step:start
    def partition(low, high):
        pivot = values[high]  # @step:pivot
        boundary = low
        for index in range(low, high):
            if values[index] < pivot:  # @step:compare
                if index != boundary:
                    temporary = values[index]  # @step:swap
                    values[index] = values[boundary]  # @step:swap
                    values[boundary] = temporary  # @step:swap
                boundary += 1
        if boundary != high:  # @step:place
            temporary = values[boundary]  # @step:place
            values[boundary] = values[high]  # @step:place
            values[high] = temporary  # @step:place
        return boundary

    def sort_range(low, high):
        if low >= high:  # @step:base
            return
        pivot_index = partition(low, high)
        sort_range(low, pivot_index - 1)  # @step:recurse
        sort_range(pivot_index + 1, high)  # @step:recurse

    sort_range(0, len(values) - 1)
    return values  # @step:done
`,I=`
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start
        SortRange(values, 0, values.Length - 1);
        return values; // @step:done
    }

    static void SortRange(double[] values, int low, int high) {
        if (low >= high) { // @step:base
            return;
        }
        int pivotIndex = Partition(values, low, high);
        SortRange(values, low, pivotIndex - 1); // @step:recurse
        SortRange(values, pivotIndex + 1, high); // @step:recurse
    }

    static int Partition(double[] values, int low, int high) {
        double pivot = values[high]; // @step:pivot
        int boundary = low;
        for (int index = low; index < high; index++) {
            if (values[index] < pivot) { // @step:compare
                if (index != boundary) {
                    double temporary = values[index]; // @step:swap
                    values[index] = values[boundary]; // @step:swap
                    values[boundary] = temporary; // @step:swap
                }
                boundary++;
            }
        }
        if (boundary != high) { // @step:place
            double temporary = values[boundary]; // @step:place
            values[boundary] = values[high]; // @step:place
            values[high] = temporary; // @step:place
        }
        return boundary;
    }
}`,O=`
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start
        sortRange(values, 0, values.length - 1);
        return values; // @step:done
    }

    static void sortRange(double[] values, int low, int high) {
        if (low >= high) { // @step:base
            return;
        }
        int pivotIndex = partition(values, low, high);
        sortRange(values, low, pivotIndex - 1); // @step:recurse
        sortRange(values, pivotIndex + 1, high); // @step:recurse
    }

    static int partition(double[] values, int low, int high) {
        double pivot = values[high]; // @step:pivot
        int boundary = low;
        for (int index = low; index < high; index++) {
            if (values[index] < pivot) { // @step:compare
                if (index != boundary) {
                    double temporary = values[index]; // @step:swap
                    values[index] = values[boundary]; // @step:swap
                    values[boundary] = temporary; // @step:swap
                }
                boundary++;
            }
        }
        if (boundary != high) { // @step:place
            double temporary = values[boundary]; // @step:place
            values[boundary] = values[high]; // @step:place
            values[high] = temporary; // @step:place
        }
        return boundary;
    }
}`,S=[p("typescript",k),p("python",C),p("csharp",I),p("java",O)];var w={algorithm:b,examples:x,implementations:S,makeSteps:f,article:["Quick sort chooses a pivot and partitions the range around it. This version uses the last value as the pivot. A boundary marks where the next smaller value belongs.","Scan the range and move values smaller than the pivot before the boundary. Place the pivot at the boundary, then recursively sort the ranges on either side. Teal positions are final and will not move again.","Average time is O(n log n), but choosing the last pivot gives O(n\xB2) on sorted, reversed, or all-equal arrays. The recursive stack uses O(log n) space on average and O(n) in the worst case. Quick sort is not stable. Randomized pivots are a common improvement."],takeaways:["Choose the last value as pivot","Move smaller values before the boundary","Exclude the finished pivot from recursion","Fixed pivots can produce quadratic time"],practice:[{number:912,title:"Sort an Array",url:"https://leetcode.com/problems/sort-an-array/",difficulty:"Medium",relevance:"Implement quicksort with randomized pivots and duplicate-aware partitioning. Avoid the quadratic behavior of the lesson's fixed last pivot."},{number:215,title:"Kth Largest Element in an Array",url:"https://leetcode.com/problems/kth-largest-element-in-an-array/",difficulty:"Medium",relevance:"Extend partitioning into quickselect: continue only in the side containing the requested rank."},{number:75,title:"Sort Colors",url:"https://leetcode.com/problems/sort-colors/",difficulty:"Medium",relevance:"Practice three-way partitioning into values below, equal to, and above a pivot; this problem has only three colors."}]};var R=class d{lesson=w;static \u0275fac=function(e){return new(e||d)};static \u0275cmp=c({type:d,selectors:[["app-quick-sort-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(e,s){e&1&&h(0,"app-sorting-lesson",0),e&2&&m("lesson",s.lesson)},dependencies:[g],encapsulation:2,changeDetection:0})};export{R as QuickSortPage};
