import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ALGORITHM_CATALOG, AlgorithmCatalogEntry } from '../../core/algorithm-catalog';

@Component({
  selector: 'app-algorithm-intro',
  templateUrl: './algorithm-intro.html',
  styleUrl: './algorithm-intro.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmIntro {
  readonly algorithm = input.required<AlgorithmCatalogEntry>();
  readonly lessonNumber = computed(() =>
    String(
      ALGORITHM_CATALOG.filter((item) => item.category === this.algorithm().category).findIndex(
        (item) => item.slug === this.algorithm().slug,
      ) + 1,
    ).padStart(2, '0'),
  );
}
