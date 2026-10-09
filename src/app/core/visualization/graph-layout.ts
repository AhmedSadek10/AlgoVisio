export const GRAPH_NODE_RADIUS = 36;

interface LayoutEdge {
  readonly from: string;
  readonly to: string;
}

export interface GraphPosition {
  readonly x: number;
  readonly y: number;
}

/** Geometry depends on topology, never on traversal state or the selected start. */
export function layoutGraph(nodeIds: readonly string[], edges: readonly LayoutEdge[]) {
  const neighbors = new Map(nodeIds.map((id) => [id, new Set<string>()]));
  for (const edge of edges) {
    neighbors.get(edge.from)?.add(edge.to);
    neighbors.get(edge.to)?.add(edge.from);
  }

  const seen = new Set<string>();
  const components: string[][] = [];
  for (const id of nodeIds) {
    if (seen.has(id)) {
      continue;
    }
    const component = [id];
    seen.add(id);
    for (let index = 0; index < component.length; index++) {
      for (const neighbor of neighbors.get(component[index]) ?? []) {
        if (!neighbors.has(neighbor) || seen.has(neighbor)) {
          continue;
        }
        seen.add(neighbor);
        component.push(neighbor);
      }
    }
    components.push(component);
  }

  const groups = components.map((ids) => layoutComponent(ids, neighbors));
  const area = groups.reduce((total, group) => total + (group.width + 24) * (group.height + 24), 0);
  const rowWidth = Math.max(360, ...groups.map((group) => group.width), Math.sqrt(area * 1.5));
  const positions = new Map<string, GraphPosition>();
  const gap = 24;
  const padding = 24;
  let x = padding;
  let y = padding;
  let rowHeight = 0;
  let width = 0;

  for (const group of groups) {
    if (x > padding && x + group.width > rowWidth + padding) {
      x = padding;
      y += rowHeight + gap;
      rowHeight = 0;
    }
    for (const [id, point] of group.positions) {
      positions.set(id, { x: x + point.x, y: y + point.y });
    }
    width = Math.max(width, x + group.width + padding);
    rowHeight = Math.max(rowHeight, group.height);
    x += group.width + gap;
  }

  const height = y + rowHeight + padding;
  // Give one-node graphs breathing room without pinning them to a corner.
  const canvasWidth = Math.max(280, width);
  const canvasHeight = Math.max(200, height);
  for (const [id, point] of positions) {
    positions.set(id, {
      x: point.x + (canvasWidth - width) / 2,
      y: point.y + (canvasHeight - height) / 2,
    });
  }
  return { width: canvasWidth, height: canvasHeight, positions };
}

function layoutComponent(ids: readonly string[], neighbors: ReadonlyMap<string, Set<string>>) {
  const radius = Math.max(100, ids.length * 23);
  const points = ids.map((id, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / ids.length;
    return {
      id,
      x: ids.length === 1 ? 0 : ids.length === 2 ? index * 150 : Math.cos(angle) * radius,
      y: ids.length <= 2 ? 0 : Math.sin(angle) * radius,
    };
  });

  // A short deterministic spring simulation spreads branches and keeps neighbors close.
  for (let iteration = 0; iteration < 180 && ids.length > 2; iteration++) {
    const forces = points.map((point) => ({ x: -point.x * 0.008, y: -point.y * 0.008 }));
    for (let first = 0; first < points.length; first++) {
      for (let second = first + 1; second < points.length; second++) {
        const dx = points[second].x - points[first].x;
        const dy = points[second].y - points[first].y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const connected = neighbors.get(points[first].id)?.has(points[second].id);
        const attraction = connected ? (distance - 145) * 0.035 : 0;
        const repulsion = 1600 / distance ** 2 + Math.max(0, 120 - distance) * 0.3;
        const force = attraction - repulsion;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        forces[first].x += fx;
        forces[first].y += fy;
        forces[second].x -= fx;
        forces[second].y -= fy;
      }
    }
    const limit = 8 * (1 - iteration / 180) + 0.5;
    points.forEach((point, index) => {
      const force = forces[index];
      const scale = Math.min(1, limit / (Math.hypot(force.x, force.y) || 1));
      point.x += force.x * scale;
      point.y += force.y * scale;
    });
  }

  // Dense graphs can still compress nodes; reserve room for discs and markers.
  for (let pass = 0; pass < 60; pass++) {
    for (let first = 0; first < points.length; first++) {
      for (let second = first + 1; second < points.length; second++) {
        const dx = points[second].x - points[first].x;
        const dy = points[second].y - points[first].y;
        const distance = Math.hypot(dx, dy);
        if (distance >= 118) {
          continue;
        }
        const angle = distance === 0 ? (first + second) * 2.4 : Math.atan2(dy, dx);
        const shift = (118 - distance) / 2;
        points[first].x -= Math.cos(angle) * shift;
        points[first].y -= Math.sin(angle) * shift;
        points[second].x += Math.cos(angle) * shift;
        points[second].y += Math.sin(angle) * shift;
      }
    }
  }

  const minX = Math.min(...points.map((point) => point.x));
  const minY = Math.min(...points.map((point) => point.y));
  const maxX = Math.max(...points.map((point) => point.x));
  const maxY = Math.max(...points.map((point) => point.y));
  const margin = 62; // Includes node markers, shadow, and space around the component.
  return {
    width: maxX - minX + margin * 2,
    height: maxY - minY + margin * 2,
    positions: new Map(
      points.map((point) => [point.id, { x: point.x - minX + margin, y: point.y - minY + margin }]),
    ),
  };
}
