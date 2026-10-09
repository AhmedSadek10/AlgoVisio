import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

import type { BlockResize } from '../algorithm-workbench/workbench-layout';

@Component({
  selector: 'app-workbench-block',
  templateUrl: './workbench-block.html',
  styleUrl: './workbench-block.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkbenchBlock {
  readonly title = input.required<string>();
  readonly resize = output<BlockResize>();
  readonly reorderStart = output<PointerEvent>();
  readonly reorderMove = output<PointerEvent>();
  readonly reorderEnd = output<PointerEvent>();
  readonly resizing = signal(false);
  private origin: {
    x: number;
    y: number;
    width: number;
    height: number;
    pointerId: number;
    handle: HTMLElement;
  } | null = null;

  beginResize(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const handle = event.currentTarget as HTMLElement;
    const block = handle.closest('app-workbench-block')!.getBoundingClientRect();
    this.origin = {
      x: event.clientX,
      y: event.clientY,
      width: block.width,
      height: block.height,
      pointerId: event.pointerId,
      handle,
    };
    handle.setPointerCapture(event.pointerId);
    this.resizing.set(true);
  }

  updateResize(event: PointerEvent): void {
    if (!this.origin || event.pointerId !== this.origin.pointerId) {
      return;
    }
    event.preventDefault();
    this.resize.emit({
      kind: 'pointer',
      width: Math.max(180, this.origin.width + event.clientX - this.origin.x),
      height: Math.max(150, this.origin.height + event.clientY - this.origin.y),
    });
  }

  endResize(): void {
    const origin = this.origin;
    this.origin = null;
    this.resizing.set(false);
    if (origin?.handle.hasPointerCapture(origin.pointerId)) {
      origin.handle.releasePointerCapture(origin.pointerId);
    }
  }

  resizeByKey(event: Event, width: number, height: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.resize.emit({ kind: 'keyboard', columns: width, height });
  }
}
