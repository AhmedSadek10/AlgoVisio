import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MemoryColumn, MemoryRow } from '../../core/visualization/structure-snapshot';
@Component({
  selector: 'app-memory-table',
  templateUrl: './memory-table.html',
  styleUrl: './memory-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryTable {
  readonly columns = input.required<readonly MemoryColumn[]>();
  readonly rows = input.required<readonly MemoryRow[]>();
}
