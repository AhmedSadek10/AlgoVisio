import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import {
  layoutGraph,
  GRAPH_NODE_RADIUS,
  GraphPosition,
} from '../../../core/visualization/graph-layout';
import { GraphSnapshot } from '../../../core/visualization/structure-snapshot';
let nextGraphId = 0;
@Component({
  selector: 'app-graph-visualizer',
  templateUrl: './graph-visualizer.html',
  styleUrl: './graph-visualizer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphVisualizer {
  readonly snapshot = input.required<GraphSnapshot>();
  readonly nodeSelect = output<string>();
  readonly identifier = 'structure-graph-' + nextGraphId++;
  readonly nodeRadius = GRAPH_NODE_RADIUS;
  private readonly topology = computed(
    () => ({
      nodeIds: this.snapshot().nodes.map((node) => node.id),
      edges: this.snapshot().edges.map(({ from, to }) => ({ from, to })),
    }),
    { equal: (previous, current) => JSON.stringify(previous) === JSON.stringify(current) },
  );
  private readonly geometry = computed(() =>
    layoutGraph(this.topology().nodeIds, this.topology().edges),
  );
  private readonly customPositions = linkedSignal(() => {
    this.topology();
    return new Map<string, GraphPosition>();
  });
  readonly selectedNode = linkedSignal<string | null>(() => {
    this.topology();
    return null;
  });
  readonly draggingNode = signal<string | null>(null);
  readonly hasCustomPositions = computed(() => this.customPositions().size > 0);
  private drag: {
    id: string;
    pointerId: number;
    element: SVGGElement;
    pointer: GraphPosition;
    position: GraphPosition;
    clientX: number;
    clientY: number;
    topology: ReturnType<GraphVisualizer['topology']>;
  } | null = null;
  private suppressClick = false;

  readonly layout = computed(() => {
    const graph = this.snapshot();
    const { width, height } = this.geometry();
    const positions = new Map([...this.geometry().positions, ...this.customPositions()]);
    const nodes = graph.nodes.map((node) => ({
      ...node,
      ...positions.get(node.id)!,
      labelSize: Math.min(22, 60 / (Math.max(1, node.label.length) * 0.62)),
      detailSize: Math.min(12, 60 / (Math.max(1, node.detail?.length ?? 0) * 0.62)),
    }));
    const connections = new Set(graph.edges.map((edge) => JSON.stringify([edge.from, edge.to])));
    const edges = graph.edges.flatMap((edge) => {
      const from = positions.get(edge.from);
      const to = positions.get(edge.to);
      if (!from || !to || edge.from === edge.to) {
        return [];
      }
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.hypot(dx, dy) || 1;
      const curved = graph.directed && connections.has(JSON.stringify([edge.to, edge.from]));
      const bend = curved ? 44 : 0;
      const controlX = (from.x + to.x) / 2 - (dy / distance) * bend;
      const controlY = (from.y + to.y) / 2 + (dx / distance) * bend;
      const startLength = Math.hypot(controlX - from.x, controlY - from.y) || 1;
      const endLength = Math.hypot(controlX - to.x, controlY - to.y) || 1;
      const startRadius = GRAPH_NODE_RADIUS + 3;
      const endRadius = GRAPH_NODE_RADIUS + (graph.directed ? 9 : 3);
      const x1 = from.x + ((controlX - from.x) / startLength) * startRadius;
      const y1 = from.y + ((controlY - from.y) / startLength) * startRadius;
      const x2 = to.x + ((controlX - to.x) / endLength) * endRadius;
      const y2 = to.y + ((controlY - to.y) / endLength) * endRadius;
      return [
        {
          ...edge,
          path: curved
            ? `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`
            : `M ${x1} ${y1} L ${x2} ${y2}`,
          labelX: curved ? (x1 + 2 * controlX + x2) / 4 : (x1 + x2) / 2,
          labelY: curved ? (y1 + 2 * controlY + y2) / 4 : (y1 + y2) / 2,
        },
      ];
    });
    return { width, height, nodes, edges };
  });

  selectNode(id: string, pointerClick = true): void {
    if (pointerClick && this.suppressClick) {
      this.suppressClick = false;
      return;
    }
    this.suppressClick = false;
    this.selectedNode.set(id);
    if (this.snapshot().selectable !== false) {
      this.nodeSelect.emit(id);
    }
  }

  beginDrag(event: PointerEvent, id: string): void {
    if (event.button !== 0 || !event.isPrimary) {
      return;
    }
    const element = event.currentTarget as SVGGElement;
    const pointer = this.graphPoint(event, element);
    const position = this.layout().nodes.find((node) => node.id === id);
    if (!pointer || !position) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    element.focus();
    element.setPointerCapture(event.pointerId);
    this.suppressClick = false;
    this.selectedNode.set(id);
    this.drag = {
      id,
      pointerId: event.pointerId,
      element,
      pointer,
      position,
      clientX: event.clientX,
      clientY: event.clientY,
      topology: this.topology(),
    };
  }

  moveDrag(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }
    if (drag.topology !== this.topology()) {
      this.endDrag(event);
      return;
    }
    if (
      !this.draggingNode() &&
      Math.hypot(event.clientX - drag.clientX, event.clientY - drag.clientY) < 4
    ) {
      return;
    }
    const pointer = this.graphPoint(event, drag.element);
    if (!pointer) {
      return;
    }
    event.preventDefault();
    this.draggingNode.set(drag.id);
    this.suppressClick = true;
    this.moveNode(drag.id, {
      x: drag.position.x + pointer.x - drag.pointer.x,
      y: drag.position.y + pointer.y - drag.pointer.y,
    });
  }

  endDrag(event: PointerEvent): void {
    if (!this.drag || this.drag.pointerId !== event.pointerId) {
      return;
    }
    const { element, pointerId } = this.drag;
    this.drag = null;
    this.draggingNode.set(null);
    if (element.hasPointerCapture(pointerId)) {
      element.releasePointerCapture(pointerId);
    }
  }

  moveByKey(event: KeyboardEvent, id: string): void {
    const delta: Record<string, GraphPosition> = {
      ArrowLeft: { x: -10, y: 0 },
      ArrowRight: { x: 10, y: 0 },
      ArrowUp: { x: 0, y: -10 },
      ArrowDown: { x: 0, y: 10 },
    };
    const offset = delta[event.key];
    if (!offset || event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const node = this.layout().nodes.find((node) => node.id === id);
    if (!node) {
      return;
    }
    this.selectedNode.set(id);
    this.moveNode(id, { x: node.x + offset.x, y: node.y + offset.y });
  }

  resetPositions(): void {
    this.customPositions.set(new Map());
  }

  clearSelection(): void {
    this.selectedNode.set(null);
  }

  private moveNode(id: string, position: GraphPosition): void {
    const { width, height } = this.geometry();
    const margin = GRAPH_NODE_RADIUS + 12;
    const point = {
      x: Math.max(margin, Math.min(width - margin, position.x)),
      y: Math.max(margin, Math.min(height - margin - 16, position.y)),
    };
    this.customPositions.update((positions) => new Map(positions).set(id, point));
  }

  private graphPoint(event: PointerEvent, element: SVGGElement): GraphPosition | null {
    const matrix = element.ownerSVGElement?.getScreenCTM();
    if (!matrix) {
      return null;
    }
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
  }
}
