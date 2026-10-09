import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StepVariable } from '../../core/visualization/structure-snapshot';
@Component({
  selector: 'app-step-explanation',
  templateUrl: './step-explanation.html',
  styleUrl: './step-explanation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepExplanation {
  readonly title = input.required<string>();
  readonly explanation = input.required<string>();
  readonly phase = input('');
  readonly variables = input<readonly StepVariable[]>([]);
  readonly comparison = input('');
  readonly result = input('');
}
