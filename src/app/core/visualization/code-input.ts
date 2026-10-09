import { GraphData, GraphLessonConfig } from '../graph-lesson';
import { CodeLanguage } from './algorithm-code';

export function searchCodeInput(
  values: readonly number[],
  target: number,
  language: CodeLanguage,
): string {
  if (language === 'csharp') {
    return `  public static void Main() {
    double[] values = { ${values.join(', ')} };
    Console.WriteLine(search(values, ${target}));
  }`;
  }
  if (language === 'java') {
    return `  public static void main(String[] args) {
    double[] values = { ${values.join(', ')} };
    System.out.println(search(values, ${target}));
  }`;
  }
  return language === 'typescript'
    ? `const values = ${JSON.stringify(values)};
console.log(search(values, ${target}));`
    : `values = ${JSON.stringify(values)}
print(search(values, ${target}))`;
}
export function graphCodeInput(
  graph: GraphData,
  algorithm: GraphLessonConfig['kind'],
  start: string,
  target: string,
  language: CodeLanguage,
): string {
  if (algorithm === 'kruskal' || algorithm === 'bellman-ford') {
    return edgeListCodeInput(graph, algorithm, start, target, language);
  }
  const weighted = algorithm === 'dijkstra';
  const adjacency: Record<string, (string | [string, number])[]> = Object.fromEntries(
    graph.nodes.map((node) => [node, []]),
  );
  for (const edge of graph.edges) {
    adjacency[edge.from].push(weighted ? [edge.to, edge.weight] : edge.to);
    if (!graph.directed) {
      adjacency[edge.to].push(weighted ? [edge.from, edge.weight] : edge.from);
    }
  }
  const rows = Object.entries(adjacency)
    .map(([node, edges]) => '  ' + JSON.stringify(node) + ': ' + JSON.stringify(edges))
    .join(',\n');
  const args = JSON.stringify(start) + (weighted ? ', ' + JSON.stringify(target) : '');
  if (language === 'csharp' || language === 'java') {
    const csharp = language === 'csharp';
    const edgeType = weighted ? 'Edge' : csharp ? 'string' : 'String';
    const entries = Object.entries(adjacency).map(([node, edges]) => {
      const items = edges
        .map((edge) =>
          Array.isArray(edge)
            ? `new Edge(${JSON.stringify(edge[0])}, ${edge[1]})`
            : JSON.stringify(edge),
        )
        .join(', ');
      return csharp
        ? `      [${JSON.stringify(node)}] = new List<${edgeType}> { ${items} }`
        : `    graph.put(${JSON.stringify(node)}, List.of(${items}));`;
    });
    const graphCode = csharp
      ? `    var graph = new Dictionary<string, List<${edgeType}>> {
${entries.join(',\n')}
    };`
      : `    Map<String, List<${edgeType}>> graph = new LinkedHashMap<>();
${entries.join('\n')}`;
    const print = csharp
      ? weighted
        ? `    foreach (var pair in result.Dist) {
      Console.WriteLine($"{pair.Key}: {pair.Value}");
    }
    Console.WriteLine("Path: " + string.Join(" -> ", result.Path));`
        : `    Console.WriteLine("Order: " + string.Join(", ", result));`
      : '    System.out.println(result);';
    const resultType = csharp ? 'var' : weighted ? 'Result' : 'List<String>';
    return `  public static void ${csharp ? 'Main()' : 'main(String[] args)'} {
${graphCode}
    ${resultType} result = ${algorithm}(graph, ${args});
${print}
  }`;
  }
  return language === 'typescript'
    ? `const graph: Graph = {
${rows}
};
console.log(${algorithm}(graph, ${args}));`
    : `graph = {
${rows}
}
print(${algorithm}(graph, ${args}))`;
}

function edgeListCodeInput(
  graph: GraphData,
  algorithm: 'kruskal' | 'bellman-ford',
  start: string,
  target: string,
  language: CodeLanguage,
): string {
  const bellman = algorithm === 'bellman-ford';
  const functionName = bellman ? 'bellmanFord' : 'kruskal';
  const edges = graph.edges.flatMap((edge) =>
    bellman && !graph.directed ? [edge, { ...edge, from: edge.to, to: edge.from }] : [edge],
  );
  const args =
    'nodes, edges' + (bellman ? `, ${JSON.stringify(start)}, ${JSON.stringify(target)}` : '');
  if (language === 'typescript') {
    return `const nodes = ${JSON.stringify(graph.nodes)};
const edges: Edge[] = ${JSON.stringify(
      edges.map(({ from, to, weight }) => ({ from, to, weight })),
      null,
      2,
    )};
console.log(${functionName}(${args}));`;
  }
  if (language === 'python') {
    return `nodes = ${JSON.stringify(graph.nodes)}
edges = ${JSON.stringify(edges.map((edge) => [edge.from, edge.to, edge.weight]))}
print(${functionName}(${args}))`;
  }
  const csharp = language === 'csharp';
  const rows = edges
    .map(
      (edge) =>
        `      new Edge(${JSON.stringify(edge.from)}, ${JSON.stringify(edge.to)}, ${edge.weight})`,
    )
    .join(',\n');
  const nodes = graph.nodes.map((node) => JSON.stringify(node)).join(', ');
  const declarations = csharp
    ? `    string[] nodes = { ${nodes} };
    var edges = new List<Edge> {
${rows}
    };`
    : `    List<String> nodes = List.of(${nodes});
    List<Edge> edges = List.of(
${rows}
    );`;
  const print = csharp
    ? bellman
      ? `    Console.WriteLine("Negative cycle: " + result.NegativeCycle);
    if (!result.NegativeCycle) {
      foreach (var pair in result.Dist) {
        Console.WriteLine($"{pair.Key}: {pair.Value}");
      }
      Console.WriteLine("Path: " + string.Join(" -> ", result.Path));
    }`
      : `    Console.WriteLine($"Weight: {result.Total}; components: {result.Components}");
    foreach (var edge in result.Selected) {
      Console.WriteLine(edge);
    }`
    : '    System.out.println(result);';
  return `  public static void ${csharp ? 'Main()' : 'main(String[] args)'} {
${declarations}
    ${csharp ? 'var' : 'Result'} result = ${functionName}(${args});
${print}
  }`;
}
