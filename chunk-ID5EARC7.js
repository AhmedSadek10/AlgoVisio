import{a as E}from"./chunk-2IPSR57M.js";import{a as b}from"./chunk-VY7RCZMB.js";import"./chunk-VE44PUAE.js";import"./chunk-V3PMXN6M.js";import{l as a}from"./chunk-BRHD6JZM.js";import{j as v}from"./chunk-34NHZ6JB.js";import{Fa as m,Ua as f,Xa as S,a as u}from"./chunk-KXQDCAUO.js";function D(o,t){let s=[],p={[t]:null},g={[t]:0},c=new Set,h=[],r=[{node:t,next:0}],i=(n,l,e,d,R,T)=>{s.push({phase:n,current:l,edgeId:e,title:d,explanation:R,codeLine:T,frontier:r.map(_=>_.node),visited:[...c],order:[...h],distances:u({},g),parents:u({},p)})};for(i("ready",null,null,`Begin at ${t}`,"The stack holds the current path. Its last node is the next one to explore.",1),c.add(t),h.push(t),i("visit",t,null,`Enter ${t}`,`Mark ${t} visited and explore its neighbors in the order written in the edge list.`,2);r.length;){let n=r[r.length-1],l=E(o,n.node);if(n.next===l.length){let d=r.pop();i("backtrack",d.node,null,`Backtrack from ${d.node}`,`${d.node} has no unvisited neighbors left. Return to the previous stack frame.`,6);continue}let e=l[n.next++];if(i("inspect",n.node,e.edge.id,`Inspect ${n.node} \u2192 ${e.node}`,`Look at the edge from ${n.node} to ${e.node}. Has ${e.node} been visited?`,3),c.has(e.node)){i("skip",n.node,e.edge.id,`Skip ${e.node}`,`${e.node} was already visited, so following this edge would repeat work.`,5);continue}p[e.node]=n.node,g[e.node]=g[n.node]+1,r.push({node:e.node,next:0}),c.add(e.node),h.push(e.node),i("discover",e.node,e.edge.id,`Go deeper to ${e.node}`,`Push ${e.node} onto the stack. DFS will finish this path before returning to ${n.node}.`,4)}return i("done",null,null,"Traversal complete",`Visited ${h.length} of ${o.nodes.length} nodes reachable from ${t}. Nodes outside this component remain unvisited.`,7),s}var y=[{label:"Branching paths",nodes:["A","B","C","D","E","F","G"],edges:[["A","B",1],["A","C",1],["B","D",1],["B","E",1],["C","F",1],["D","G",1],["E","G",1],["F","G",1]],directed:!1,start:"A"},{label:"Disconnected",nodes:["A","B","C","D","E","F","G"],edges:[["A","B",1],["A","C",1],["B","D",1],["E","F",1],["F","G",1]],directed:!1,start:"A"}];var k=`
type Graph = Record<string, string[]>;
function dfs(graph: Graph, start: string): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  function visit(node: string): void {
    visited.add(node); // @step:2
    order.push(node); // @step:2
    for (const neighbor of graph[node] ?? []) { // @step:3
      if (visited.has(neighbor)) {
        continue; // @step:5
      }
      visit(neighbor); // @step:4
    }
    return; // @step:6
  }
  visit(start); // @step:1
  return order; // @step:7
}
`,w=`
def dfs(graph, start):
    visited = set()
    order = []
    def visit(node):
        visited.add(node)  # @step:2
        order.append(node)  # @step:2
        for neighbor in graph.get(node, []):  # @step:3
            if neighbor in visited:  # @step:5
                continue
            visit(neighbor)  # @step:4
        return  # @step:6
    visit(start)  # @step:1
    return order  # @step:7
`,G=`
using System;
using System.Collections.Generic;

public class Solution {

    public static List<string> dfs(Dictionary<string, List<string>> graph, string start) {
        var visited = new HashSet<string>();
        var order = new List<string>();

        void Visit(string node) {
            visited.Add(node); // @step:2
            order.Add(node); // @step:2
            foreach (string neighbor in graph[node]) { // @step:3
                if (visited.Contains(neighbor)) { // @step:5
                    continue; // @step:5
                }
                Visit(neighbor); // @step:4
            }
            return; // @step:6
        }
        Visit(start); // @step:1
        return order; // @step:7
    }
}
`,x=`
import java.util.*;

public class Solution {
    public static List<String> dfs(Map<String, List<String>> graph, String start) {
        Set<String> visited = new HashSet<>();
        List<String> order = new ArrayList<>();
        visit(graph, start, visited, order); // @step:1
        return order; // @step:7
    }

    private static void visit(Map<String, List<String>> graph, String node,
            Set<String> visited, List<String> order) {
        visited.add(node); // @step:2
        order.add(node); // @step:2
        for (String neighbor : graph.getOrDefault(node, List.of())) { // @step:3
            if (visited.contains(neighbor)) { // @step:5
                continue; // @step:5
            }
            visit(graph, neighbor, visited, order); // @step:4
        }
        return; // @step:6
    }
}
`,C=[a("typescript",k),a("python",w),a("csharp",G),a("java",x)];var F={algorithm:v,examples:y,implementations:C,makeSteps:D,kind:"dfs",articleTitle:"Follow one path until it ends.",article:["Depth-first search (DFS) explores a graph by committing to one route. From a starting node, it visits the first unvisited neighbor, then repeats from that neighbor. When there is nowhere new to go, it backs up to the most recent choice and tries the next edge.","The stack is the key idea. Each item represents a node whose remaining neighbors still need attention. The top of the stack is the current position. This is the same pattern that recursive DFS uses through the call stack.","DFS reaches every node connected to the start, but the order depends on how neighbors are listed. On a graph with cycles, the visited set prevents the search from going around forever. Disconnected nodes stay untouched in this lesson."],takeaways:["Go deep before exploring siblings","The stack remembers where to return","Visited nodes stop cycles"],practice:[{number:547,title:"Number of Provinces",url:"https://leetcode.com/problems/number-of-provinces/",difficulty:"Medium",relevance:"Run DFS from each unvisited city to count connected components."},{number:200,title:"Number of Islands",url:"https://leetcode.com/problems/number-of-islands/",difficulty:"Medium",relevance:"Explore connected land cells with DFS and mark each cell visited once."}]};var A=class o{lesson=F;static \u0275fac=function(s){return new(s||o)};static \u0275cmp=m({type:o,selectors:[["app-depth-first-search-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(s,p){s&1&&S(0,"app-graph-lesson",0),s&2&&f("lesson",p.lesson)},dependencies:[b],encapsulation:2,changeDetection:0})};export{A as DepthFirstSearchPage};
