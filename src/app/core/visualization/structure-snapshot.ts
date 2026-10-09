/** Visual state is supplied by an algorithm adapter; renderers never run algorithms. */
export type ItemState = 'idle' | 'active' | 'visited' | 'discarded' | 'found' | 'stale';
export interface VisualItem {
  readonly id: string;
  readonly label: string;
  readonly detail?: string;
  readonly marker?: string;
  readonly state?: ItemState;
}
export interface VisualEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly label?: string;
  readonly state?: ItemState;
}
export interface SequenceSnapshot {
  readonly kind: 'array' | 'stack' | 'queue' | 'deque' | 'linked-list' | 'set';
  readonly items: readonly VisualItem[];
  readonly operation?: string;
  readonly removed?: VisualItem | null;
}
export interface HeapSnapshot {
  readonly kind: 'heap';
  readonly items: readonly VisualItem[];
  readonly order: 'min' | 'max';
  readonly operation?: string;
  readonly removed?: VisualItem | null;
}
export interface TreeSnapshot {
  readonly kind: 'tree';
  readonly nodes: readonly (VisualItem & { readonly parentId?: string | null })[];
}
export interface GraphSnapshot {
  readonly kind: 'graph';
  readonly nodes: readonly VisualItem[];
  readonly edges: readonly VisualEdge[];
  readonly directed: boolean;
  readonly root?: string;
  readonly selectable?: boolean;
}
export interface MapSnapshot {
  readonly kind: 'map';
  readonly columns: readonly MemoryColumn[];
  readonly rows: readonly MemoryRow[];
}
export type StructureSnapshot =
  | SequenceSnapshot
  | HeapSnapshot
  | TreeSnapshot
  | GraphSnapshot
  | MapSnapshot;
export interface MemoryColumn {
  readonly key: string;
  readonly label: string;
}
export interface MemoryRow {
  readonly id: string;
  readonly cells: Readonly<Record<string, string | number>>;
  readonly state?: ItemState;
}
export interface StepVariable {
  readonly name: string;
  readonly value: string | number;
}
