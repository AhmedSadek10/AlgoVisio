export interface PanelDimensions {
  readonly id: string;
  readonly span: number;
  readonly height: number;
}

export type PanelRole = 'primary' | 'code' | 'explanation';

/** Keep the visual state and explanation beside a wide, immediately visible code panel. */
export function placeLessonPanels<T extends PanelDimensions & { readonly role?: PanelRole }>(
  panels: readonly T[],
): PlacedPanel<T>[] {
  const primary = panels.find((panel) => panel.role === 'primary');
  const code = panels.find((panel) => panel.role === 'code');
  const explanation = panels.find((panel) => panel.role === 'explanation');
  if (!primary || !code || !explanation) {
    return placePanels(panels);
  }
  const result: PlacedPanel<T>[] = [
    { ...primary, row: 0, column: 1, top: 0, span: 6, height: 400 },
    { ...code, row: 0, column: 7, top: 0, span: 6, height: 680 },
    { ...explanation, row: 1, column: 1, top: 412, span: 6, height: 268 },
  ];
  const supporting = panels.filter((panel) => !panel.role);
  let top = 692;
  for (let i = 0; i < supporting.length; i += 2) {
    const pair = supporting.slice(i, i + 2);
    result.push(
      ...pair.map((panel, j) => ({
        ...panel,
        row: 2 + i / 2,
        column: 1 + j * 6,
        top,
        span: 6,
      })),
    );
    top += Math.max(...pair.map((panel) => panel.height)) + 12;
  }
  return result;
}

export type PlacedPanel<T> = T & {
  readonly row: number;
  readonly column?: number;
  readonly top?: number;
};

export type PositionedPanel<T> = PlacedPanel<T> & { readonly column: number; readonly top: number };

export type BlockResize =
  | { readonly kind: 'pointer'; readonly width: number; readonly height: number }
  | { readonly kind: 'keyboard'; readonly columns: number; readonly height: number };

const COLUMNS = 12;
const MIN_SPAN = 3;
const GAP = 12;

/** Snap the panel's left edge, preserving the pointer's position within its header. */
export function dropColumn(pointerX: number, grabOffsetX: number, gridWidth: number): number {
  return Math.round((pointerX - grabOffsetX) / ((gridWidth + GAP) / COLUMNS)) + 1;
}

/** Fit the nearest free slot containing the pointer when the preferred placement collides. */
export function movePanelNearSpace<T extends PanelDimensions>(
  panels: readonly PlacedPanel<T>[],
  id: string,
  column: number,
  y: number,
  pointerColumn: number,
): PositionedPanel<T>[] | null {
  const preferred = movePanelToSpace(panels, id, column, y);
  if (preferred) {
    return preferred;
  }
  const source = panels.find((panel) => panel.id === id);
  if (!source) {
    return null;
  }
  const candidates = Array.from({ length: COLUMNS - source.span + 1 }, (_, i) => i + 1)
    .filter((start) => start <= pointerColumn && pointerColumn < start + source.span)
    .sort((a, b) => Math.abs(a - column) - Math.abs(b - column));
  for (const candidate of candidates) {
    const placement = movePanelToSpace(panels, id, candidate, y);
    if (placement) {
      return placement;
    }
  }
  return null;
}

export function positionPanels<T extends PanelDimensions>(
  panels: readonly PlacedPanel<T>[],
): PositionedPanel<T>[] {
  const columns = new Map<number, number>();
  const rows = new Map<number, number>();
  for (const panel of panels) {
    rows.set(panel.row, Math.max(rows.get(panel.row) ?? 0, panel.height));
  }
  const rowTops = new Map<number, number>();
  let top = 0;
  for (const row of [...rows.keys()].sort((a, b) => a - b)) {
    rowTops.set(row, top);
    top += rows.get(row)! + GAP;
  }
  return panels.map((panel) => {
    const column = columns.get(panel.row) ?? 1;
    columns.set(panel.row, column + panel.span);
    return { ...panel, column: panel.column ?? column, top: panel.top ?? rowTops.get(panel.row)! };
  });
}

