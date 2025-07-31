import { create } from 'zustand';
import type { MusicNodeData } from '../nodes/MusicNode';

interface ModalState {
  activeModal: {
    type: 'musicNode' | null;
    nodeId: string;
    data: MusicNodeData;
  };
  openMusicNodeModal: (nodeId: string, data: MusicNodeData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: { type: null, nodeId: '', data: { label: '' } },
  openMusicNodeModal: (nodeId, data) => set({
    activeModal: { type: 'musicNode', nodeId, data }
  }),
  closeModal: () => set({
    activeModal: { type: null, nodeId: '', data: { label: '' } }
  })
}));