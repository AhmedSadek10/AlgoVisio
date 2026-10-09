import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SortingLesson } from '../../components/sorting-lesson/sorting-lesson';
import { MERGE_SORT_LESSON } from './data/merge-sort.lesson';

@Component({
  selector: 'app-merge-sort-page',
  imports: [SortingLesson],
  template: '<app-sorting-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MergeSortPage {
  readonly lesson = MERGE_SORT_LESSON;
}
