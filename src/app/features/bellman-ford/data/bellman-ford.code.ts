import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
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
`;

const PYTHON_SOURCE = `
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
`;

const CSHARP_SOURCE = `
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
`;

const JAVA_SOURCE = `
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
`;

export const BELLMAN_FORD_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
