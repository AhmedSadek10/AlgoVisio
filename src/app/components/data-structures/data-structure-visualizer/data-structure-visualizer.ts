import { MemoryTable } from '../../memory-table/memory-table';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { StructureSnapshot } from '../../../core/visualization/structure-snapshot';
import { StackVisualizer } from '../stack-visualizer/stack-visualizer';
import { QueueVisualizer } from '../queue-visualizer/queue-visualizer';
import { SequenceVisualizer } from '../sequence-visualizer/sequence-visualizer';
import { TreeVisualizer } from '../tree-visualizer/tree-visualizer';
import { HeapVisualizer } from '../heap-visualizer/heap-visualizer';
import { GraphVisualizer } from '../graph-visualizer/graph-visualizer';
@Component({
  selector: 'app-data-structure-visualizer',
  imports: [
    MemoryTable,
    SequenceVisualizer,
    StackVisualizer,
    QueueVisualizer,
    TreeVisualizer,
    HeapVisualizer,
    GraphVisualizer,
  ],
  templateUrl: './data-structure-visualizer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataStructureVisualizer {
  readonly snapshot = input.required<StructureSnapshot>();
  readonly nodeSelect = output<string>();
}
