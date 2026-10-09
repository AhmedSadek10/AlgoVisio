import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeLesson } from '../../components/tree-lesson/tree-lesson';
import { BST_SEARCH_LESSON } from './data/bst-search.lesson';
@Component({
  selector: 'app-bst-search-page',
  imports: [TreeLesson],
  template: '<app-tree-lesson [lesson]="lesson" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BstSearchPage {
  readonly lesson = BST_SEARCH_LESSON;
}