/** Find the free vertical interval under the pointer, excluding the dragged panel. */
export function movePanelToSpace<T extends PanelDimensions>(
  panels: readonly PlacedPanel<T>[],
  id: string,
  column: number,
  y: number,
): PositionedPanel<T>[] | null {
  const positioned = positionPanels(panels);
  const source = positioned.find((panel) => panel.id === id);
  if (!source || y < 0) {
    return null;
  }
  column = Math.max(1, Math.min(COLUMNS - source.span + 1, Math.round(column)));
  const neighbors = positioned.filter(
    (panel) =>
      panel.id !== id && panel.column < column + source.span && column < panel.column + panel.span,
  );
  if (neighbors.some((panel) => y >= panel.top && y < panel.top + panel.height)) {
    return null;
  }
  const top = Math.max(
    0,
    // Align with the row under the pointer even when its panels are in other columns.
    // Otherwise a drop beside the bottom row snaps back above it into the earliest gap.
    ...positioned.filter((panel) => panel.id !== id && panel.top <= y).map((panel) => panel.top),
    ...neighbors
      .filter((panel) => panel.top + panel.height <= y)
      .map((panel) => panel.top + panel.height + GAP),
  );
  const nextTop = Math.min(
    Infinity,
    ...neighbors.filter((panel) => panel.top > y).map((panel) => panel.top),
  );
  const height = Math.min(source.height, nextTop - top - GAP);
  if (height < 180) {
    return null;
  }
  return positioned.map((panel) => (panel.id === id ? { ...panel, column, top, height } : panel));
}

function overlaps<T extends PanelDimensions>(panels: readonly PositionedPanel<T>[]): boolean {
  return panels.some((a, i) =>
    panels
      .slice(i + 1)
      .some(
        (b) =>
          a.column < b.column + b.span &&
          b.column < a.column + a.span &&
          a.top < b.top + b.height + GAP &&
          b.top < a.top + a.height + GAP,
      ),
  );
}

/** Assign row membership once; resizing never runs the packing algorithm again. */
export function placePanels<T extends PanelDimensions>(panels: readonly T[]): PlacedPanel<T>[] {
  let row = 0;
  let usedColumns = 0;
  return panels.map((panel) => {
    const span = Math.max(MIN_SPAN, Math.min(COLUMNS, panel.span));
    if (usedColumns + span > COLUMNS) {
      row++;
      usedColumns = 0;
    }
    usedColumns += span;
    return { ...panel, span, row };
  });
}

export function resizePanel<T extends PanelDimensions>(
  panels: readonly PlacedPanel<T>[],
  id: string,
  resize: BlockResize,
  gridWidth: number,
  stacked: boolean,
): PlacedPanel<T>[] {
  const index = panels.findIndex((panel) => panel.id === id);
  if (index < 0 || gridWidth <= 0) {
    return [...panels];
  }
  const panel = panels[index];
  const neighbor = panels[index + 1]?.row === panel.row ? panels[index + 1] : undefined;
  const requestedSpan =
    resize.kind === 'keyboard'
      ? panel.span + resize.columns
      : Math.round((resize.width + GAP) / ((gridWidth + GAP) / COLUMNS));
  const usedColumns = panels
    .filter((item) => item.row === panel.row)
    .reduce((sum, item) => sum + item.span, 0);
  const freeColumns = COLUMNS - usedColumns;
  const maximumSpan = panel.span + freeColumns + (neighbor ? neighbor.span - MIN_SPAN : 0);
  const span = stacked ? panel.span : Math.max(MIN_SPAN, Math.min(maximumSpan, requestedSpan));
  const requestedHeight = resize.kind === 'keyboard' ? panel.height + resize.height : resize.height;
  const height = Math.round(Math.max(180, Math.min(1200, requestedHeight)));
  if (panel.top !== undefined) {
    const positioned = positionPanels(panels);
    const width = stacked
      ? panel.span
      : Math.max(MIN_SPAN, Math.min(COLUMNS - positioned[index].column + 1, requestedSpan));
    const resized = positioned.map((item) =>
      item.id === id ? { ...item, span: width, height } : item,
    );
    return overlaps(resized) ? [...panels] : resized;
  }
  // Use empty columns first, then take room from the next block in this row.
  const neighborDelta =
    span > panel.span ? Math.max(0, span - panel.span - freeColumns) : span - panel.span;

  return panels.map((item) => {
    if (item.id === id) {
      return { ...item, span, height };
    }
    if (neighbor && item.id === neighbor.id) {
      return { ...item, span: item.span - neighborDelta };
    }
    return item;
  });
}

/** Exchange slots while keeping each panel's content and chosen height together. */
export function swapPanels<T extends PanelDimensions>(
  panels: readonly PlacedPanel<T>[],
  first: number,
  second: number,
): PlacedPanel<T>[] {
  const result = [...panels];
  if (!result[first] || !result[second] || first === second) {
    return result;
  }
  const a = result[first];
  const b = result[second];
  result[first] = {
    ...b,
    row: a.row,
    span: a.span,
    column: a.column,
    top: a.top,
    ...(a.top !== undefined ? { height: a.height } : {}),
  };
  result[second] = {
    ...a,
    row: b.row,
    span: b.span,
    column: b.column,
    top: b.top,
    ...(b.top !== undefined ? { height: b.height } : {}),
  };
  return result;
}
