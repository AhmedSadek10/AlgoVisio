import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchLesson } from '../../components/search-lesson/search-lesson';
import { BINARY_SEARCH_LESSON } from './data/binary-search.lesson';

@Component({
  selector: 'app-binary-search-page',
  imports: [SearchLesson],
  template: '<app-search-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinarySearchPage {
  readonly lesson = BINARY_SEARCH_LESSON;
}
