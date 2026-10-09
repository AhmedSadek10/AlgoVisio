import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
@Component({
  selector: 'app-playback-controls',
  templateUrl: './playback-controls.html',
  styleUrl: './playback-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'navigateByArrow($event)' },
})
export class PlaybackControls {
  readonly index = input.required<number>();
  readonly total = input.required<number>();
  readonly playing = input(false);
  readonly speed = input(1);
  readonly reset = output<void>();
  readonly previous = output<void>();
  readonly next = output<void>();
  readonly play = output<void>();
  readonly seek = output<number>();
  readonly speedChange = output<number>();

  navigateByArrow(event: KeyboardEvent): void {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
    ) {
      return;
    }

    // Keep native arrows available when editing, adjusting sliders, or scrolling code.
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(
        'input, textarea, select, button, [contenteditable]:not([contenteditable="false"]), [role="slider"], [role="separator"], app-algorithm-code, [role="tabpanel"], [role="tablist"]',
      )
    ) {
      return;
    }

    event.preventDefault();
    const index = Math.max(
      0,
      Math.min(this.total() - 1, this.index() + (event.key === 'ArrowRight' ? 1 : -1)),
    );
    this.seek.emit(index);
  }
}
