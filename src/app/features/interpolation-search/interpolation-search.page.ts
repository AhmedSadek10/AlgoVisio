import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchLesson } from '../../components/search-lesson/search-lesson';
import { INTERPOLATION_SEARCH_LESSON } from './data/interpolation-search.lesson';

@Component({
  selector: 'app-interpolation-search-page',
  imports: [SearchLesson],
  template: '<app-search-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterpolationSearchPage {
  readonly lesson = INTERPOLATION_SEARCH_LESSON;
}
