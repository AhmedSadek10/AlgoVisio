import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function search(values: number[], target: number): number {
  let low = 0;
  let high = values.length - 1; // @step:1
  while (low <= high) { // @step:2
    const middle = low + Math.floor((high - low) / 2); // @step:3
    if (values[middle] === target) {
      return middle; // @step:5
    }
    if (values[middle] < target) {
      low = middle + 1; // @step:7
    } else {
      high = middle - 1; // @step:8
    }
  } // @step:9
  return -1; // @step:11
}
`;

const PYTHON_SOURCE = `
def search(values, target):
    low = 0  # @step:1
    high = len(values) - 1  # @step:1
    while low <= high:  # @step:2
        middle = low + (high - low) // 2  # @step:3
        if values[middle] == target:  # @step:5
            return middle
        if values[middle] < target:  # @step:7
            low = middle + 1
        else:  # @step:8
            high = middle - 1
    return -1  # @step:11
`;

const CSHARP_SOURCE = `
using System;

public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.Length - 1; // @step:1
        while (low <= high) { // @step:2
            int middle = low + (high - low) / 2; // @step:3
            if (values[middle] == target) { // @step:5
                return middle; // @step:5
            } // @step:6
            if (values[middle] < target) { // @step:7
                low = middle + 1; // @step:7
            }
            else { // @step:8
                high = middle - 1; // @step:8
            }
        } // @step:9
        return -1; // @step:11
    }
}
`;

const JAVA_SOURCE = `
public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.length - 1; // @step:1
        while (low <= high) { // @step:2
            int middle = low + (high - low) / 2; // @step:3
            if (values[middle] == target) { // @step:5
                return middle; // @step:5
            } // @step:6
            if (values[middle] < target) { // @step:7
                low = middle + 1; // @step:7
            }
            else { // @step:8
                high = middle - 1; // @step:8
            }
        } // @step:9
        return -1; // @step:11
    }
}
`;

export const BINARY_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
