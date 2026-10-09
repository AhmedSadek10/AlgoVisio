import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HeapSnapshot, TreeSnapshot } from '../../../core/visualization/structure-snapshot';
import { TreeVisualizer } from '../tree-visualizer/tree-visualizer';
import { ArrayVisualizer } from '../array-visualizer/array-visualizer';
@Component({
  selector: 'app-heap-visualizer',
  imports: [TreeVisualizer, ArrayVisualizer],
  templateUrl: './heap-visualizer.html',
  styleUrl: './heap-visualizer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeapVisualizer {
  readonly snapshot = input.required<HeapSnapshot>();
  readonly tree = computed<TreeSnapshot>(() => ({
    kind: 'tree',
    nodes: this.snapshot().items.map((item, index) => ({
      ...item,
      parentId: index === 0 ? null : this.snapshot().items[Math.floor((index - 1) / 2)].id,
      marker: index === 0 ? '0 · ROOT' : String(index),
    })),
  }));
  readonly array = computed(() =>
    this.snapshot().items.map((item) => ({
      ...item,
      label: item.detail ? item.detail + ', ' + item.label : item.label,
      detail: undefined,
      marker: undefined,
    })),
  );
}
