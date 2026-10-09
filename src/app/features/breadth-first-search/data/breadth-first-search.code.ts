import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
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
`;

const PYTHON_SOURCE = `
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
`;

const CSHARP_SOURCE = `
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
`;

const JAVA_SOURCE = `
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
`;

export const BREADTH_FIRST_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
