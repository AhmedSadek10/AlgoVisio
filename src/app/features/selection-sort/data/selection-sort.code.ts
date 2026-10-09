import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function sortValues(values: number[]): number[] { // @step:start

  for (let index = 0; index < values.length - 1; index++) {
    let minimumIndex = index; // @step:minimum
    for (let candidateIndex = index + 1; candidateIndex < values.length; candidateIndex++) {
      if (values[candidateIndex] < values[minimumIndex]) { // @step:compare
        minimumIndex = candidateIndex; // @step:update
      }
    }
    if (minimumIndex !== index) {
      const temporaryValue = values[index]; // @step:swap
      values[index] = values[minimumIndex]; // @step:swap
      values[minimumIndex] = temporaryValue; // @step:swap
    } // @step:passEnd
  }
  return values; // @step:done
}
`;

const PYTHON_SOURCE = `
def sort_values(values):  # @step:start
    for index in range(len(values) - 1):
        minimum_index = index  # @step:minimum
        for candidate_index in range(index + 1, len(values)):
            if values[candidate_index] < values[minimum_index]:  # @step:compare
                minimum_index = candidate_index  # @step:update
        if minimum_index != index:
            temporary_value = values[index]  # @step:swap
            values[index] = values[minimum_index]  # @step:swap
            values[minimum_index] = temporary_value  # @step:swap
        # The sorted prefix grows by one. # @step:passEnd
    return values  # @step:done
`;

const CSHARP_SOURCE = `
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start

        for (int index = 0; index < values.Length - 1; index++) {
            int minimumIndex = index; // @step:minimum
            for (int candidateIndex = index + 1; candidateIndex < values.Length; candidateIndex++) {
                if (values[candidateIndex] < values[minimumIndex]) { // @step:compare
                    minimumIndex = candidateIndex; // @step:update
                }
            }
            if (minimumIndex != index) {
                double temporaryValue = values[index]; // @step:swap
                values[index] = values[minimumIndex]; // @step:swap
                values[minimumIndex] = temporaryValue; // @step:swap
            } // @step:passEnd
        }
        return values; // @step:done
    }
}
`;

const JAVA_SOURCE = `
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start

        for (int index = 0; index < values.length - 1; index++) {
            int minimumIndex = index; // @step:minimum
            for (int candidateIndex = index + 1; candidateIndex < values.length; candidateIndex++) {
                if (values[candidateIndex] < values[minimumIndex]) { // @step:compare
                    minimumIndex = candidateIndex; // @step:update
                }
            }
            if (minimumIndex != index) {
                double temporaryValue = values[index]; // @step:swap
                values[index] = values[minimumIndex]; // @step:swap
                values[minimumIndex] = temporaryValue; // @step:swap
            } // @step:passEnd
        }
        return values; // @step:done
    }
}
`;

export const SELECTION_SORT_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
