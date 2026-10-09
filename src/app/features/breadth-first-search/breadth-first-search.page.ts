import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphLesson } from '../../components/graph-lesson/graph-lesson';
import { BREADTH_FIRST_SEARCH_LESSON } from './data/breadth-first-search.lesson';

@Component({
  selector: 'app-breadth-first-search-page',
  imports: [GraphLesson],
  template: '<app-graph-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadthFirstSearchPage {
  readonly lesson = BREADTH_FIRST_SEARCH_LESSON;
}
