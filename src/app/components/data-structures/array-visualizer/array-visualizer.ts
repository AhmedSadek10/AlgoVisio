import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { VisualItem, SequenceSnapshot } from '../../../core/visualization/structure-snapshot';
import { SequenceVisualizer } from '../sequence-visualizer/sequence-visualizer';
@Component({
  selector: 'app-array-visualizer',
  imports: [SequenceVisualizer],
  template: '<app-sequence-visualizer [snapshot]="snapshot()" [compact]="compact()" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayVisualizer {
  readonly compact = input(false);
  readonly items = input.required<readonly VisualItem[]>();
  readonly operation = input('');
  readonly removed = input<VisualItem | null>(null);
  readonly snapshot = computed<SequenceSnapshot>(() => ({
    kind: 'array',
    items: this.items(),
    operation: this.operation(),
    removed: this.removed(),
  }));
}
