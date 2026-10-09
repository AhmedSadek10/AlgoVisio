import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GraphLesson } from '../../components/graph-lesson/graph-lesson';
import { KRUSKAL_LESSON } from './data/kruskal.lesson';

@Component({
  selector: 'app-kruskal-page',
  imports: [GraphLesson],
  template: '<app-graph-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KruskalPage {
  readonly lesson = KRUSKAL_LESSON;
}
