import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { AlgorithmImplementation, CodeLanguage } from '../../core/visualization/algorithm-code';

@Component({
  selector: 'app-algorithm-code',
  templateUrl: './algorithm-code.html',
  styleUrl: './algorithm-code.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlgorithmCode {
  readonly compact = input(false);
  readonly implementations = input.required<readonly AlgorithmImplementation[]>();
  readonly codeKey = input.required<string>();
  readonly inputCode = input('');
  readonly label = input('Algorithm source code');
  readonly language = input<CodeLanguage>('typescript');
  readonly languageChange = output<CodeLanguage>();
  readonly copyStatus = signal('');
  readonly source = computed(
    () => this.implementations().find((source) => source.language === this.language())!,
  );
  readonly activeLine = computed(() =>
    this.source().lines.findIndex((line) => line.key === this.codeKey()),
  );
  private readonly codeBody = viewChild<ElementRef<HTMLElement>>('codeBody');
  constructor() {
    afterRenderEffect(() => {
      const index = this.activeLine();
      const body = this.codeBody()?.nativeElement;
      const line = body?.querySelector<HTMLElement>(`[data-line="${index}"]`);
      if (!body || !line) {
        return;
      }
      const top = line.offsetTop;
      if (
        top < body.scrollTop + 35 ||
        top + line.offsetHeight > body.scrollTop + body.clientHeight - 35
      ) {
        body.scrollTop = Math.max(0, top - body.clientHeight / 3);
      }
    });
  }

  selectLanguage(language: CodeLanguage): void {
    this.languageChange.emit(language);
    this.copyStatus.set('');
  }

  async copy(): Promise<void> {
    try {
      const source = this.source()
        .lines.map((line) => line.text)
        .join('\n');
      const code =
        this.language() === 'csharp' || this.language() === 'java'
          ? source.slice(0, source.lastIndexOf('}')) + '\n' + this.inputCode() + '\n}'
          : source + '\n\n' + this.inputCode();
      await navigator.clipboard.writeText(code);
      this.copyStatus.set('Copied code + input');
    } catch {
      this.copyStatus.set('Select the code to copy it');
    }
  }
}
