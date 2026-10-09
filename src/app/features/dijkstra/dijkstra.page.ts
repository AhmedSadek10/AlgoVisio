import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphLesson } from '../../components/graph-lesson/graph-lesson';
import { DIJKSTRA_LESSON } from './data/dijkstra.lesson';

@Component({
  selector: 'app-dijkstra-page',
  imports: [GraphLesson],
  template: '<app-graph-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DijkstraPage {
  readonly lesson = DIJKSTRA_LESSON;
}
