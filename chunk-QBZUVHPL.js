import{a as v}from"./chunk-2IPSR57M.js";import{a as b}from"./chunk-VY7RCZMB.js";import"./chunk-VE44PUAE.js";import"./chunk-V3PMXN6M.js";import{l as i}from"./chunk-BRHD6JZM.js";import{k as S}from"./chunk-34NHZ6JB.js";import{Fa as g,Ua as m,Xa as f,a as c}from"./chunk-KXQDCAUO.js";function E(o,r){let s=[],a={[r]:null},p={[r]:0},u=new Set([r]),l=[],h=[],d=[r],n=(t,e,w,C,T,D)=>{s.push({phase:t,current:e,edgeId:w,title:C,explanation:T,codeLine:D,frontier:[...d],visited:[...l],order:[...h],distances:c({},p),parents:c({},a)})};for(n("ready",null,null,`Begin at ${r}`,`Place ${r} in the queue. The first queued node is always processed next.`,1);d.length;){let t=d.shift();l.push(t),h.push(t),n("visit",t,null,`Visit ${t}`,`Remove ${t} from the front of the queue. Explore all of its neighbors before moving to the next queued node.`,2);for(let e of v(o,t)){if(n("inspect",t,e.edge.id,`Inspect ${t} \u2192 ${e.node}`,`Check whether ${e.node} is already discovered.`,3),u.has(e.node)){n("skip",t,e.edge.id,`Skip ${e.node}`,`${e.node} is already visited or waiting in the queue.`,5);continue}a[e.node]=t,p[e.node]=p[t]+1,u.add(e.node),d.push(e.node),n("discover",t,e.edge.id,`Enqueue ${e.node}`,`${e.node} joins the back of the queue. BFS finishes the current layer before reaching deeper nodes.`,4)}}return n("done",null,null,"Traversal complete",`Visited ${h.length} of ${o.nodes.length} nodes reachable from ${r}. Nodes outside this component remain unvisited.`,6),s}var y=[{label:"Branching paths",nodes:["A","B","C","D","E","F","G"],edges:[["A","B",1],["A","C",1],["B","D",1],["B","E",1],["C","F",1],["D","G",1],["E","G",1],["F","G",1]],directed:!1,start:"A"},{label:"Disconnected",nodes:["A","B","C","D","E","F","G"],edges:[["A","B",1],["A","C",1],["B","D",1],["E","F",1],["F","G",1]],directed:!1,start:"A"}];var B=`
type Graph = Record<string, string[]>;
function bfs(graph: Graph, start: string): string[] {
  const queue = [start];
  const discovered = new Set([start]); // @step:1
  const order: string[] = [];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head]; // @step:2
    head += 1; // @step:2
    order.push(node);
    for (const neighbor of graph[node] ?? []) { // @step:3
      if (discovered.has(neighbor)) {
        continue; // @step:5
      }
      discovered.add(neighbor);
      queue.push(neighbor); // @step:4
    }
  }
  return order; // @step:6
}
`,F=`
from collections import deque

def bfs(graph, start):
    queue = deque([start])  # @step:1
    discovered = {start}  # @step:1
    order = []
    while queue:
        node = queue.popleft()  # @step:2
        order.append(node)
        for neighbor in graph.get(node, []):  # @step:3
            if neighbor in discovered:  # @step:5
                continue
            discovered.add(neighbor)
            queue.append(neighbor)  # @step:4
    return order  # @step:6
`,_=`
using System;
using System.Collections.Generic;

public class Solution {

    public static List<string> bfs(Dictionary<string, List<string>> graph, string start) {
        var queue = new Queue<string>();
        var discovered = new HashSet<string> { start };
        queue.Enqueue(start); // @step:1
        var order = new List<string>();
        while (queue.Count > 0) {
            string node = queue.Dequeue(); // @step:2
            order.Add(node);
            foreach (string neighbor in graph[node]) { // @step:3
                if (discovered.Contains(neighbor)) { // @step:5
                    continue; // @step:5
                }
                discovered.Add(neighbor);
                queue.Enqueue(neighbor); // @step:4
            }
        }
        return order; // @step:6
    }
}
`,G=`
import java.util.*;

public class Solution {
    public static List<String> bfs(Map<String, List<String>> graph, String start) {
        Queue<String> queue = new ArrayDeque<>();
        Set<String> discovered = new HashSet<>();
        queue.add(start); // @step:1
        discovered.add(start); // @step:1
        List<String> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            String node = queue.remove(); // @step:2
            order.add(node);
            for (String neighbor : graph.getOrDefault(node, List.of())) { // @step:3
                if (discovered.contains(neighbor)) { // @step:5
                    continue; // @step:5
                }
                discovered.add(neighbor);
                queue.add(neighbor); // @step:4
            }
        }
        return order; // @step:6
    }
}
`,q=[i("typescript",B),i("python",F),i("csharp",_),i("java",G)];var A={algorithm:S,examples:y,implementations:q,makeSteps:E,kind:"bfs",articleTitle:"Explore the graph in waves.",article:["Breadth-first search (BFS) explores all nearby nodes before moving farther away. It begins with a start node in a queue. Each time it removes the front node, it adds any newly discovered neighbors to the back.","That queue creates layers: distance zero is the start, distance one contains its neighbors, and so on. For an unweighted graph, the first time BFS reaches a node is through a path with the fewest edges.","A node is marked discovered when it enters the queue. This prevents duplicate entries when two paths lead to the same place. The visualization shows both the queue and visit order, so you can see each wave spread."],takeaways:["Explore nearby nodes first","A queue controls the order","First discovery gives fewest edges"],practice:[{number:102,title:"Binary Tree Level Order Traversal",url:"https://leetcode.com/problems/binary-tree-level-order-traversal/",difficulty:"Medium",relevance:"Use a queue to group tree nodes by depth."},{number:994,title:"Rotting Oranges",url:"https://leetcode.com/problems/rotting-oranges/",difficulty:"Medium",relevance:"Start BFS from all rotten oranges and process each wave as one minute."}]};var R=class o{lesson=A;static \u0275fac=function(s){return new(s||o)};static \u0275cmp=g({type:o,selectors:[["app-breadth-first-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(s,a){s&1&&f(0,"app-graph-lesson",0),s&2&&m("lesson",a.lesson)},dependencies:[b],encapsulation:2,changeDetection:0})};export{R as BreadthFirstSearchPage};
