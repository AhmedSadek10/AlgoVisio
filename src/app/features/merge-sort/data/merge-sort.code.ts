import type { AlgorithmImplementation } from '../../../core/visualization/algorithm-code';
import { markedSource } from '../../../core/visualization/algorithm-source';

const TYPESCRIPT_SOURCE = `
function sortValues(values: number[]): number[] { // @step:start
  sortRange(values, 0, values.length - 1);
  return values; // @step:done
}

function sortRange(values: number[], low: number, high: number): void {
  if (low >= high) { // @step:base
    return;
  }
  const middle = low + Math.floor((high - low) / 2); // @step:split
  sortRange(values, low, middle); // @step:split
  sortRange(values, middle + 1, high); // @step:split
  merge(values, low, middle, high);
  // The whole range is now ordered. // @step:merged
}

function merge(values: number[], low: number, middle: number, high: number): void {
  const left = values.slice(low, middle + 1); // @step:buffers
  const right = values.slice(middle + 1, high + 1); // @step:buffers
  let leftIndex = 0;
  let rightIndex = 0;
  let writeIndex = low;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) { // @step:compare
      values[writeIndex] = left[leftIndex]; // @step:writeLeft
      leftIndex++; // @step:writeLeft
    } else {
      values[writeIndex] = right[rightIndex]; // @step:writeRight
      rightIndex++; // @step:writeRight
    }
    writeIndex++;
  }
  while (leftIndex < left.length) {
    values[writeIndex] = left[leftIndex]; // @step:remainderLeft
    leftIndex++; // @step:remainderLeft
    writeIndex++; // @step:remainderLeft
  }
  while (rightIndex < right.length) {
    values[writeIndex] = right[rightIndex]; // @step:remainderRight
    rightIndex++; // @step:remainderRight
    writeIndex++; // @step:remainderRight
  }
}
`;

const PYTHON_SOURCE = `
def sort_values(values):  # @step:start
    def merge(low, middle, high):
        left = values[low:middle + 1]  # @step:buffers
        right = values[middle + 1:high + 1]  # @step:buffers
        left_index = 0
        right_index = 0
        write_index = low

        while left_index < len(left) and right_index < len(right):
            if left[left_index] <= right[right_index]:  # @step:compare
                values[write_index] = left[left_index]  # @step:writeLeft
                left_index += 1  # @step:writeLeft
            else:
                values[write_index] = right[right_index]  # @step:writeRight
                right_index += 1  # @step:writeRight
            write_index += 1
        while left_index < len(left):
            values[write_index] = left[left_index]  # @step:remainderLeft
            left_index += 1  # @step:remainderLeft
            write_index += 1  # @step:remainderLeft
        while right_index < len(right):
            values[write_index] = right[right_index]  # @step:remainderRight
            right_index += 1  # @step:remainderRight
            write_index += 1  # @step:remainderRight

    def sort_range(low, high):
        if low >= high:  # @step:base
            return
        middle = low + (high - low) // 2  # @step:split
        sort_range(low, middle)  # @step:split
        sort_range(middle + 1, high)  # @step:split
        merge(low, middle, high)
        # The whole range is now ordered.  # @step:merged

    sort_range(0, len(values) - 1)
    return values  # @step:done
`;

const CSHARP_SOURCE = `
using System;
class Solution {
    static double[] SortValues(double[] values) { // @step:start
        SortRange(values, 0, values.Length - 1);
        return values; // @step:done
    }

    static void SortRange(double[] values, int low, int high) {
        if (low >= high) { // @step:base
            return;
        }
        int middle = low + (high - low) / 2; // @step:split
        SortRange(values, low, middle); // @step:split
        SortRange(values, middle + 1, high); // @step:split
        Merge(values, low, middle, high);
        // The whole range is now ordered. // @step:merged
    }

    static void Merge(double[] values, int low, int middle, int high) {
        double[] left = values[low..(middle + 1)]; // @step:buffers
        double[] right = values[(middle + 1)..(high + 1)]; // @step:buffers
        int leftIndex = 0;
        int rightIndex = 0;
        int writeIndex = low;

        while (leftIndex < left.Length && rightIndex < right.Length) {
            if (left[leftIndex] <= right[rightIndex]) { // @step:compare
                values[writeIndex] = left[leftIndex]; // @step:writeLeft
                leftIndex++; // @step:writeLeft
            } else {
                values[writeIndex] = right[rightIndex]; // @step:writeRight
                rightIndex++; // @step:writeRight
            }
            writeIndex++;
        }
        while (leftIndex < left.Length) {
            values[writeIndex] = left[leftIndex]; // @step:remainderLeft
            leftIndex++; // @step:remainderLeft
            writeIndex++; // @step:remainderLeft
        }
        while (rightIndex < right.Length) {
            values[writeIndex] = right[rightIndex]; // @step:remainderRight
            rightIndex++; // @step:remainderRight
            writeIndex++; // @step:remainderRight
        }
    }
}`;

const JAVA_SOURCE = `
import java.util.*;
public class Solution {
    static double[] sortValues(double[] values) { // @step:start
        sortRange(values, 0, values.length - 1);
        return values; // @step:done
    }

    static void sortRange(double[] values, int low, int high) {
        if (low >= high) { // @step:base
            return;
        }
        int middle = low + (high - low) / 2; // @step:split
        sortRange(values, low, middle); // @step:split
        sortRange(values, middle + 1, high); // @step:split
        merge(values, low, middle, high);
        // The whole range is now ordered. // @step:merged
    }

    static void merge(double[] values, int low, int middle, int high) {
        double[] left = Arrays.copyOfRange(values, low, middle + 1); // @step:buffers
        double[] right = Arrays.copyOfRange(values, middle + 1, high + 1); // @step:buffers
        int leftIndex = 0;
        int rightIndex = 0;
        int writeIndex = low;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) { // @step:compare
                values[writeIndex] = left[leftIndex]; // @step:writeLeft
                leftIndex++; // @step:writeLeft
            } else {
                values[writeIndex] = right[rightIndex]; // @step:writeRight
                rightIndex++; // @step:writeRight
            }
            writeIndex++;
        }
        while (leftIndex < left.length) {
            values[writeIndex] = left[leftIndex]; // @step:remainderLeft
            leftIndex++; // @step:remainderLeft
            writeIndex++; // @step:remainderLeft
        }
        while (rightIndex < right.length) {
            values[writeIndex] = right[rightIndex]; // @step:remainderRight
            rightIndex++; // @step:remainderRight
            writeIndex++; // @step:remainderRight
        }
    }
}`;

export const MERGE_SORT_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
