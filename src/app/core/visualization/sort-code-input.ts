import type { CodeLanguage } from './algorithm-code';

export function sortCodeInput(input: readonly number[], language: CodeLanguage): string {
  const values = input.join(', ');
  switch (language) {
    case 'typescript':
      return `const values = [${values}];
console.log(sortValues(values));`;
    case 'python':
      return `values = [${values}]
print(sort_values(values))`;
    case 'csharp':
      return `  static void Main() {
    double[] values = { ${values} };
    Console.WriteLine(string.Join(", ", SortValues(values)));
  }`;
    case 'java':
      return `  public static void main(String[] args) {
    double[] values = { ${values} };
    System.out.println(Arrays.toString(sortValues(values)));
  }`;
  }
}
