import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PracticeProblem } from '../../core/practice-problem';

@Component({
  selector: 'app-lesson-practice',
  templateUrl: './lesson-practice.html',
  styleUrl: './lesson-practice.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonPractice {
  readonly problems = input.required<readonly PracticeProblem[]>();
}
