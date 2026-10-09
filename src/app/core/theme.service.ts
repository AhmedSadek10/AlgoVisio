import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'algo-studio-theme';

function savedTheme(document: Document): Theme | null {
  try {
    const value = document.defaultView?.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/** Apply the preference before Angular renders the first lesson. */
export function initializeTheme(document: Document): void {
  const prefersDark = document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset['theme'] =
    savedTheme(document) ?? (prefersDark ? 'dark' : 'light');
}

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly media = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)');
  private preference = savedTheme(this.document);
  readonly isDark = signal(this.document.documentElement.dataset['theme'] === 'dark');

  private readonly systemThemeChanged = (event: MediaQueryListEvent): void => {
    if (this.preference === null) {
      this.apply(event.matches ? 'dark' : 'light');
    }
  };

  constructor() {
    this.media?.addEventListener('change', this.systemThemeChanged);
  }

  toggle(): void {
    this.preference = this.isDark() ? 'light' : 'dark';
    this.apply(this.preference);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, this.preference);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  ngOnDestroy(): void {
    this.media?.removeEventListener('change', this.systemThemeChanged);
  }

  private apply(theme: Theme): void {
    this.document.documentElement.dataset['theme'] = theme;
    this.isDark.set(theme === 'dark');
  }
}
