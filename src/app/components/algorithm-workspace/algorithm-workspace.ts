import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
@Component({
  selector: 'app-algorithm-workspace',
  templateUrl: './algorithm-workspace.html',
  styleUrl: './algorithm-workspace.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmWorkspace {
  readonly title = input('Dry run, step by step.');
  readonly expanded = signal(false);
  private workspaceResizeOrigin: { x: number; y: number; width: number; height: number } | null =
    null;

  beginWorkspaceResize(event: PointerEvent, element: HTMLElement): void {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const rect = element.getBoundingClientRect();
    this.workspaceResizeOrigin = {
      x: event.clientX,
      y: event.clientY,
      width: rect.width,
      height: rect.height,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  resizeWorkspace(event: PointerEvent, element: HTMLElement): void {
    const origin = this.workspaceResizeOrigin;
    if (!origin) {
      return;
    }
    element.style.width = Math.max(300, origin.width + event.clientX - origin.x) + 'px';
    element.style.height = Math.max(420, origin.height + event.clientY - origin.y) + 'px';
  }

  endWorkspaceResize(): void {
    this.workspaceResizeOrigin = null;
  }

  resizeWorkspaceByKey(event: Event, element: HTMLElement, width: number, height: number): void {
    event.preventDefault();
    const rect = element.getBoundingClientRect();
    element.style.width = Math.max(300, rect.width + width) + 'px';
    element.style.height = Math.max(420, rect.height + height) + 'px';
  }

  resetWorkspace(element: HTMLElement): void {
    this.expanded.set(false);
    element.style.removeProperty('width');
    element.style.removeProperty('height');
  }
}
