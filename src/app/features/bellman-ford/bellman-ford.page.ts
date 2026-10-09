import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphLesson } from '../../components/graph-lesson/graph-lesson';
import { BELLMAN_FORD_LESSON } from './data/bellman-ford.lesson';

@Component({
  selector: 'app-bellman-ford-page',
  imports: [GraphLesson],
  template: '<app-graph-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BellmanFordPage {
  readonly lesson = BELLMAN_FORD_LESSON;
}
