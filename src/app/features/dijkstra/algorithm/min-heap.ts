import { HeapEntry } from '../../../core/graph-lesson';

export interface HeapMutation {
  readonly operation: 'push' | 'pop' | 'sift-up' | 'sift-down';
  readonly activeEntryIds: readonly number[];
}

/** A binary min heap. Equal priorities are processed in insertion order. */
export class MinHeap {
  private readonly items: HeapEntry[] = [];

  get size(): number {
    return this.items.length;
  }

  peek(): HeapEntry | undefined {
    return this.items[0];
  }

  snapshot(): HeapEntry[] {
    return this.items.map((entry) => ({ ...entry }));
  }

  push(entry: HeapEntry, onMutation: (mutation: HeapMutation) => void): void {
    this.items.push(entry);
    onMutation({ operation: 'push', activeEntryIds: [entry.id] });
    let index = this.items.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (!this.less(index, parent)) {
        break;
      }
      const activeEntryIds = [this.items[index].id, this.items[parent].id];
      this.swap(index, parent);
      onMutation({ operation: 'sift-up', activeEntryIds });
      index = parent;
    }
  }

  pop(onMutation: (mutation: HeapMutation) => void): HeapEntry | undefined {
    const minimum = this.items[0];
    if (!minimum) {
      return undefined;
    }
    const last = this.items.pop()!;
    if (this.items.length) {
      this.items[0] = last;
    }
    onMutation({ operation: 'pop', activeEntryIds: this.items.length ? [last.id] : [] });
    let index = 0;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;
      if (left < this.items.length && this.less(left, smallest)) {
        smallest = left;
      }
      if (right < this.items.length && this.less(right, smallest)) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }
      const activeEntryIds = [this.items[index].id, this.items[smallest].id];
      this.swap(index, smallest);
      onMutation({ operation: 'sift-down', activeEntryIds });
      index = smallest;
    }
    return minimum;
  }

  private less(a: number, b: number): boolean {
    const left = this.items[a];
    const right = this.items[b];
    return (
      left.distance < right.distance || (left.distance === right.distance && left.id < right.id)
    );
  }

  private swap(a: number, b: number): void {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }
}
