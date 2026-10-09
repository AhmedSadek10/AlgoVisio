import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeLesson } from '../../components/tree-lesson/tree-lesson';
import { TREE_DIAMETER_LESSON } from './data/tree-diameter.lesson';
@Component({
  selector: 'app-tree-diameter-page',
  imports: [TreeLesson],
  template: '<app-tree-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDiameterPage {
  readonly lesson = TREE_DIAMETER_LESSON;
}
