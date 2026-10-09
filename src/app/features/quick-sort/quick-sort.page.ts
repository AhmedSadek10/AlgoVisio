import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SortingLesson } from '../../components/sorting-lesson/sorting-lesson';
import { QUICK_SORT_LESSON } from './data/quick-sort.lesson';

@Component({
  selector: 'app-quick-sort-page',
  imports: [SortingLesson],
  template: '<app-sorting-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickSortPage {
  readonly lesson = QUICK_SORT_LESSON;
}
