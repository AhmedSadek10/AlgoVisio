import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function sortValues(values: number[]): number[] { // @step:start

  for (let unsortedEnd = values.length - 1; unsortedEnd > 0; unsortedEnd--) { // @step:pass
    let swapped = false;
    for (let neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
      if (values[neighborIndex] > values[neighborIndex + 1]) { // @step:compare
        const temporaryValue = values[neighborIndex]; // @step:swap
        values[neighborIndex] = values[neighborIndex + 1]; // @step:swap
        values[neighborIndex + 1] = temporaryValue; // @step:swap
        swapped = true;
      }
    } // @step:passEnd
    if (!swapped) {
      break; // @step:early
    }
  }
  return values; // @step:done
}
`;

const PYTHON_SOURCE = `
def sort_values(values):  # @step:start
    for unsorted_end in range(len(values) - 1, 0, -1):  # @step:pass
        swapped = False
        for neighbor_index in range(unsorted_end):
            if values[neighbor_index] > values[neighbor_index + 1]:  # @step:compare
                temporary_value = values[neighbor_index]  # @step:swap
                values[neighbor_index] = values[neighbor_index + 1]  # @step:swap
                values[neighbor_index + 1] = temporary_value  # @step:swap
                swapped = True
        # The largest remaining value is now final. # @step:passEnd
        if not swapped:  # @step:early
            break
    return values  # @step:done
`;

const CSHARP_SOURCE = `
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start

        for (int unsortedEnd = values.Length - 1; unsortedEnd > 0; unsortedEnd--) { // @step:pass
            bool swapped = false;
            for (int neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
                if (values[neighborIndex] > values[neighborIndex + 1]) { // @step:compare
                    double temporaryValue = values[neighborIndex]; // @step:swap
                    values[neighborIndex] = values[neighborIndex + 1]; // @step:swap
                    values[neighborIndex + 1] = temporaryValue; // @step:swap
                    swapped = true;
                }
            } // @step:passEnd
            if (!swapped) { // @step:early
                break; // @step:early
            }
        }
        return values; // @step:done
    }
}
`;

const JAVA_SOURCE = `
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start

        for (int unsortedEnd = values.length - 1; unsortedEnd > 0; unsortedEnd--) { // @step:pass
            boolean swapped = false;
            for (int neighborIndex = 0; neighborIndex < unsortedEnd; neighborIndex++) {
                if (values[neighborIndex] > values[neighborIndex + 1]) { // @step:compare
                    double temporaryValue = values[neighborIndex]; // @step:swap
                    values[neighborIndex] = values[neighborIndex + 1]; // @step:swap
                    values[neighborIndex + 1] = temporaryValue; // @step:swap
                    swapped = true;
                }
            } // @step:passEnd
            if (!swapped) { // @step:early
                break; // @step:early
            }
        }
        return values; // @step:done
    }
}
`;

export const BUBBLE_SORT_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
