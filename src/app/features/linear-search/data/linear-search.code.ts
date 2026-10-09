import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function search(values: number[], target: number): number {
  for (let index = 0; index < values.length; index++) { // @step:1
    const value = values[index]; // @step:2
    if (value === target) {
      return index; // @step:3
    }
  } // @step:4
  return -1; // @step:5
}
`;

const PYTHON_SOURCE = `
def search(values, target):
    for index in range(len(values)):  # @step:1
        value = values[index]  # @step:2
        if value == target:  # @step:3
            return index
        continue  # @step:4
    return -1  # @step:5
`;

const CSHARP_SOURCE = `
using System;

public class Solution {
    public static int search(double[] values, double target) {
        for (int index = 0; index < values.Length; index++) { // @step:1
            double value = values[index]; // @step:2
            if (value == target) { // @step:3
                return index; // @step:3
            }
        } // @step:4
        return -1; // @step:5
    }
}
`;

const JAVA_SOURCE = `
public class Solution {
    public static int search(double[] values, double target) {
        for (int index = 0; index < values.length; index++) { // @step:1
            double value = values[index]; // @step:2
            if (value == target) { // @step:3
                return index; // @step:3
            }
        } // @step:4
        return -1; // @step:5
    }
}
`;

export const LINEAR_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
