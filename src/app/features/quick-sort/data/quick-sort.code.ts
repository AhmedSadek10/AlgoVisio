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
  const pivotIndex = partition(values, low, high);
  sortRange(values, low, pivotIndex - 1); // @step:recurse
  sortRange(values, pivotIndex + 1, high); // @step:recurse
}

function partition(values: number[], low: number, high: number): number {
  const pivot = values[high]; // @step:pivot
  let boundary = low;
  for (let index = low; index < high; index++) {
    if (values[index] < pivot) { // @step:compare
      if (index !== boundary) {
        const temporary = values[index]; // @step:swap
        values[index] = values[boundary]; // @step:swap
        values[boundary] = temporary; // @step:swap
      }
      boundary++;
    }
  }
  if (boundary !== high) { // @step:place
    const temporary = values[boundary]; // @step:place
    values[boundary] = values[high]; // @step:place
    values[high] = temporary; // @step:place
  }
  return boundary;
}
`;

const PYTHON_SOURCE = `
def sort_values(values):  # @step:start
    def partition(low, high):
        pivot = values[high]  # @step:pivot
        boundary = low
        for index in range(low, high):
            if values[index] < pivot:  # @step:compare
                if index != boundary:
                    temporary = values[index]  # @step:swap
                    values[index] = values[boundary]  # @step:swap
                    values[boundary] = temporary  # @step:swap
                boundary += 1
        if boundary != high:  # @step:place
            temporary = values[boundary]  # @step:place
            values[boundary] = values[high]  # @step:place
            values[high] = temporary  # @step:place
        return boundary

    def sort_range(low, high):
        if low >= high:  # @step:base
            return
        pivot_index = partition(low, high)
        sort_range(low, pivot_index - 1)  # @step:recurse
        sort_range(pivot_index + 1, high)  # @step:recurse

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
        int pivotIndex = Partition(values, low, high);
        SortRange(values, low, pivotIndex - 1); // @step:recurse
        SortRange(values, pivotIndex + 1, high); // @step:recurse
    }

    static int Partition(double[] values, int low, int high) {
        double pivot = values[high]; // @step:pivot
        int boundary = low;
        for (int index = low; index < high; index++) {
            if (values[index] < pivot) { // @step:compare
                if (index != boundary) {
                    double temporary = values[index]; // @step:swap
                    values[index] = values[boundary]; // @step:swap
                    values[boundary] = temporary; // @step:swap
                }
                boundary++;
            }
        }
        if (boundary != high) { // @step:place
            double temporary = values[boundary]; // @step:place
            values[boundary] = values[high]; // @step:place
            values[high] = temporary; // @step:place
        }
        return boundary;
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
        int pivotIndex = partition(values, low, high);
        sortRange(values, low, pivotIndex - 1); // @step:recurse
        sortRange(values, pivotIndex + 1, high); // @step:recurse
    }

    static int partition(double[] values, int low, int high) {
        double pivot = values[high]; // @step:pivot
        int boundary = low;
        for (int index = low; index < high; index++) {
            if (values[index] < pivot) { // @step:compare
                if (index != boundary) {
                    double temporary = values[index]; // @step:swap
                    values[index] = values[boundary]; // @step:swap
                    values[boundary] = temporary; // @step:swap
                }
                boundary++;
            }
        }
        if (boundary != high) { // @step:place
            double temporary = values[boundary]; // @step:place
            values[boundary] = values[high]; // @step:place
            values[high] = temporary; // @step:place
        }
        return boundary;
    }
}`;

export const QUICK_SORT_CODE: readonly AlgorithmImplementation[] = [
  markedSource('typescript', TYPESCRIPT_SOURCE),
  markedSource('python', PYTHON_SOURCE),
  markedSource('csharp', CSHARP_SOURCE),
  markedSource('java', JAVA_SOURCE),
];
