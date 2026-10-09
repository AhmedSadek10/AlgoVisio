import { DestroyRef, inject, signal } from '@angular/core';

/** Reading time for one dry-run statement at normal playback speed. */
export const DEFAULT_STEP_DURATION_MS = 3000;

/** One controller per lesson. The owning component releases its timer on destruction. */
export function createPlayback(stepCount: () => number): PlaybackController {
  const playback = new PlaybackController(stepCount);
  inject(DestroyRef).onDestroy(() => playback.stop());
  return playback;
}

export class PlaybackController {
  private readonly currentIndex = signal(0);
  private readonly running = signal(false);
  private readonly playbackSpeed = signal(1);
  private timer: ReturnType<typeof setInterval> | null = null;

  readonly index = this.currentIndex.asReadonly();
  readonly isPlaying = this.running.asReadonly();
  readonly speed = this.playbackSpeed.asReadonly();

  constructor(private readonly stepCount: () => number) {}

  reset(): void {
    this.seek(0);
  }

  seek(index: number): void {
    this.stop();
    const lastIndex = Math.max(0, this.stepCount() - 1);
    const requestedIndex = Number.isFinite(index) ? Math.trunc(index) : 0;
    this.currentIndex.set(Math.max(0, Math.min(requestedIndex, lastIndex)));
  }

  next(): void {
    this.seek(this.index() + 1);
  }

  previous(): void {
    this.seek(this.index() - 1);
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.stop();
      return;
    }
    if (this.stepCount() < 2) {
      return;
    }
    if (this.index() >= this.stepCount() - 1) {
      this.currentIndex.set(0);
    }
    this.running.set(true);
    this.startTimer();
  }

  setSpeed(speed: number): void {
    if (!Number.isFinite(speed) || speed <= 0) {
      return;
    }
    this.playbackSpeed.set(speed);
    if (this.isPlaying()) {
      this.startTimer();
    }
  }

  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
    this.timer = null;
    this.running.set(false);
  }

  private startTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      const lastIndex = Math.max(0, this.stepCount() - 1);
      this.currentIndex.update((index) => Math.min(index + 1, lastIndex));
      if (this.index() >= lastIndex) {
        this.stop();
      }
    }, DEFAULT_STEP_DURATION_MS / this.speed());
  }
}
