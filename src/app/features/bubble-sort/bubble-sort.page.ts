import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SortingLesson } from '../../components/sorting-lesson/sorting-lesson';
import { BUBBLE_SORT_LESSON } from './data/bubble-sort.lesson';

@Component({
  selector: 'app-bubble-sort-page',
  imports: [SortingLesson],
  template: '<app-sorting-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BubbleSortPage {
  readonly lesson = BUBBLE_SORT_LESSON;
}
