import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphLesson } from '../../components/graph-lesson/graph-lesson';
import { DEPTH_FIRST_SEARCH_LESSON } from './data/depth-first-search.lesson';

@Component({
  selector: 'app-depth-first-search-page',
  imports: [GraphLesson],
  template: '<app-graph-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepthFirstSearchPage {
  readonly lesson = DEPTH_FIRST_SEARCH_LESSON;
}
