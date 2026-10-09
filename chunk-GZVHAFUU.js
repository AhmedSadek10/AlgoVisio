import{a as T}from"./chunk-VY7RCZMB.js";import"./chunk-VE44PUAE.js";import"./chunk-V3PMXN6M.js";import{l as E}from"./chunk-BRHD6JZM.js";import{l as A}from"./chunk-34NHZ6JB.js";import{Fa as $,Ua as C,Xa as R,a as l,b}from"./chunk-KXQDCAUO.js";var x=class{items=[];get size(){return this.items.length}peek(){return this.items[0]}snapshot(){return this.items.map(s=>l({},s))}push(s,i){this.items.push(s),i({operation:"push",activeEntryIds:[s.id]});let a=this.items.length-1;for(;a>0;){let n=Math.floor((a-1)/2);if(!this.less(a,n))break;let h=[this.items[a].id,this.items[n].id];this.swap(a,n),i({operation:"sift-up",activeEntryIds:h}),a=n}}pop(s){let i=this.items[0];if(!i)return;let a=this.items.pop();this.items.length&&(this.items[0]=a),s({operation:"pop",activeEntryIds:this.items.length?[a.id]:[]});let n=0;for(;;){let h=n*2+1,g=h+1,d=n;if(h<this.items.length&&this.less(h,d)&&(d=h),g<this.items.length&&this.less(g,d)&&(d=g),d===n)break;let m=[this.items[n].id,this.items[d].id];this.swap(n,d),s({operation:"sift-down",activeEntryIds:m}),n=d}return i}less(s,i){let a=this.items[s],n=this.items[i];return a.distance<n.distance||a.distance===n.distance&&a.id<n.id}swap(s,i){[this.items[s],this.items[i]]=[this.items[i],this.items[s]]}};function q(c,s,i){if(!c.nodes.includes(s))return[];let a=[],n=Object.fromEntries(c.nodes.map(e=>[e,null])),h=Object.fromEntries(c.nodes.map(e=>[e,null])),g=new Map(c.nodes.map(e=>[e,[]]));for(let e of c.edges)g.get(e.from).push({node:e.to,edge:e}),c.directed||g.get(e.to).push({node:e.from,edge:e});let d=new Set,m=[],f=new x,G=0,u=null,p={current:null,neighbor:null,weight:null,candidate:null,previousDistance:null},o=(e,t,r,S,v,y=null,H="Inspect state",N=[],O)=>{let k=f.snapshot();a.push({phase:e,current:p.current,edgeId:y,title:t,explanation:r,codeLine:v,path:O,frontier:[...new Set(k.filter(I=>!d.has(I.node)).map(I=>I.node))],visited:[...d],order:[...m],distances:l({},n),parents:l({},h),dryRun:b(l({},p),{heap:k,activeEntryIds:[...N],operation:H,extracted:u?l({},u):null,codeKey:S})})},D=(e,t,r=null)=>{let S={id:G++,node:e,distance:t};f.push(S,v=>{let y=v.operation==="sift-up";o(y?"heap-swap":"heap-push",y?"Sift the new entry upward":`Push (${t}, ${e})`,y?"Swap a child with its parent when its priority is smaller. Equal distances use insertion order. Continue until the min-heap property is restored.":`Append (${t}, ${e}) to the heap. Its priority is the distance at insertion time; sift-up may move it toward the root.`,e===s&&m.length===0?"seed":"push",e===s&&m.length===0?1:4,r,y?"Sift up \xB7 swap":"Push \xB7 append",v.activeEntryIds)})};for(n[s]=0,o("ready",`Initialize dist[${s}] = 0`,"All other distances are \u221E. The heap is empty until we enqueue the start node.","initialize",1),D(s,0);f.size;){u=l({},f.peek()),p={current:u.node,neighbor:null,weight:null,candidate:null,previousDistance:null},o("heap-pop",`Read the minimum: (${u.distance}, ${u.node})`,"The next entry is at index 0. Remove it, move the final leaf to the root, then sift that entry down.","pop",2,null,"Pop \xB7 select root",[u.id]);let e=f.pop(t=>{let r=t.operation==="sift-down";o(r?"heap-swap":"heap-pop",r?"Restore the heap with sift-down":`Extract (${u.distance}, ${u.node})`,r?"Swap the parent with its smaller child. The highlighted entries changed places in the heap array and tree.":f.size?"The final leaf moved to index 0. Sift-down will restore the min-heap property if needed.":"The heap is now empty. Check the extracted entry before processing its edges.","pop",2,null,r?"Sift down \xB7 swap":"Pop \xB7 remove root",t.activeEntryIds)});if(e.distance!==n[e.node]){o("stale",`Skip stale (${e.distance}, ${e.node})`,`This entry stores ${e.distance}, but dist[${e.node}] is now ${n[e.node]}. A cheaper entry was pushed later, so this old one must not expand the node again.`,"stale",5,null,"Discard stale entry");continue}o("inspect",`Stored ${e.distance} equals dist[${e.node}]`,"The stale-entry condition is false. Accept this entry and expand its outgoing edges.","stale",2,null,"Check stored priority"),d.add(e.node),m.push(e.node),o("settle",`Settle ${e.node} at distance ${e.distance}`,`The extracted priority equals dist[${e.node}]. With non-negative weights, this shortest distance is final.`,"settle",2,null,"Accept minimum");for(let t of g.get(e.node)){p={current:e.node,neighbor:t.node,weight:t.edge.weight,candidate:null,previousDistance:n[t.node]},o("inspect",`Inspect ${e.node} \u2192 ${t.node}`,`Read this edge's weight (${t.edge.weight}) and the best distance to ${t.node} (${n[t.node]??"\u221E"}).`,"edge",3,t.edge.id);let r=e.distance+t.edge.weight;if(p=b(l({},p),{candidate:r}),o("inspect",`candidate = ${e.distance} + ${t.edge.weight} = ${r}`,`Compare ${r} with dist[${t.node}] = ${n[t.node]??"\u221E"}. Only a strictly cheaper route changes the table and heap.`,"candidate",3,t.edge.id),n[t.node]!==null&&r>=n[t.node]){o("skip",`Keep dist[${t.node}] = ${n[t.node]}`,`${r} < ${n[t.node]} is false. Leave the distance, predecessor, and heap unchanged.`,"compare",5,t.edge.id);continue}o("inspect",`${r} < ${n[t.node]??"\u221E"} is true`,"The new route is cheaper. Update the distance, record its predecessor, and enqueue a new heap entry.","compare",4,t.edge.id),n[t.node]=r,o("relax",`dist[${t.node}] = ${r}`,`Replace ${p.previousDistance??"\u221E"} with ${r}. The old heap entry, if any, remains until it is popped and skipped.`,"distance",4,t.edge.id),h[t.node]=e.node,o("relax",`parent[${t.node}] = ${e.node}`,"Remember the preceding node so we can reconstruct the shortest path at the end.","parent",4,t.edge.id),D(t.node,r,t.edge.id)}}let w=[];if(p={current:null,neighbor:null,weight:null,candidate:null,previousDistance:null},u=null,n[i]!==null)for(let e=i;e!==null;e=h[e]){w.push(e);let t=[...w].reverse();p=b(l({},p),{current:e}),o("backtrack",`Trace parent[${e}] = ${h[e]??"none"}`,`Build the route backward from ${i}: ${t.join(" \u2192 ")}.`,"path",6,null,"Reconstruct path",[],t)}return w.reverse(),p=b(l({},p),{current:null}),o("done",n[i]===null?`${i} is unreachable`:`Shortest path to ${i}: ${n[i]}`,n[i]===null?`The heap is empty and no route from ${s} to ${i} was found.`:`${w.join(" \u2192 ")} has total weight ${n[i]}. All queued entries, including stale ones, have been processed.`,"return",6,null,"Complete",[],w),a}var P=[{label:"Small example",nodes:["A","B","C"],edges:[["A","B",4],["A","C",1],["C","B",2]],directed:!0,start:"A",target:"B"},{label:"Larger graph",nodes:["A","B","C","D","E","F"],edges:[["A","B",4],["A","C",2],["B","C",1],["B","D",5],["C","D",8],["C","E",10],["D","E",2],["D","F",6],["E","F",3]],directed:!1,start:"A",target:"F"},{label:"Unreachable",nodes:["A","B","C","D","E","F"],edges:[["A","B",3],["B","C",2],["A","C",7],["D","E",1],["E","F",2]],directed:!1,start:"A",target:"F"}];var z=`
type Graph = Record<string, Array<[string, number]>>;
type Entry = {
  distance: number;
  node: string;
  id: number;
};

function dijkstra(graph: Graph, start: string, target: string) {
  const dist: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
    parent[node] = null;
  }
  const heap = new MinHeap();

  let sequence = 0;
  dist[start] = 0; // @step:initialize
  heap.push({ distance: 0, node: start, id: sequence++ }); // @step:seed

  while (heap.size > 0) {
    const { distance, node } = heap.pop()!; // @step:pop
    if (distance !== dist[node]) {
      continue; // @step:stale
    }
    // Shortest distance to this node is final. // @step:settle

    for (const [next, weight] of graph[node]) { // @step:edge
      const candidate = distance + weight; // @step:candidate
      if (candidate < dist[next]) { // @step:compare
        dist[next] = candidate; // @step:distance
        parent[next] = node; // @step:parent
        heap.push({ distance: candidate, node: next, id: sequence++ }); // @step:push
      }
    }
  }

  const path: string[] = [];
  if (dist[target] !== Infinity) {
    for (let node: string | null = target; node !== null; node = parent[node]) {
      path.push(node); // @step:path
    }
  }
  path.reverse(); // @step:path
  return { dist, path }; // @step:return
}

// Binary min heap: O(log n) push and pop.
// Insertion IDs break ties in the same order as Python's counter.
class MinHeap {
  private items: Entry[] = [];
  get size() {
    return this.items.length;
  }

  private less(firstIndex: number, secondIndex: number) {
    const firstEntry = this.items[firstIndex];
    const secondEntry = this.items[secondIndex];
    return firstEntry.distance < secondEntry.distance ||
      (firstEntry.distance === secondEntry.distance && firstEntry.id < secondEntry.id);
  }

  private swap(firstIndex: number, secondIndex: number) {
    const temporaryEntry = this.items[firstIndex];
    this.items[firstIndex] = this.items[secondIndex];
    this.items[secondIndex] = temporaryEntry;
  }

  push(entry: Entry) {
    this.items.push(entry);
    let index = this.items.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (!this.less(index, parentIndex)) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  pop(): Entry | undefined {
    if (!this.items.length) {
      return undefined;
    }
    const minimum = this.items[0];
    const last = this.items.pop()!;
    if (this.items.length) {
      this.items[0] = last;
    }
    let index = 0;
    while (true) {
      const left = 2 * index + 1;
      const right = left + 1;
      let smallest = index;
      if (left < this.items.length && this.less(left, smallest)) {
        smallest = left;
      }
      if (right < this.items.length && this.less(right, smallest)) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }
      this.swap(index, smallest);
      index = smallest;
    }
    return minimum;
  }
}
`,_=`
from heapq import heappush, heappop
from itertools import count

def dijkstra(graph, start, target):
    dist = {node: float("inf") for node in graph}
    parent = {node: None for node in graph}
    heap = []

    sequence = count()  # insertion order breaks distance ties
    dist[start] = 0  # @step:initialize
    heappush(heap, (0, next(sequence), start))  # @step:seed

    while heap:
        distance, _, node = heappop(heap)  # @step:pop
        if distance != dist[node]:  # stale entry # @step:stale
            continue
        # Shortest distance to this node is final.  # @step:settle

        for neighbor, weight in graph[node]:  # @step:edge
            candidate = distance + weight  # @step:candidate
            if candidate < dist[neighbor]:  # @step:compare
                dist[neighbor] = candidate  # @step:distance
                parent[neighbor] = node  # @step:parent
                heappush(heap, (candidate, next(sequence), neighbor))  # @step:push

    path = []
    if dist[target] != float("inf"):
        node = target
        while node is not None:
            path.append(node)  # @step:path
            node = parent[node]
    path.reverse()  # @step:path
    return {"dist": dist, "path": path}  # @step:return
`,B=`
#nullable enable
using System;
using System.Collections.Generic;

public class Solution {
    public record Edge(string To, double Weight);
    public record Entry(double Distance, string Node);
    public record Result(Dictionary<string, double> Dist, List<string> Path);

    // Requires non-negative edge weights. Insertion IDs break distance ties.
    public static Result dijkstra(Dictionary<string, List<Edge>> graph, string start, string target) {
        var dist = new Dictionary<string, double>();
        var parent = new Dictionary<string, string?>();
        foreach (string node in graph.Keys) {
            dist[node] = double.PositiveInfinity;
            parent[node] = null;
        }
        var heap = new PriorityQueue<Entry, (double Distance, long Sequence)>();

        long sequence = 0;
        dist[start] = 0; // @step:initialize
        heap.Enqueue(new Entry(0, start), (0, sequence++)); // @step:seed
        while (heap.Count > 0) {
            Entry entry = heap.Dequeue(); // @step:pop
            double distance = entry.Distance;
            string node = entry.Node;
            if (distance != dist[node]) { // @step:stale
                continue; // @step:stale
            }
            // Shortest distance to this node is final. // @step:settle
            foreach (Edge edge in graph[node]) { // @step:edge
                string next = edge.To;
                double weight = edge.Weight;
                double candidate = distance + weight; // @step:candidate
                if (candidate < dist[next]) { // @step:compare
                    dist[next] = candidate; // @step:distance
                    parent[next] = node; // @step:parent
                    heap.Enqueue(new Entry(candidate, next), (candidate, sequence++)); // @step:push
                }
            }
        }
        var path = new List<string>();
        if (!double.IsPositiveInfinity(dist[target])) {
            for (string? node = target; node != null; node = parent[node]) {
                path.Add(node); // @step:path
            }
        }
        path.Reverse(); // @step:path
        return new Result(dist, path); // @step:return
    }

}
`,F=`
import java.util.*;

public class Solution {
    public record Edge(String to, double weight) {}
    public record Entry(double distance, String node, long id) {}
    public record Result(Map<String, Double> dist, List<String> path) {}

    // Requires non-negative edge weights. Insertion IDs break distance ties.
    public static Result dijkstra(Map<String, List<Edge>> graph, String start, String target) {
        Map<String, Double> dist = new LinkedHashMap<>();
        Map<String, String> parent = new LinkedHashMap<>();
        for (String node : graph.keySet()) {
            dist.put(node, Double.POSITIVE_INFINITY);
            parent.put(node, null);
        }
        PriorityQueue<Entry> heap = new PriorityQueue<>(
            Comparator.comparingDouble(Entry::distance).thenComparingLong(Entry::id)
        );

        long sequence = 0;
        dist.put(start, 0.0); // @step:initialize
        heap.add(new Entry(0, start, sequence++)); // @step:seed
        while (!heap.isEmpty()) {
            Entry entry = heap.remove(); // @step:pop
            double distance = entry.distance();
            String node = entry.node();
            if (distance != dist.get(node)) { // @step:stale
                continue; // @step:stale
            }
            // Shortest distance to this node is final. // @step:settle
            for (Edge edge : graph.get(node)) { // @step:edge
                String next = edge.to();
                double weight = edge.weight();
                double candidate = distance + weight; // @step:candidate
                if (candidate < dist.get(next)) { // @step:compare
                    dist.put(next, candidate); // @step:distance
                    parent.put(next, node); // @step:parent
                    heap.add(new Entry(candidate, next, sequence++)); // @step:push
                }
            }
        }
        List<String> path = new ArrayList<>();
        if (dist.get(target) != Double.POSITIVE_INFINITY) {
            for (String node = target; node != null; node = parent.get(node)) {
                path.add(node); // @step:path
            }
        }
        Collections.reverse(path); // @step:path
        return new Result(dist, path); // @step:return
    }

}
`,j=[E("typescript",z),E("python",_),E("csharp",B),E("java",F)];var L={algorithm:A,examples:P,implementations:j,makeSteps:q,kind:"dijkstra",articleTitle:"Grow the cheapest known routes.",article:["Dijkstra\u2019s algorithm finds the shortest weighted paths from one start node. It stores a tentative distance for every node: zero for the start and infinity for everything else. At each turn, it settles the unsettled node with the smallest known distance.","From that node, it tries every outgoing edge. If going through the current node makes a cheaper route to a neighbor, the algorithm updates that neighbor\u2019s distance and predecessor. This update is called relaxation.","A priority queue keeps the cheapest queued distance at its front. When a route improves, add a new entry instead of editing the old one. If an old entry is removed later, its stored distance no longer matches the table, so skip it. The visualization expands the binary heap operations; the C# and Java examples use their standard priority queues, while TypeScript includes a small heap helper below the algorithm.","Non-negative weights guarantee that an accepted minimum distance is final. In this dry run, follow the graph, heap tree, heap array, local variables, and highlighted statement together. Choose TypeScript, Python, C#, or Java; predecessor links reconstruct the route to your selected target."],takeaways:["Pop the min heap; skip stale entries","Improve a distance, then push a new entry","Negative weights are not allowed"],practice:[{number:743,title:"Network Delay Time",url:"https://leetcode.com/problems/network-delay-time/",difficulty:"Medium",relevance:"Find shortest routes from the source, then take the largest finite arrival time. Detect unreachable nodes."},{number:1334,title:"Find the City With the Smallest Number of Neighbors at a Threshold Distance",url:"https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",difficulty:"Medium",relevance:"Run Dijkstra from each city and count destinations within the distance threshold."}]};var M=class c{lesson=L;static \u0275fac=function(i){return new(i||c)};static \u0275cmp=$({type:c,selectors:[["app-dijkstra-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(i,a){i&1&&R(0,"app-graph-lesson",0),i&2&&C("lesson",a.lesson)},dependencies:[T],encapsulation:2,changeDetection:0})};export{M as DijkstraPage};
