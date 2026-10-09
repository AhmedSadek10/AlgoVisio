import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SortingLesson } from '../../components/sorting-lesson/sorting-lesson';
import { INSERTION_SORT_LESSON } from './data/insertion-sort.lesson';

@Component({
  selector: 'app-insertion-sort-page',
  imports: [SortingLesson],
  template: '<app-sorting-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsertionSortPage {
  readonly lesson = INSERTION_SORT_LESSON;
}
