import{a as y,b as R}from"./chunk-FYC7KM3Z.js";import"./chunk-V3PMXN6M.js";import{l as p}from"./chunk-BRHD6JZM.js";import{d as b}from"./chunk-34NHZ6JB.js";import{Fa as w,Ua as c,Xa as I}from"./chunk-KXQDCAUO.js";function S(m){let i=R(m),t=i.values,d=0;function f(r,n){if(r>=n){r===n&&i.record({title:"One value is already ordered",explanation:`Index ${r} needs no further splitting. It may move in a later merge.`,key:"base",pass:d,active:[r]});return}let g=r+Math.floor((n-r)/2),u=[r,n];i.record({title:"Split the range",explanation:`Split indices ${r}\u2013${n} into ${r}\u2013${g} and ${g+1}\u2013${n}. Sort both halves before merging.`,key:"split",pass:d,range:u,active:[r,g,n]}),f(r,g),f(g+1,n),d++;let a=t.slice(r,g+1),o=t.slice(g+1,n+1),l=0,s=0,e=r;function h(v,x,T,C=[]){i.record({title:x,explanation:T,key:v,pass:d,range:u,active:C,buffers:{left:a,right:o,leftIndex:l,rightIndex:s}})}for(h("buffers","Copy the sorted halves","Temporary arrays preserve both halves while the original array is overwritten. Writes count destination array slots only.");l<a.length&&s<o.length;)i.compare(),h("compare","Compare the next buffer values",`Compare left ${a[l]} with right ${o[s]}. Take the left value on a tie to keep the sort stable.`,[e]),a[l]<=o[s]?(t[e]=a[l],l++,i.write(),h("writeLeft","Take from the left",`Write ${t[e]} at index ${e}.`,[e])):(t[e]=o[s],s++,i.write(),h("writeRight","Take from the right",`Write ${t[e]} at index ${e}.`,[e])),e++;for(;l<a.length;)t[e]=a[l],l++,i.write(),h("remainderLeft","Copy the remaining left value",`The right buffer is exhausted. Write ${t[e]} at index ${e}.`,[e]),e++;for(;s<o.length;)t[e]=o[s],s++,i.write(),h("remainderRight","Copy the remaining right value",`The left buffer is exhausted. Write ${t[e]} at index ${e}.`,[e]),e++;i.record({title:"Range merged",explanation:`Indices ${r}\u2013${n} are ordered. They may move again when merged with a neighboring range.`,key:"merged",pass:d,range:u,sorted:Array.from({length:n-r+1},(v,x)=>r+x),buffers:{left:a,right:o,leftIndex:l,rightIndex:s}})}return f(0,t.length-1),i.finish(),i.steps}var _=[{label:"Mixed values",values:[29,10,14,37,13,5]},{label:"Already sorted",values:[2,4,6,8,10,12]},{label:"Reverse order",values:[12,10,8,6,4,2]},{label:"Duplicates",values:[4,2,4,1,2,1]},{label:"Negative values",values:[-3,7,0,-8,2,-1]},{label:"Single value",values:[7]}];var O=`
function sortValues(values: number[]): number[] { // @step:start
  sortRange(values, 0, values.length - 1);
  return values; // @step:done
}

function sortRange(values: number[], low: number, high: number): void {
  if (low >= high) { // @step:base
    return;
  }
  const middle = low + Math.floor((high - low) / 2); // @step:split
  sortRange(values, low, middle); // @step:split
  sortRange(values, middle + 1, high); // @step:split
  merge(values, low, middle, high);
  // The whole range is now ordered. // @step:merged
}

function merge(values: number[], low: number, middle: number, high: number): void {
  const left = values.slice(low, middle + 1); // @step:buffers
  const right = values.slice(middle + 1, high + 1); // @step:buffers
  let leftIndex = 0;
  let rightIndex = 0;
  let writeIndex = low;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) { // @step:compare
      values[writeIndex] = left[leftIndex]; // @step:writeLeft
      leftIndex++; // @step:writeLeft
    } else {
      values[writeIndex] = right[rightIndex]; // @step:writeRight
      rightIndex++; // @step:writeRight
    }
    writeIndex++;
  }
  while (leftIndex < left.length) {
    values[writeIndex] = left[leftIndex]; // @step:remainderLeft
    leftIndex++; // @step:remainderLeft
    writeIndex++; // @step:remainderLeft
  }
  while (rightIndex < right.length) {
    values[writeIndex] = right[rightIndex]; // @step:remainderRight
    rightIndex++; // @step:remainderRight
    writeIndex++; // @step:remainderRight
  }
}
`,$=`
def sort_values(values):  # @step:start
    def merge(low, middle, high):
        left = values[low:middle + 1]  # @step:buffers
        right = values[middle + 1:high + 1]  # @step:buffers
        left_index = 0
        right_index = 0
        write_index = low

        while left_index < len(left) and right_index < len(right):
            if left[left_index] <= right[right_index]:  # @step:compare
                values[write_index] = left[left_index]  # @step:writeLeft
                left_index += 1  # @step:writeLeft
            else:
                values[write_index] = right[right_index]  # @step:writeRight
                right_index += 1  # @step:writeRight
            write_index += 1
        while left_index < len(left):
            values[write_index] = left[left_index]  # @step:remainderLeft
            left_index += 1  # @step:remainderLeft
            write_index += 1  # @step:remainderLeft
        while right_index < len(right):
            values[write_index] = right[right_index]  # @step:remainderRight
            right_index += 1  # @step:remainderRight
            write_index += 1  # @step:remainderRight

    def sort_range(low, high):
        if low >= high:  # @step:base
            return
        middle = low + (high - low) // 2  # @step:split
        sort_range(low, middle)  # @step:split
        sort_range(middle + 1, high)  # @step:split
        merge(low, middle, high)
        # The whole range is now ordered.  # @step:merged

    sort_range(0, len(values) - 1)
    return values  # @step:done
`,A=`
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
        int middle = low + (high - low) / 2; // @step:split
        SortRange(values, low, middle); // @step:split
        SortRange(values, middle + 1, high); // @step:split
        Merge(values, low, middle, high);
        // The whole range is now ordered. // @step:merged
    }

    static void Merge(double[] values, int low, int middle, int high) {
        double[] left = values[low..(middle + 1)]; // @step:buffers
        double[] right = values[(middle + 1)..(high + 1)]; // @step:buffers
        int leftIndex = 0;
        int rightIndex = 0;
        int writeIndex = low;

        while (leftIndex < left.Length && rightIndex < right.Length) {
            if (left[leftIndex] <= right[rightIndex]) { // @step:compare
                values[writeIndex] = left[leftIndex]; // @step:writeLeft
                leftIndex++; // @step:writeLeft
            } else {
                values[writeIndex] = right[rightIndex]; // @step:writeRight
                rightIndex++; // @step:writeRight
            }
            writeIndex++;
        }
        while (leftIndex < left.Length) {
            values[writeIndex] = left[leftIndex]; // @step:remainderLeft
            leftIndex++; // @step:remainderLeft
            writeIndex++; // @step:remainderLeft
        }
        while (rightIndex < right.Length) {
            values[writeIndex] = right[rightIndex]; // @step:remainderRight
            rightIndex++; // @step:remainderRight
            writeIndex++; // @step:remainderRight
        }
    }
}`,k=`
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
        int middle = low + (high - low) / 2; // @step:split
        sortRange(values, low, middle); // @step:split
        sortRange(values, middle + 1, high); // @step:split
        merge(values, low, middle, high);
        // The whole range is now ordered. // @step:merged
    }

    static void merge(double[] values, int low, int middle, int high) {
        double[] left = Arrays.copyOfRange(values, low, middle + 1); // @step:buffers
        double[] right = Arrays.copyOfRange(values, middle + 1, high + 1); // @step:buffers
        int leftIndex = 0;
        int rightIndex = 0;
        int writeIndex = low;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) { // @step:compare
                values[writeIndex] = left[leftIndex]; // @step:writeLeft
                leftIndex++; // @step:writeLeft
            } else {
                values[writeIndex] = right[rightIndex]; // @step:writeRight
                rightIndex++; // @step:writeRight
            }
            writeIndex++;
        }
        while (leftIndex < left.length) {
            values[writeIndex] = left[leftIndex]; // @step:remainderLeft
            leftIndex++; // @step:remainderLeft
            writeIndex++; // @step:remainderLeft
        }
        while (rightIndex < right.length) {
            values[writeIndex] = right[rightIndex]; // @step:remainderRight
            rightIndex++; // @step:remainderRight
            writeIndex++; // @step:remainderRight
        }
    }
}`,L=[p("typescript",O),p("python",$),p("csharp",A),p("java",k)];var E={algorithm:b,examples:_,implementations:L,makeSteps:S,showMergeBuffers:!0,article:["Merge sort splits a range into two halves until each range contains one value. It then combines sorted halves, building larger ordered ranges on the way back up.","Copy both halves into temporary arrays. Compare their next values and write the smaller one back. Choose the left value on ties to preserve stability. Copy the remaining values when one half runs out. The buffer panel keeps values visible while destination slots are overwritten.","Merge sort takes O(n log n) time in the best, average, and worst cases and O(n) auxiliary space. Teal marks the range just merged; these values can still move in later merges. Array writes count destination slots, excluding temporary buffer copies."],takeaways:["Split before merging","Read from temporary sorted halves","Choose the left value on a tie","Merged ranges can move in later merges"],practice:[{number:88,title:"Merge Sorted Array",url:"https://leetcode.com/problems/merge-sorted-array/",difficulty:"Easy",relevance:"Practice the merge step alone, combining two sorted arrays with two pointers."},{number:912,title:"Sort an Array",url:"https://leetcode.com/problems/sort-an-array/",difficulty:"Medium",relevance:"Apply divide, recursively sort, and merge to achieve O(n log n) time."},{number:148,title:"Sort List",url:"https://leetcode.com/problems/sort-list/",difficulty:"Medium",relevance:"Adapt merge sort to linked lists by splitting the list and merging sorted halves."}]};var M=class m{lesson=E;static \u0275fac=function(t){return new(t||m)};static \u0275cmp=w({type:m,selectors:[["app-merge-sort-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(t,d){t&1&&I(0,"app-sorting-lesson",0),t&2&&c("lesson",d.lesson)},dependencies:[y],encapsulation:2,changeDetection:0})};export{M as MergeSortPage};
