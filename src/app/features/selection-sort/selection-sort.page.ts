import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SortingLesson } from '../../components/sorting-lesson/sorting-lesson';
import { SELECTION_SORT_LESSON } from './data/selection-sort.lesson';

@Component({
  selector: 'app-selection-sort-page',
  imports: [SortingLesson],
  template: '<app-sorting-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionSortPage {
  readonly lesson = SELECTION_SORT_LESSON;
}
