import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ALGORITHM_CATALOG } from '../../core/algorithm-catalog';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell implements AfterViewInit, OnDestroy {
  readonly theme = inject(ThemeService);
  private readonly mobileNav = viewChild<ElementRef<HTMLElement>>('mobileNav');
  readonly mobileCategories = [...new Set(ALGORITHM_CATALOG.map((topic) => topic.category))].map(
    (name) => ({
      name,
      topics: ALGORITHM_CATALOG.filter((topic) => topic.available && topic.category === name),
    }),
  );
  private readonly router = inject(Router);
  private readonly navigation: Subscription;
  readonly searchQuery = signal('');
  readonly notice = signal('');
  readonly currentSlug = signal(this.router.url.split('/').pop() || 'bubble-sort');
  readonly currentTopic = computed(
    () =>
      ALGORITHM_CATALOG.find((topic) => topic.slug === this.currentSlug()) ?? ALGORITHM_CATALOG[0],
  );
  readonly visibleCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const topics = ALGORITHM_CATALOG.filter((topic) =>
      `${topic.name} ${topic.category}`.toLowerCase().includes(query),
    );
    return [...new Set(topics.map((topic) => topic.category))].map((name) => ({
      name,
      topics: topics.filter((topic) => topic.category === name),
    }));
  });
  private noticeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.navigation = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentSlug.set(this.router.url.split('/').pop() || 'bubble-sort');
        this.scrollToCurrentLesson();
      });
  }

  ngAfterViewInit(): void {
    this.scrollToCurrentLesson();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
  }

  showComingSoon(name: string): void {
    this.notice.set(`${name} is on the roadmap.`);
    if (this.noticeTimer) {
      clearTimeout(this.noticeTimer);
    }
    this.noticeTimer = setTimeout(() => this.notice.set(''), 3500);
  }

  private scrollToCurrentLesson(): void {
    requestAnimationFrame(() => {
      const nav = this.mobileNav()?.nativeElement;
      const active = nav?.querySelector<HTMLElement>('a.current');
      if (!nav || !active || nav.clientWidth === 0) {
        return;
      }
      const offset = active.getBoundingClientRect().left - nav.getBoundingClientRect().left;
      nav.scrollLeft += offset - (nav.clientWidth - active.clientWidth) / 2;
    });
  }
}
