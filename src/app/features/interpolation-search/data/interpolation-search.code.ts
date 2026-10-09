import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function search(values: number[], target: number): number {
  let low = 0;
  let high = values.length - 1; // @step:1
  while (low <= high && target >= values[low] && target <= values[high]) { // @step:2
    const valueRange = values[high] - values[low]; // @step:3
    let position = low; // @step:3
    if (valueRange !== 0) { // @step:3
      const relativeOffset = (target - values[low]) * (high - low); // @step:3
      position += Math.floor(relativeOffset / valueRange); // @step:3
    }
    if (values[position] === target) {
      return position; // @step:4
    }
    if (values[position] < target) {
      low = position + 1; // @step:5
    } else {
      high = position - 1; // @step:6
    }
  } // @step:7
  return -1; // @step:8
}
`;

const PYTHON_SOURCE = `
def search(values, target):
    low = 0  # @step:1
    high = len(values) - 1  # @step:1
    while low <= high and values[low] <= target <= values[high]:  # @step:2
        value_range = values[high] - values[low]  # @step:3
        position = low  # @step:3
        if value_range != 0:  # @step:3
            relative_offset = (target - values[low]) * (high - low)  # @step:3
            position += relative_offset // value_range  # @step:3
        if values[position] == target:  # @step:4
            return position
        if values[position] < target:  # @step:5
            low = position + 1
        else:  # @step:6
            high = position - 1
    return -1  # @step:8
`;

const CSHARP_SOURCE = `
using System;

public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.Length - 1; // @step:1
        while (low <= high && target >= values[low] && target <= values[high]) { // @step:2
            double valueRange = values[high] - values[low]; // @step:3
            int position = low; // @step:3
            if (valueRange != 0) { // @step:3
                double relativeOffset = (target - values[low]) * (high - low); // @step:3
                position += (int)Math.Floor(relativeOffset / valueRange); // @step:3
            }
            if (values[position] == target) { // @step:4
                return position; // @step:4
            }
            if (values[position] < target) { // @step:5
                low = position + 1; // @step:5
            }
            else { // @step:6
                high = position - 1; // @step:6
            }
        } // @step:7
        return -1; // @step:8
    }
}
`;

const JAVA_SOURCE = `
public class Solution {
    public static int search(double[] values, double target) {
        int low = 0; // @step:1
        int high = values.length - 1; // @step:1
        while (low <= high && target >= values[low] && target <= values[high]) { // @step:2
            double valueRange = values[high] - values[low]; // @step:3
            int position = low; // @step:3
            if (valueRange != 0) { // @step:3
                double relativeOffset = (target - values[low]) * (high - low); // @step:3
                position += (int)Math.floor(relativeOffset / valueRange); // @step:3
            }
            if (values[position] == target) { // @step:4
                return position; // @step:4
            }
            if (values[position] < target) { // @step:5
                low = position + 1; // @step:5
            }
            else { // @step:6
                high = position - 1; // @step:6
            }
        } // @step:7
        return -1; // @step:8
    }
}
`;

export const INTERPOLATION_SEARCH_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
