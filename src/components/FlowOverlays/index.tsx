

import React from 'react';
import MusicNodeModal from '../MusicNodeModal';
import { useModalStore } from '../../stores/modalStore';
import { useFlowStore } from '../../stores/flowStore';

export const FlowOverlays: React.FC = () => {
  const { activeModal, closeModal } = useModalStore();
  const updateNodeData = useFlowStore(state => state.updateNodeData);

  const handleSaveMusicNode = (updatedData: any) => {
    updateNodeData(activeModal.nodeId, updatedData);
    closeModal();
  };

  return (
    <>
      {activeModal.type === 'musicNode' && (
        <MusicNodeModal
          visible={true}
          data={activeModal.data}
          onClose={closeModal}
          onSave={handleSaveMusicNode}
        />
      )}
    </>
  );
};

export default FlowOverlays;