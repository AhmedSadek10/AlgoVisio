import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchLesson } from '../../components/search-lesson/search-lesson';
import { JUMP_SEARCH_LESSON } from './data/jump-search.lesson';

@Component({
  selector: 'app-jump-search-page',
  imports: [SearchLesson],
  template: '<app-search-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JumpSearchPage {
  readonly lesson = JUMP_SEARCH_LESSON;
}
