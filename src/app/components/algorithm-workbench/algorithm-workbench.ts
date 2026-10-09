import {
  ChangeDetectionStrategy,
  Component,
  computed,
  TemplateRef,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { WorkbenchBlock } from '../workbench-block/workbench-block';
import {
  BlockResize,
  PanelRole,
  dropColumn,
  placeLessonPanels,
  positionPanels,
  movePanelToSpace,
  movePanelNearSpace,
  resizePanel,
  swapPanels,
} from './workbench-layout';

export interface WorkbenchPanel {
  readonly id: string;
  readonly title: string;
  readonly span: number;
  readonly height: number;
  readonly template: TemplateRef<unknown>;
  readonly role?: PanelRole;
}

@Component({
  selector: 'app-algorithm-workbench',
  imports: [NgTemplateOutlet, WorkbenchBlock],
  templateUrl: './algorithm-workbench.html',
  styleUrl: './algorithm-workbench.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmWorkbench {
  readonly panels = input.required<readonly WorkbenchPanel[]>();
  readonly blocks = linkedSignal(() => placeLessonPanels(this.panels()));
  readonly positionedBlocks = computed(() => positionPanels(this.blocks()));
  readonly layoutHeight = computed(
    () =>
      Math.max(0, ...this.positionedBlocks().map((block) => block.top + block.height)) +
      (this.dragged() ? 192 : 0),
  );
  readonly spaceTarget = signal<ReturnType<typeof movePanelToSpace<WorkbenchPanel>>>(null);
  readonly spacePreview = computed(() =>
    this.spaceTarget()?.find((block) => block.id === this.dragged()),
  );
  readonly dragged = signal<string | null>(null);
  readonly dropTarget = signal<string | null>(null);
  private grabOffsetX = 0;

  resetLayout(): void {
    this.blocks.set(placeLessonPanels(this.panels()));
  }

  resizeBlock(id: string, size: BlockResize, gridWidth: number): void {
    this.blocks.update((blocks) => resizePanel(blocks, id, size, gridWidth, gridWidth <= 900));
  }

  beginDrag(event: PointerEvent, id: string): void {
    if (event.button !== 0 || (event.target as HTMLElement).closest('button')) {
      return;
    }
    event.preventDefault();
    const header = event.currentTarget as HTMLElement;
    const block = header.closest('app-workbench-block') as HTMLElement;
    this.grabOffsetX = event.clientX - block.getBoundingClientRect().left;
    header.setPointerCapture(event.pointerId);
    this.dragged.set(id);
  }

  allowDrop(event: PointerEvent): void {
    if (!this.dragged()) {
      return;
    }
    const grid = (event.currentTarget as HTMLElement).closest('.workbench') as HTMLElement;
    const underPointer = grid.ownerDocument.elementFromPoint(event.clientX, event.clientY);
    const target = underPointer?.closest('app-workbench-block');
    const id = target?.closest('.workbench') === grid ? target.getAttribute('data-block-id') : null;
    this.dropTarget.set(id);
    this.spaceTarget.set(null);
    const bounds = grid.getBoundingClientRect();
    if (
      !id &&
      grid.clientWidth > 900 &&
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom
    ) {
      const column = dropColumn(event.clientX - bounds.left, this.grabOffsetX, bounds.width);
      this.spaceTarget.set(
        movePanelNearSpace(
          this.blocks(),
          this.dragged()!,
          column,
          event.clientY - bounds.top,
          (event.clientX - bounds.left) / ((bounds.width + 12) / 12) + 1,
        ),
      );
    }
  }

  drop(event: PointerEvent): void {
    if (!this.dragged()) {
      return;
    }
    if (event.type === 'pointerup') {
      this.allowDrop(event);
    }
    const from = this.dragged();
    const id = event.type === 'pointercancel' ? null : this.dropTarget();
    if (from && id && from !== id) {
      const blocks = [...this.blocks()];
      const a = blocks.findIndex((block) => block.id === from);
      const b = blocks.findIndex((block) => block.id === id);
      this.blocks.set(swapPanels(blocks, a, b));
    } else if (event.type === 'pointerup' && this.spaceTarget()) {
      this.blocks.set(this.spaceTarget()!);
    }
    this.dragged.set(null);
    this.dropTarget.set(null);
    this.spaceTarget.set(null);
  }
}
