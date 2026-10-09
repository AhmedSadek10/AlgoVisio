import{a as c,b as h}from"./chunk-FYC7KM3Z.js";import"./chunk-V3PMXN6M.js";import{l as r}from"./chunk-BRHD6JZM.js";import{r as v}from"./chunk-34NHZ6JB.js";import{Fa as p,Ua as d,Xa as u}from"./chunk-KXQDCAUO.js";function m(a){let s=h(a),{values:t,record:o}=s;for(let n=1;n<t.length;n++){let i=t[n],e=n-1,l=Array.from({length:n},(O,g)=>g);for(o({title:`Hold ${i} aside`,explanation:"Save the next value in a local variable before shifting array slots. The prefix is sorted, but its positions can still move.",key:"hold",pass:n,active:[n],sorted:l,held:i});e>=0&&(s.compare(),o({title:`Compare ${t[e]} with held value ${i}`,explanation:"Shift only values strictly larger than the held value. Equal values stay in their original relative order.",key:"compare",pass:n,active:[e,e+1],held:i}),!(t[e]<=i));)t[e+1]=t[e],s.write(),o({title:"Shift one position right",explanation:"Copy the larger value into the next slot. The temporary duplicate is expected: the held value remains safe outside the array.",key:"shift",pass:n,active:[e,e+1],held:i}),e--;t[e+1]=i,s.write(),o({title:`Insert ${i} at index ${e+1}`,explanation:"The expanded prefix is sorted. Unlike selection sort, these are ordered values, not necessarily their final positions.",key:"insert",pass:n,active:[e+1],sorted:[...l,n]})}return s.finish(),s.steps}var x=[{label:"Mixed values",values:[29,10,14,37,13,5]},{label:"Already sorted",values:[2,4,6,8,10,12]},{label:"Reverse order",values:[12,10,8,6,4,2]},{label:"Duplicates",values:[4,2,4,1,2,1]},{label:"Negative values",values:[-3,7,0,-8,2,-1]},{label:"Single value",values:[7]}];var y=`
function sortValues(values: number[]): number[] { // @step:start

  for (let index = 1; index < values.length; index++) {
    const valueToInsert = values[index]; // @step:hold
    let insertionIndex = index - 1;
    while (insertionIndex >= 0 && values[insertionIndex] > valueToInsert) { // @step:compare
      values[insertionIndex + 1] = values[insertionIndex]; // @step:shift
      insertionIndex--;
    }
    values[insertionIndex + 1] = valueToInsert; // @step:insert
  }
  return values; // @step:done
}
`,T=`
def sort_values(values):  # @step:start
    for index in range(1, len(values)):
        value_to_insert = values[index]  # @step:hold
        insertion_index = index - 1
        while insertion_index >= 0 and values[insertion_index] > value_to_insert:  # @step:compare
            values[insertion_index + 1] = values[insertion_index]  # @step:shift
            insertion_index -= 1
        values[insertion_index + 1] = value_to_insert  # @step:insert
    return values  # @step:done
`,_=`
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start

        for (int index = 1; index < values.Length; index++) {
            double valueToInsert = values[index]; // @step:hold
            int insertionIndex = index - 1;
            while (insertionIndex >= 0 && values[insertionIndex] > valueToInsert) { // @step:compare
                values[insertionIndex + 1] = values[insertionIndex]; // @step:shift
                insertionIndex--;
            }
            values[insertionIndex + 1] = valueToInsert; // @step:insert
        }
        return values; // @step:done
    }
}
`,b=`
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start

        for (int index = 1; index < values.length; index++) {
            double valueToInsert = values[index]; // @step:hold
            int insertionIndex = index - 1;
            while (insertionIndex >= 0 && values[insertionIndex] > valueToInsert) { // @step:compare
                values[insertionIndex + 1] = values[insertionIndex]; // @step:shift
                insertionIndex--;
            }
            values[insertionIndex + 1] = valueToInsert; // @step:insert
        }
        return values; // @step:done
    }
}
`,f=[r("typescript",y),r("python",T),r("csharp",_),r("java",b)];var S={algorithm:v,examples:x,implementations:f,makeSteps:m,article:["Insertion sort works like arranging cards in your hand. Start with one sorted value, hold the next value aside, and find where it belongs in the sorted prefix.","Shift larger values one slot right, then insert the held value into the opening. During shifting, the array can contain temporary duplicates. The held variable keeps the original value safe until insertion.","The prefix is ordered after each pass, but its values may move during later passes. This stable algorithm uses O(1) auxiliary space, takes O(n) time for sorted input, and O(n\xB2) for reverse order. It is useful for small or nearly sorted lists."],takeaways:["Save the next value before shifting","Shift larger values to make room","Sorted prefix positions can still move","Efficient on nearly sorted input"],practice:[{number:147,title:"Insertion Sort List",url:"https://leetcode.com/problems/insertion-sort-list/",difficulty:"Medium",relevance:"Apply insertion sort to a linked list: remove each node and insert it into the sorted prefix."},{number:1051,title:"Height Checker",url:"https://leetcode.com/problems/height-checker/",difficulty:"Easy",relevance:"Grow a sorted prefix in a copy of the heights, then count mismatched positions. Small inputs suit insertion sort."}]};var I=class a{lesson=S;static \u0275fac=function(t){return new(t||a)};static \u0275cmp=p({type:a,selectors:[["app-insertion-sort-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(t,o){t&1&&u(0,"app-sorting-lesson",0),t&2&&d("lesson",o.lesson)},dependencies:[c],encapsulation:2,changeDetection:0})};export{I as InsertionSortPage};
