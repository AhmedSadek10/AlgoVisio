import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function sortValues(values: number[]): number[] { // @step:start

  for (let index = 1; index < values.length; index++) {
    const valueToInsert = values[index]; // @step:hold
    let insertionIndex = index - 1;
    while (insertionIndex >= 0 && values[insertionIndex] > valueToInsert) { // @step:compare
      values[insertionIndex + 1] = values[insertionIndex]; // @step:shift
      insertionIndex--;
    }
    values[insertionIndex + 1] = valueToInsert; // @step:insert
  }
  return values; // @step:done
}
`;

const PYTHON_SOURCE = `
def sort_values(values):  # @step:start
    for index in range(1, len(values)):
        value_to_insert = values[index]  # @step:hold
        insertion_index = index - 1
        while insertion_index >= 0 and values[insertion_index] > value_to_insert:  # @step:compare
            values[insertion_index + 1] = values[insertion_index]  # @step:shift
            insertion_index -= 1
        values[insertion_index + 1] = value_to_insert  # @step:insert
    return values  # @step:done
`;

const CSHARP_SOURCE = `
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start

        for (int index = 1; index < values.Length; index++) {
            double valueToInsert = values[index]; // @step:hold
            int insertionIndex = index - 1;
            while (insertionIndex >= 0 && values[insertionIndex] > valueToInsert) { // @step:compare
                values[insertionIndex + 1] = values[insertionIndex]; // @step:shift
                insertionIndex--;
            }
            values[insertionIndex + 1] = valueToInsert; // @step:insert
        }
        return values; // @step:done
    }
}
`;

const JAVA_SOURCE = `
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start

        for (int index = 1; index < values.length; index++) {
            double valueToInsert = values[index]; // @step:hold
            int insertionIndex = index - 1;
            while (insertionIndex >= 0 && values[insertionIndex] > valueToInsert) { // @step:compare
                values[insertionIndex + 1] = values[insertionIndex]; // @step:shift
                insertionIndex--;
            }
            values[insertionIndex + 1] = valueToInsert; // @step:insert
        }
        return values; // @step:done
    }
}
`;

export const INSERTION_SORT_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
