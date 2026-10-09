import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeLesson } from '../../components/tree-lesson/tree-lesson';
import { TREE_TRAVERSAL_LESSON } from './data/tree-traversal.lesson';

@Component({
  selector: 'app-tree-traversal-page',
  imports: [TreeLesson],
  template: '<app-tree-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeTraversalPage {
  readonly lesson = TREE_TRAVERSAL_LESSON;
}
