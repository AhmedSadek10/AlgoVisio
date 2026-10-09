import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SequenceSnapshot } from '../../../core/visualization/structure-snapshot';
@Component({
  selector: 'app-sequence-visualizer',
  templateUrl: './sequence-visualizer.html',
  styleUrl: './sequence-visualizer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SequenceVisualizer {
  readonly compact = input(false);
  readonly snapshot = input.required<SequenceSnapshot>();
  readonly displayed = computed(() =>
    this.snapshot().kind === 'stack' ? [...this.snapshot().items].reverse() : this.snapshot().items,
  );
  readonly rule = computed(
    () =>
      ({
        array: 'Indexed values',
        stack: 'LIFO · last in, first out',
        queue: 'FIFO · first in, first out',
        deque: 'Insert or remove at either end',
        'linked-list': 'Follow the next link',
        set: 'Unique discovered values',
      })[this.snapshot().kind],
  );
}
