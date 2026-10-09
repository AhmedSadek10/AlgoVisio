import{a as c}from"./chunk-C7HHSF6C.js";import"./chunk-VE44PUAE.js";import"./chunk-IJWT65BB.js";import{l as r}from"./chunk-BRHD6JZM.js";import{i as u}from"./chunk-34NHZ6JB.js";import{Fa as l,Ua as p,Xa as h}from"./chunk-KXQDCAUO.js";function g(e,a){let o=[{low:0,high:e.length-1,mid:null,phase:"ready",iteration:0,title:"Ready to estimate",description:"The list is sorted. Estimate the target\u2019s position from its value relative to the range endpoints.",activeLine:1}],t=0,s=e.length-1,n=0;for(;t<=s&&a>=e[t]&&a<=e[s];){n++;let i=e[s]===e[t]?t:t+Math.floor((a-e[t])*(s-t)/(e[s]-e[t]));if(o.push({low:t,high:s,mid:i,phase:"compare",iteration:n,title:`Estimate index ${i}: ${e[i]}`,description:`Within indices ${t}\u2013${s}, the target\u2019s value points to index ${i}. Compare ${e[i]} with ${a}.`,activeLine:3,pointerLabel:"PROBE"}),e[i]===a)return o.push({low:t,high:s,mid:i,phase:"found",iteration:n,title:`Found ${a} at index ${i}`,description:"The estimated position contains the target.",activeLine:4}),o;e[i]<a?(t=i+1,o.push({low:t,high:s,mid:i,phase:"discard",iteration:n,title:"Look farther right",description:`${e[i]} is too small. Continue above index ${i}.`,activeLine:5})):(s=i-1,o.push({low:t,high:s,mid:i,phase:"discard",iteration:n,title:"Look farther left",description:`${e[i]} is too large. Continue below index ${i}.`,activeLine:6}))}return o.push({low:t,high:s,mid:null,phase:"missing",iteration:n,title:`${a} is not in the array`,description:"The remaining range is empty or the target falls outside its endpoint values.",activeLine:8}),o}var m=[{label:"Easy to find",values:[5,15,25,35,45,55,65,75,85,95,105],target:75},{label:"At the edge",values:[2,12,22,32,42,52,62,72,82,92,102],target:102},{label:"Not found",values:[5,15,25,35,45,55,65,75,85,95,105],target:58}];var w=`
function search(values: number[], target: number): number {
  let low = 0;
  let high = values.length - 1; // @step:1
  while (low <= high && target >= values[low] && target <= values[high]) { // @step:2
    const valueRange = values[high] - values[low]; // @step:3
    let position = low; // @step:3
    if (valueRange !== 0) { // @step:3
      const relativeOffset = (target - values[low]) * (high - low); // @step:3
      position += Math.floor(relativeOffset / valueRange); // @step:3
    }
    if (values[position] === target) {
      return position; // @step:4
    }
    if (values[position] < target) {
      low = position + 1; // @step:5
    } else {
      high = position - 1; // @step:6
    }
  } // @step:7
  return -1; // @step:8
}
`,S=`
def search(values, target):
    low = 0  # @step:1
    high = len(values) - 1  # @step:1
    while low <= high and values[low] <= target <= values[high]:  # @step:2
        value_range = values[high] - values[low]  # @step:3
        position = low  # @step:3
        if value_range != 0:  # @step:3
            relative_offset = (target - values[low]) * (high - low)  # @step:3
            position += relative_offset // value_range  # @step:3
        if values[position] == target:  # @step:4
            return position
        if values[position] < target:  # @step:5
            low = position + 1
        else:  # @step:6
            high = position - 1
    return -1  # @step:8
`,b=`
using System;

public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.Length - 1; // @step:1
        while (low <= high && target >= values[low] && target <= values[high]) { // @step:2
            double valueRange = values[high] - values[low]; // @step:3
            int position = low; // @step:3
            if (valueRange != 0) { // @step:3
                double relativeOffset = (target - values[low]) * (high - low); // @step:3
                position += (int)Math.Floor(relativeOffset / valueRange); // @step:3
            }
            if (values[position] == target) { // @step:4
                return position; // @step:4
            }
            if (values[position] < target) { // @step:5
                low = position + 1; // @step:5
            }
            else { // @step:6
                high = position - 1; // @step:6
            }
        } // @step:7
        return -1; // @step:8
    }
}
`,E=`
public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.length - 1; // @step:1
        while (low <= high && target >= values[low] && target <= values[high]) { // @step:2
            double valueRange = values[high] - values[low]; // @step:3
            int position = low; // @step:3
            if (valueRange != 0) { // @step:3
                double relativeOffset = (target - values[low]) * (high - low); // @step:3
                position += (int)Math.floor(relativeOffset / valueRange); // @step:3
            }
            if (values[position] == target) { // @step:4
                return position; // @step:4
            }
            if (values[position] < target) { // @step:5
                low = position + 1; // @step:5
            }
            else { // @step:6
                high = position - 1; // @step:6
            }
        } // @step:7
        return -1; // @step:8
    }
}
`,d=[r("typescript",w),r("python",S),r("csharp",b),r("java",E)];var f={algorithm:u,examples:m,implementations:d,makeSteps:g,requiresSorted:!0,bounds:["LOW","PROBE","HIGH"],idea:"Use the values at both ends of a sorted range to estimate where the target lies. Probe there, then narrow the range.",ideaSteps:["Read the range endpoints","Estimate the target position","Compare the probed value","Narrow the range and repeat"],insightTitle:"Best with even spacing",insight:"On evenly distributed data, average time can be O(log log n). Uneven data can take O(n) in the worst case.",practice:[{number:704,title:"Binary Search",url:"https://leetcode.com/problems/binary-search/",difficulty:"Easy",relevance:"Compare value-based probes with midpoint probes. This problem requires O(log n); interpolation search alone does not guarantee it, so use binary search."},{number:35,title:"Search Insert Position",url:"https://leetcode.com/problems/search-insert-position/",difficulty:"Easy",relevance:"Practice sorted boundaries and missing targets. Use binary search for the required O(log n) guarantee rather than relying on uniformly distributed values."}]};var v=class e{lesson=f;static \u0275fac=function(o){return new(o||e)};static \u0275cmp=l({type:e,selectors:[["app-interpolation-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(o,t){o&1&&h(0,"app-search-lesson",0),o&2&&p("lesson",t.lesson)},dependencies:[c],encapsulation:2,changeDetection:0})};export{v as InterpolationSearchPage};
