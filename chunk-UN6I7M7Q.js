import{a as E}from"./chunk-VY7RCZMB.js";import"./chunk-VE44PUAE.js";import"./chunk-V3PMXN6M.js";import{l as p}from"./chunk-BRHD6JZM.js";import{m as A}from"./chunk-34NHZ6JB.js";import{Fa as S,Ua as b,Xa as k,a as c,b as y}from"./chunk-KXQDCAUO.js";function v(i){let l=[],o=Object.fromEntries(i.nodes.map(e=>[e,e])),r=Object.fromEntries(i.nodes.map(e=>[e,1])),R=i.edges.map((e,a)=>y(c({},e),{index:a})).sort((e,a)=>e.weight-a.weight||e.index-a.index),g=[],u={},m=0,d=i.nodes.length,h=null,f=null,t="\u2014",n="\u2014",w=e=>{for(;o[e]!==e;)e=o[e];return e},s=(e,a,K,M,$)=>{l.push({phase:a,title:K,explanation:M,codeLine:Number(e),current:h,edgeId:f,frontier:[],visited:[],order:[],distances:c({},r),parents:c({},o),trace:{codeKey:e,variables:[{name:"root(u)",value:t},{name:"root(v)",value:n},{name:"components",value:d},{name:"edges chosen",value:g.length},{name:"total weight",value:m}],components:c({},o),edgeOrder:R.map(O=>O.id),edgeStates:c({},u),acceptedEdges:[...g],summary:$}})};s("1","ready","One component per node","Each node starts as its own disjoint set. We will connect components without creating cycles."),s("2","inspect","Sort edges by weight","Process the lightest edges first. Equal weights keep their input order.");for(let e of R){if(h=e.from,f=e.id,u[e.id]="active",s("3","inspect",`Inspect ${e.from} \u2014 ${e.to} (${e.weight})`,"Try the next edge in the sorted list. Amber marks the edge being considered."),t=w(e.from),n=w(e.to),s("4","inspect",`Find roots: ${t} and ${n}`,"Follow parent links in the disjoint-set forest. Nodes with the same root are already connected."),t===n){u[e.id]="discarded",s("5","skip","Reject: this edge creates a cycle",`${e.from} and ${e.to} already belong to component ${t}. Adding this edge cannot connect a new component.`);continue}r[t]<r[n]&&([t,n]=[n,t]),o[n]=t,r[t]+=r[n],d--,s("6","discover",`Union ${n} into ${t}`,"Attach the smaller component to the larger one. The forest and component table now show their shared root."),g.push(e.id),m+=e.weight,u[e.id]="found",s("7","relax",`Accept edge \xB7 total ${m}`,"Teal edges form the growing minimum spanning forest. We keep scanning so you can see why later cycle edges are rejected.")}h=null,f=null;let D=`${d<=1?"Minimum spanning tree":"Minimum spanning forest"} \xB7 weight ${m} \xB7 ${g.length} edges \xB7 ${d} component${d===1?"":"s"}`;return s("8","done","Finished building the minimum spanning forest",d>1?"This graph is disconnected, so no single spanning tree exists. Kruskal finds a minimum spanning tree within each connected component.":"Every node is connected with no cycles. A connected graph with V nodes needs V \u2212 1 selected edges.",D),l}var C=[{label:"Small example",nodes:["A","B","C","D"],edges:[["A","B",1],["B","C",2],["A","C",3],["C","D",4],["B","D",5]],directed:!1,start:"A"},{label:"Disconnected",nodes:["A","B","C","D"],edges:[["A","B",2],["C","D",1]],directed:!1,start:"A"},{label:"Negative weights",nodes:["A","B","C"],edges:[["A","B",-2],["B","C",1],["A","C",4]],directed:!1,start:"A"}];var x=`
type Edge = {
  from: string;
  to: string;
  weight: number;
};

function kruskal(nodes: string[], edges: Edge[]) {
  const parent: Record<string, string> = {}; // @step:1
  const size: Record<string, number> = {};
  for (const node of nodes) {
    parent[node] = node;
    size[node] = 1;
  }
  const selected: Edge[] = [];
  let total = 0;
  let components = nodes.length;
  function find(node: string): string {
    while (parent[node] !== node) {
      node = parent[node];
    }
    return node;
  }
  const sorted = [...edges].sort((first, second) => first.weight - second.weight); // @step:2
  for (const edge of sorted) { // @step:3
    let sourceRoot = find(edge.from);
    let destinationRoot = find(edge.to); // @step:4
    if (sourceRoot === destinationRoot) {
      continue; // @step:5
    }
    if (size[sourceRoot] < size[destinationRoot]) {
      [sourceRoot, destinationRoot] = [destinationRoot, sourceRoot];
    }
    parent[destinationRoot] = sourceRoot; // @step:6
    size[sourceRoot] += size[destinationRoot]; // @step:6
    components--; // @step:6
    selected.push(edge); // @step:7
    total += edge.weight; // @step:7
  }
  return { selected, total, components }; // @step:8
}
`,T=`
def kruskal(nodes, edges):
    parent = {node: node for node in nodes}  # @step:1
    size = {node: 1 for node in nodes}
    selected = []
    total = 0
    components = len(nodes)
    def find(node):
        while parent[node] != node:
            node = parent[node]
        return node
    sorted_edges = sorted(edges, key=lambda edge: edge[2])  # @step:2
    for source, destination, weight in sorted_edges:  # @step:3
        source_root = find(source)  # @step:4
        destination_root = find(destination)  # @step:4
        if source_root == destination_root:  # @step:5
            continue
        if size[source_root] < size[destination_root]:
            source_root, destination_root = destination_root, source_root
        parent[destination_root] = source_root  # @step:6
        size[source_root] += size[destination_root]  # @step:6
        components -= 1  # @step:6
        selected.append((source, destination, weight))  # @step:7
        total += weight  # @step:7
    return {"selected": selected, "total": total, "components": components}  # @step:8
`,U=`
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public record Edge(string From, string To, double Weight);
    public record Result(List<Edge> Selected, double Total, int Components);

    public static Result kruskal(string[] nodes, List<Edge> edges) {
        var parent = new Dictionary<string, string>(); // @step:1
        var size = new Dictionary<string, int>();
        foreach (string node in nodes) {
            parent[node] = node;
            size[node] = 1;
        }
        var selected = new List<Edge>();
        double total = 0;
        int components = nodes.Length;
        string Find(string node) {
            while (parent[node] != node) {
                node = parent[node];
            }
            return node;
        }
        var sorted = edges.OrderBy(edge => edge.Weight); // @step:2
        foreach (Edge edge in sorted) { // @step:3
            string sourceRoot = Find(edge.From); // @step:4
            string destinationRoot = Find(edge.To); // @step:4
            if (sourceRoot == destinationRoot) { // @step:5
                continue; // @step:5
            }
            if (size[sourceRoot] < size[destinationRoot]) {
                (sourceRoot, destinationRoot) = (destinationRoot, sourceRoot);
            }
            parent[destinationRoot] = sourceRoot; // @step:6
            size[sourceRoot] += size[destinationRoot]; // @step:6
            components--; // @step:6
            selected.Add(edge); // @step:7
            total += edge.Weight; // @step:7
        }
        return new Result(selected, total, components); // @step:8
    }
}
`,j=`
import java.util.*;

public class Solution {
    public record Edge(String from, String to, double weight) {}
    public record Result(List<Edge> selected, double total, int components) {}

    private static String find(Map<String, String> parent, String node) {
        while (!parent.get(node).equals(node)) {
            node = parent.get(node);
        }
        return node;
    }
    public static Result kruskal(List<String> nodes, List<Edge> edges) {
        Map<String, String> parent = new LinkedHashMap<>(); // @step:1
        Map<String, Integer> size = new HashMap<>();
        for (String node : nodes) {
            parent.put(node, node);
            size.put(node, 1);
        }
        List<Edge> selected = new ArrayList<>();
        double total = 0;
        int components = nodes.size();
        List<Edge> sorted = new ArrayList<>(edges);
        sorted.sort(Comparator.comparingDouble(Edge::weight)); // @step:2
        for (Edge edge : sorted) { // @step:3
            String sourceRoot = find(parent, edge.from()); // @step:4
            String destinationRoot = find(parent, edge.to()); // @step:4
            if (sourceRoot.equals(destinationRoot)) { // @step:5
                continue; // @step:5
            }
            if (size.get(sourceRoot) < size.get(destinationRoot)) {
                String temporaryRoot = sourceRoot;
                sourceRoot = destinationRoot;
                destinationRoot = temporaryRoot;
            }
            parent.put(destinationRoot, sourceRoot); // @step:6
            size.put(sourceRoot, size.get(sourceRoot) + size.get(destinationRoot)); // @step:6
            components--; // @step:6
            selected.add(edge); // @step:7
            total += edge.weight(); // @step:7
        }
        return new Result(selected, total, components); // @step:8
    }
}
`,L=[p("typescript",x),p("python",T),p("csharp",U),p("java",j)];var z={algorithm:A,examples:C,implementations:L,makeSteps:v,kind:"kruskal",articleTitle:"Connect every node at the smallest total cost.",article:["A minimum spanning tree connects every node of an undirected graph with no cycles and the smallest possible sum of edge weights. It solves a network-building problem: which connections should we pay for? It does not compute shortest routes from a start node.","Kruskal sorts all edges from lightest to heaviest. For each edge, it checks whether its endpoints already belong to the same connected component. Different components can be joined safely; an edge inside one component would create a cycle and is rejected.","A disjoint-set union structure stores one parent link per node. Follow those links to find a component root. Union attaches the smaller component to the larger one, keeping the forest shallow. This version uses union by size without path compression so every parent link stays easy to follow in the dry run.","Watch the sorted edge list, amber candidate edge, teal selected edges, and disjoint-set forest together. A connected graph finishes with V \u2212 1 selected edges. A disconnected graph produces a minimum spanning forest, with one tree per connected component. Negative weights are allowed, and equal weights keep their input order."],takeaways:["Sort by weight, then compare component roots","Same root means a cycle: reject the edge","Different roots: union and add the edge weight"],practice:[{number:1584,title:"Min Cost to Connect All Points",url:"https://leetcode.com/problems/min-cost-to-connect-all-points/",difficulty:"Medium",relevance:"Build edges weighted by Manhattan distance, then use Kruskal to construct a minimum spanning tree."},{number:684,title:"Redundant Connection",url:"https://leetcode.com/problems/redundant-connection/",difficulty:"Medium",relevance:"Practice the union-find cycle check used by Kruskal; find the edge whose endpoints are already connected."}]};var _=class i{lesson=z;static \u0275fac=function(o){return new(o||i)};static \u0275cmp=S({type:i,selectors:[["app-kruskal-page"]],decls:1,vars:1,consts:[[3,"lesson"]],template:function(o,r){o&1&&k(0,"app-graph-lesson",0),o&2&&b("lesson",r.lesson)},dependencies:[E],encapsulation:2,changeDetection:0})};export{_ as KruskalPage};
