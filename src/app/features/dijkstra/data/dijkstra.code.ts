import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
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
`;

const PYTHON_SOURCE = `
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
`;

const CSHARP_SOURCE = `
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
`;

const JAVA_SOURCE = `
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
`;

export const DIJKSTRA_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
