import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function search(values: number[], target: number): number {
  const jump = Math.max(1, Math.floor(Math.sqrt(values.length))); // @step:1
  let start = 0; // @step:2
  while (start < values.length && values[Math.min(start + jump, values.length) - 1] < target) {
    start += jump; // @step:2
  }
  const end = Math.min(start + jump, values.length); // @step:3
  for (let index = start; index < end; index++) { // @step:4
    if (values[index] === target) {
      return index; // @step:5
    }
  } // @step:5
  return -1; // @step:6
}
`;

const PYTHON_SOURCE = `
def search(values, target):
    jump = max(1, int(len(values) ** 0.5))  # @step:1
    start = 0  # @step:1
    length = len(values)  # @step:1
    while start < length and values[min(start + jump, length) - 1] < target:  # @step:2
        start += jump
    end = min(start + jump, length)  # @step:3
    for index in range(start, end):  # @step:4
        if values[index] == target:  # @step:5
            return index
    return -1  # @step:6
`;

const CSHARP_SOURCE = `
using System;

public class Solution {
    public static int search(double[] values, double target) {
        int jump = Math.Max(1, (int)Math.Sqrt(values.Length)); // @step:1
        int start = 0; // @step:2
        while (start < values.Length && values[Math.Min(start + jump, values.Length) - 1] < target) { // @step:2
            start += jump; // @step:2
        }
        int end = Math.Min(start + jump, values.Length); // @step:3
        for (int index = start; index < end; index++) { // @step:4
            if (values[index] == target) { // @step:5
                return index; // @step:5
            }
        }
        return -1; // @step:6
    }
}
`;

const JAVA_SOURCE = `
public class Solution {
    public static int search(double[] values, double target) {
        int jump = Math.max(1, (int)Math.sqrt(values.length)); // @step:1
        int start = 0; // @step:2
        while (start < values.length && values[Math.min(start + jump, values.length) - 1] < target) { // @step:2
            start += jump; // @step:2
        }
        int end = Math.min(start + jump, values.length); // @step:3
        for (int index = start; index < end; index++) { // @step:4
            if (values[index] == target) { // @step:5
                return index; // @step:5
            }
        }
        return -1; // @step:6
    }
}
`;

export const JUMP_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
