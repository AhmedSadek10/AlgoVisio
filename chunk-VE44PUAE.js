import{a as h,b as S}from"./chunk-KXQDCAUO.js";function O(i,r,o){return o==="csharp"?`  public static void Main() {
    double[] values = { ${i.join(", ")} };
    Console.WriteLine(search(values, ${r}));
  }`:o==="java"?`  public static void main(String[] args) {
    double[] values = { ${i.join(", ")} };
    System.out.println(search(values, ${r}));
  }`:o==="typescript"?`const values = ${JSON.stringify(i)};
console.log(search(values, ${r}));`:`values = ${JSON.stringify(i)}
print(search(values, ${r}))`}function C(i,r,o,$,e){if(r==="kruskal"||r==="bellman-ford")return N(i,r,o,$,e);let s=r==="dijkstra",a=Object.fromEntries(i.nodes.map(n=>[n,[]]));for(let n of i.edges)a[n.from].push(s?[n.to,n.weight]:n.to),i.directed||a[n.to].push(s?[n.from,n.weight]:n.from);let l=Object.entries(a).map(([n,c])=>"  "+JSON.stringify(n)+": "+JSON.stringify(c)).join(`,
`),p=JSON.stringify(o)+(s?", "+JSON.stringify($):"");if(e==="csharp"||e==="java"){let n=e==="csharp",c=s?"Edge":n?"string":"String",u=Object.entries(a).map(([f,y])=>{let m=y.map(g=>Array.isArray(g)?`new Edge(${JSON.stringify(g[0])}, ${g[1]})`:JSON.stringify(g)).join(", ");return n?`      [${JSON.stringify(f)}] = new List<${c}> { ${m} }`:`    graph.put(${JSON.stringify(f)}, List.of(${m}));`}),d=n?`    var graph = new Dictionary<string, List<${c}>> {
${u.join(`,
`)}
    };`:`    Map<String, List<${c}>> graph = new LinkedHashMap<>();
${u.join(`
`)}`;return`  public static void ${n?"Main()":"main(String[] args)"} {
${d}
    ${n?"var":s?"Result":"List<String>"} result = ${r}(graph, ${p});
${n?s?`    foreach (var pair in result.Dist) {
      Console.WriteLine($"{pair.Key}: {pair.Value}");
    }
    Console.WriteLine("Path: " + string.Join(" -> ", result.Path));`:'    Console.WriteLine("Order: " + string.Join(", ", result));':"    System.out.println(result);"}
  }`}return e==="typescript"?`const graph: Graph = {
${l}
};
console.log(${r}(graph, ${p}));`:`graph = {
${l}
}
print(${r}(graph, ${p}))`}function N(i,r,o,$,e){let s=r==="bellman-ford",a=s?"bellmanFord":"kruskal",l=i.edges.flatMap(t=>s&&!i.directed?[t,S(h({},t),{from:t.to,to:t.from})]:[t]),p="nodes, edges"+(s?`, ${JSON.stringify(o)}, ${JSON.stringify($)}`:"");if(e==="typescript")return`const nodes = ${JSON.stringify(i.nodes)};
const edges: Edge[] = ${JSON.stringify(l.map(({from:t,to:f,weight:y})=>({from:t,to:f,weight:y})),null,2)};
console.log(${a}(${p}));`;if(e==="python")return`nodes = ${JSON.stringify(i.nodes)}
edges = ${JSON.stringify(l.map(t=>[t.from,t.to,t.weight]))}
print(${a}(${p}))`;let n=e==="csharp",c=l.map(t=>`      new Edge(${JSON.stringify(t.from)}, ${JSON.stringify(t.to)}, ${t.weight})`).join(`,
`),u=i.nodes.map(t=>JSON.stringify(t)).join(", "),d=n?`    string[] nodes = { ${u} };
    var edges = new List<Edge> {
${c}
    };`:`    List<String> nodes = List.of(${u});
    List<Edge> edges = List.of(
${c}
    );`;return`  public static void ${n?"Main()":"main(String[] args)"} {
${d}
    ${n?"var":"Result"} result = ${a}(${p});
${n?s?`    Console.WriteLine("Negative cycle: " + result.NegativeCycle);
    if (!result.NegativeCycle) {
      foreach (var pair in result.Dist) {
        Console.WriteLine($"{pair.Key}: {pair.Value}");
      }
      Console.WriteLine("Path: " + string.Join(" -> ", result.Path));
    }`:`    Console.WriteLine($"Weight: {result.Total}; components: {result.Components}");
    foreach (var edge in result.Selected) {
      Console.WriteLine(edge);
    }`:"    System.out.println(result);"}
  }`}export{O as a,C as b};
