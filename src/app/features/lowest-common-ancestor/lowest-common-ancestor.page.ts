import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeLesson } from '../../components/tree-lesson/tree-lesson';
import { LOWEST_COMMON_ANCESTOR_LESSON } from './data/lowest-common-ancestor.lesson';
@Component({
  selector: 'app-lowest-common-ancestor-page',
  imports: [TreeLesson],
  template: '<app-tree-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LowestCommonAncestorPage {
  readonly lesson = LOWEST_COMMON_ANCESTOR_LESSON;
}
