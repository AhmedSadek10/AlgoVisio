import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { VisualItem, SequenceSnapshot } from '../../../core/visualization/structure-snapshot';
import { SequenceVisualizer } from '../sequence-visualizer/sequence-visualizer';
@Component({
  selector: 'app-stack-visualizer',
  imports: [SequenceVisualizer],
  template: '<app-sequence-visualizer [snapshot]="snapshot()" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackVisualizer {
  readonly items = input.required<readonly VisualItem[]>();
  readonly operation = input('');
  readonly removed = input<VisualItem | null>(null);
  readonly snapshot = computed<SequenceSnapshot>(() => ({
    kind: 'stack',
    items: this.items(),
    operation: this.operation(),
    removed: this.removed(),
  }));
}
