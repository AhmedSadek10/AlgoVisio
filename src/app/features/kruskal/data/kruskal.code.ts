import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
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
`;

const PYTHON_SOURCE = `
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
`;

const CSHARP_SOURCE = `
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
`;

const JAVA_SOURCE = `
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
`;

export const KRUSKAL_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
