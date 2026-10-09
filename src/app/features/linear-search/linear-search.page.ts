import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchLesson } from '../../components/search-lesson/search-lesson';
import { LINEAR_SEARCH_LESSON } from './data/linear-search.lesson';

@Component({
  selector: 'app-linear-search-page',
  imports: [SearchLesson],
  template: '<app-search-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinearSearchPage {
  readonly lesson = LINEAR_SEARCH_LESSON;
}
