import { create } from "zustand";
import type { Node, Edge } from "@xyflow/react";
import { initialNodes, initialEdges } from "../nodes";
import type { MusicNodeData } from "../nodes/MusicNode";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeId: string, data: Partial<MusicNodeData>) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  updateNodeData: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
}));
