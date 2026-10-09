import{a as L}from"./chunk-VY7RCZMB.js";import"./chunk-VE44PUAE.js";import"./chunk-V3PMXN6M.js";import{l as u}from"./chunk-BRHD6JZM.js";import{n as D}from"./chunk-34NHZ6JB.js";import{Fa as F,Ua as A,Xa as E,a as v,b as I}from"./chunk-KXQDCAUO.js";function k(n,g,o){let f=[],w=n.edges.flatMap(e=>n.directed?[e]:[e,I(v({},e),{from:e.to,to:e.from})]),t=Object.fromEntries(n.nodes.map(e=>[e,1/0])),b=Object.fromEntries(n.nodes.map(e=>[e,null]));t[g]=0;let r=0,d=0,l=null,c=null,s=null,h="\u2014",i=!1,S=[],a=(e,m,$,x,M="",B,P)=>{f.push({phase:m,title:$,explanation:x,current:l,edgeId:c,codeLine:Number(e),frontier:[],visited:[],order:[...S],parents:v({},b),path:P,distances:Object.fromEntries(Object.entries(t).map(([y,C])=>[y,Number.isFinite(C)?C:null])),trace:{codeKey:e,variables:[{name:"pass",value:r},{name:"u",value:l??"\u2014"},{name:"v",value:h},{name:"candidate",value:s??"\u2014"},{name:"updates",value:d}],edgeOrder:n.edges.map(y=>y.id),negativeCycle:i,comparison:M,summary:B}})};for(a("1","ready",`Initialize dist[${g}] = 0`,"All other distances start at infinity. Unlike Dijkstra, Bellman\u2013Ford can handle negative edge weights."),r=1;r<n.nodes.length;r++){d=0,l=null,c=null,h="\u2014",s=null,a("2","inspect",`Pass ${r} of ${n.nodes.length-1}`,"Scan every edge again. After i complete passes, all shortest routes using at most i edges have been found; in-place updates can propagate farther.");for(let e of w){if(l=e.from,h=e.to,c=e.id,s=null,a("3","inspect",`Check ${e.from} \u2192 ${e.to} (${e.weight})`,"An edge can improve its destination only if its source has a known distance."),!Number.isFinite(t[e.from])){a("4","skip","Skip an unreachable source",`dist[${e.from}] is \u221E. This edge cannot produce a finite candidate yet.`);continue}s=t[e.from]+e.weight,a("4","inspect",`Candidate distance: ${s}`,`Go through ${e.from}, then add edge weight ${e.weight}.`);let m=`${t[e.from]} + ${e.weight} = ${s} ${s<t[e.to]?"<":"\u2265"} ${Number.isFinite(t[e.to])?t[e.to]:"\u221E"}`;a("5","inspect",s<t[e.to]?"A cheaper route is available":"Keep the current distance","Compare the candidate with the best distance currently stored for the destination.",m),s<t[e.to]&&(t[e.to]=s,b[e.to]=e.from,d++,S.push(e.to),a("6","relax",`Update dist[${e.to}] = ${s}`,`Set parent[${e.to}] = ${e.from}. These distances are tentative until all passes and the cycle check finish.`,m))}if(l=null,c=null,a("7","inspect",d===0?"No updates: stop early":`${d} updates in this pass`,d===0?"A complete pass changed nothing. The distance table is stable, so we can skip the remaining relaxation passes.":"At least one distance changed. Another pass may propagate those improvements."),d===0)break}r=Math.min(r,Math.max(0,n.nodes.length-1));for(let e of w)if(l=e.from,h=e.to,c=e.id,s=Number.isFinite(t[e.from])?t[e.from]+e.weight:null,i=s!==null&&s<t[e.to],a("8",i?"stale":"inspect",i?"Reachable negative cycle detected":"Check for a further improvement",i?"An edge still relaxes after V \u2212 1 passes. A reachable negative cycle lets some route costs decrease without limit. The displayed distances are tentative, not valid shortest-path results.":"The extra scan detects negative cycles reachable from the start. An unreachable cycle cannot affect these routes."),i)break;l=null,c=null,h="\u2014",s=null;let p=[];if(!i&&Number.isFinite(t[o])){for(let e=o;e!==null;e=b[e])p.push(e);p.reverse(),a("9","inspect","Reconstruct the target path","Follow predecessor links from the target back to the start, then reverse their order.","",void 0,p)}let _=i?"Reachable negative cycle \xB7 no shortest-path result returned":p.length?`${p.join(" \u2192 ")} \xB7 cost ${t[o]}`:`${o} is unreachable from ${g}`;return a("10","done",i?"Negative cycle: distances are not final":"Shortest-path computation complete",i?"The extra edge scan found a further improvement. Distances affected by the reachable cycle cannot be finalized.":"The distance table is final. Predecessor links describe the shortest route to each reachable node.","",_,p),f}var N=[{label:"Small example",nodes:["A","B","C","D"],edges:[["C","D",2],["B","C",-2],["A","B",4],["A","C",5]],directed:!0,start:"A",target:"D"},{label:"Negative cycle",nodes:["A","B","C"],edges:[["A","B",1],["B","C",-3],["C","B",1]],directed:!0,start:"A",target:"C"},{label:"Unreachable cycle",nodes:["A","B","C","D"],edges:[["A","B",2],["C","D",-3],["D","C",1]],directed:!0,start:"A",target:"D"}];var G=`
type Edge = {
  from: string;
  to: string;
  weight: number;
};

function bellmanFord(nodes: string[], edges: Edge[], start: string, target: string) {
  const dist: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  for (const node of nodes) {
    dist[node] = Infinity;
    parent[node] = null;
  }
  dist[start] = 0; // @step:1
  for (let pass = 1; pass < nodes.length; pass++) { // @step:2
    let changed = false;
    for (const { from, to, weight } of edges) { // @step:3
      if (dist[from] === Infinity) {
        continue;
      }
      const candidate = dist[from] + weight; // @step:4
      if (candidate < dist[to]) { // @step:5
        dist[to] = candidate; // @step:6
        parent[to] = from; // @step:6
        changed = true; // @step:6
      }
    }
    if (!changed) {
      break; // @step:7
    }
  }
  let negativeCycle = false;
  for (const { from, to, weight } of edges) { // @step:8
    if (dist[from] !== Infinity && dist[from] + weight < dist[to]) { // @step:8
      negativeCycle = true; // @step:8
      break;
    }
  }
  const path: string[] = [];
  if (!negativeCycle && dist[target] !== Infinity) {
    for (let node: string | null = target; node !== null; node = parent[node]) {
      path.push(node); // @step:9
    }
  }
  path.reverse(); // @step:9
  return { dist, path, negativeCycle }; // @step:10
}
`,U=`
def bellmanFord(nodes, edges, start, target):
    dist = {node: float("inf") for node in nodes}
    parent = {node: None for node in nodes}
    dist[start] = 0  # @step:1
    for pass_number in range(1, len(nodes)):  # @step:2
        changed = False
        for source, destination, weight in edges:  # @step:3
            if dist[source] == float("inf"):
                continue
            candidate = dist[source] + weight  # @step:4
            if candidate < dist[destination]:  # @step:5
                dist[destination] = candidate  # @step:6
                parent[destination] = source  # @step:6
                changed = True  # @step:6
        if not changed:  # @step:7
            break
    negative_cycle = False
    for source, destination, weight in edges:  # @step:8
        if dist[source] != float("inf") and dist[source] + weight < dist[destination]:  # @step:8
            negative_cycle = True  # @step:8
            break
    path = []
    if not negative_cycle and dist[target] != float("inf"):
        node = target
        while node is not None:
            path.append(node)  # @step:9
            node = parent[node]
    path.reverse()  # @step:9
    return {"dist": dist, "path": path, "negativeCycle": negative_cycle}  # @step:10
`,V=`
#nullable enable
using System;
using System.Collections.Generic;

public class Solution {
    public record Edge(string From, string To, double Weight);
    public record Result(Dictionary<string, double> Dist, List<string> Path, bool NegativeCycle);

    public static Result bellmanFord(string[] nodes, List<Edge> edges, string start, string target) {
        var dist = new Dictionary<string, double>();
        var parent = new Dictionary<string, string?>();
        foreach (string node in nodes) {
            dist[node] = double.PositiveInfinity;
            parent[node] = null;
        }
        dist[start] = 0; // @step:1
        for (int pass = 1; pass < nodes.Length; pass++) { // @step:2
            bool changed = false;
            foreach (Edge edge in edges) { // @step:3
                if (double.IsPositiveInfinity(dist[edge.From])) {
                    continue;
                }
                double candidate = dist[edge.From] + edge.Weight; // @step:4
                if (candidate < dist[edge.To]) { // @step:5
                    dist[edge.To] = candidate; // @step:6
                    parent[edge.To] = edge.From; // @step:6
                    changed = true; // @step:6
                }
            }
            if (!changed) { // @step:7
                break; // @step:7
            }
        }
        bool negativeCycle = false;
        foreach (Edge edge in edges) { // @step:8
            if (!double.IsPositiveInfinity(dist[edge.From]) &&
                dist[edge.From] + edge.Weight < dist[edge.To]) { // @step:8
                negativeCycle = true; // @step:8
                break;
            }
        }
        var path = new List<string>();
        if (!negativeCycle && !double.IsPositiveInfinity(dist[target])) {
            for (string? node = target; node != null; node = parent[node]) {
                path.Add(node); // @step:9
            }
        }
        path.Reverse(); // @step:9
        return new Result(dist, path, negativeCycle); // @step:10
    }
}
`,j=`
import java.util.*;

public class Solution {
    public record Edge(String from, String to, double weight) {}
    public record Result(Map<String, Double> dist, List<String> path, boolean negativeCycle) {}

    public static Result bellmanFord(List<String> nodes, List<Edge> edges, String start, String target) {
        Map<String, Double> dist = new LinkedHashMap<>();
        Map<String, String> parent = new LinkedHashMap<>();
        for (String node : nodes) {
            dist.put(node, Double.POSITIVE_INFINITY);
            parent.put(node, null);
        }
        dist.put(start, 0.0); // @step:1
        for (int pass = 1; pass < nodes.size(); pass++) { // @step:2
            boolean changed = false;
            for (Edge edge : edges) { // @step:3
                if (dist.get(edge.from()) == Double.POSITIVE_INFINITY) {
                    continue;
                }
                double candidate = dist.get(edge.from()) + edge.weight(); // @step:4
                if (candidate < dist.get(edge.to())) { // @step:5
                    dist.put(edge.to(), candidate); // @step:6
                    parent.put(edge.to(), edge.from()); // @step:6
                    changed = true; // @step:6
                }
            }
            if (!changed) { // @step:7
                break; // @step:7
            }
        }
        boolean negativeCycle = false;
        for (Edge edge : edges) { // @step:8
            if (dist.get(edge.from()) != Double.POSITIVE_INFINITY &&
                dist.get(edge.from()) + edge.weight() < dist.get(edge.to())) { // @step:8
                negativeCycle = true; // @step:8
                break;
            }
        }
        List<String> path = new ArrayList<>();
        if (!negativeCycle && dist.get(target) != Double.POSITIVE_INFINITY) {
            for (String node = target; node != null; node = parent.get(node)) {
                path.add(node); // @step:9
            }
        }
        Collections.reverse(path); // @step:9
        return new Result(dist, path, negativeCycle); // @step:10
    }
}
`,R=[u("typescript",G),u("python",U),u("csharp",V),u("java",j)];var T={algorithm:D,examples:N,implementations:R,makeSteps:k,kind:"bellman-ford",articleTitle:"Improve every route, one pass at a time.",article:["Bellman\u2013Ford finds the shortest weighted routes from one start node, even when some edges have negative weights. It begins with distance zero at the start and infinity everywhere else. For each edge u \u2192 v, it asks whether dist[u] + weight is smaller than dist[v]. If so, it updates both the distance and the predecessor.","A shortest simple path contains at most V \u2212 1 edges. Repeating a complete edge scan V \u2212 1 times therefore gives improvements enough opportunities to reach every node, provided no reachable negative cycle exists. This dry run updates distances in place, so an improvement can sometimes travel across several edges during one pass.","If a full pass makes no updates, the distances are already stable and the algorithm stops early. It then scans edges once more: an additional improvement proves that a negative cycle is reachable from the start. Repeating such a cycle lowers affected route costs forever, so those routes have no finite shortest distance. An unreachable negative cycle does not affect the start\u2019s routes.","Follow each pass, edge, candidate sum, and distance-table change alongside the highlighted code. Try the negative-cycle example to see why the final check matters. Undirected input expands each edge into both directions; a reachable negative undirected edge consequently creates a negative cycle. When a reachable cycle is found, this lesson reports it and does not return a target path."],takeaways:["Relax every edge for up to V \u2212 1 passes","Stop early when a full pass changes nothing","One extra scan detects reachable negative cycles"],practice:[{number:787,title:"Cheapest Flights Within K Stops",url:"https://leetcode.com/problems/cheapest-flights-within-k-stops/",difficulty:"Medium",relevance:"Limit edge-relaxation passes to K + 1 flights. Read the previous pass's distances so one pass cannot use extra flights."},{number:743,title:"Network Delay Time",url:"https://leetcode.com/problems/network-delay-time/",difficulty:"Medium",relevance:"Use repeated edge relaxation to compute source distances, then report the last arrival or an unreachable node."}]};var O=class n{lesson=T;static \u0275fac=function(o){return new(o||n)};static \u0275cmp=F({type:n,selectors:[["app-bellman-ford-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(o,f){o&1&&E(0,"app-graph-lesson",0),o&2&&A("lesson",f.lesson)},dependencies:[L],encapsulation:2,changeDetection:0})};export{O as BellmanFordPage};
