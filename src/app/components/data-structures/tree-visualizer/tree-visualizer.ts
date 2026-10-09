import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TreeSnapshot } from '../../../core/visualization/structure-snapshot';
@Component({
  selector: 'app-tree-visualizer',
  templateUrl: './tree-visualizer.html',
  styleUrl: './tree-visualizer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeVisualizer {
  readonly snapshot = input.required<TreeSnapshot>();
  readonly hasLongestPath = computed(() =>
    this.snapshot().nodes.some((node) => node.marker === 'Longest path'),
  );
  readonly layout = computed(() => {
    const nodes = this.snapshot().nodes;
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const levelOf = (id: string, path = new Set<string>()): number => {
      const parent = byId.get(id)?.parentId;
      if (!parent || !byId.has(parent) || path.has(id)) {
        return 0;
      }
      path.add(id);
      return 1 + levelOf(parent, path);
    };
    const levels = new Map(nodes.map((node) => [node.id, levelOf(node.id)]));
    const maxPeers = Math.max(
      1,
      ...[...new Set(levels.values())].map(
        (level) => nodes.filter((node) => levels.get(node.id) === level).length,
      ),
    );
    const width = Math.max(360, maxPeers * 110);
    const height = Math.max(130, (Math.max(0, ...levels.values()) + 1) * 110);
    const positioned = nodes.map((node) => {
      const level = levels.get(node.id)!;
      const peers = nodes.filter((peer) => levels.get(peer.id) === level);
      return {
        ...node,
        x: ((peers.indexOf(node) + 0.5) * width) / peers.length,
        y: 45 + level * 110,
      };
    });
    const positions = new Map(positioned.map((node) => [node.id, node]));
    const edges = positioned
      .filter((node) => node.parentId && positions.has(node.parentId))
      .map((node) => ({ from: positions.get(node.parentId!)!, to: node }));
    return { width, height, nodes: positioned, edges };
  });
}
