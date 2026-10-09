import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
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
`;

const PYTHON_SOURCE = `
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
`;

const CSHARP_SOURCE = `
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
`;

const JAVA_SOURCE = `
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
`;

export const DEPTH_FIRST_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
