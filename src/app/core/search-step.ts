export type SearchPhase = 'ready' | 'compare' | 'discard' | 'found' | 'missing';

export interface SearchStep {
  low: number;
  high: number;
  mid: number | null;
  phase: SearchPhase;
  title: string;
  description: string;
  activeLine: number;
  iteration: number;
  pointerLabel?: string;
}
