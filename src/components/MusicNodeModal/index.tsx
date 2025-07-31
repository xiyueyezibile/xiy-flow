import React, { useState, useEffect } from 'react';
import { Modal, Form, Slider } from 'antd';
import type { MusicNodeData } from '../../nodes/MusicNode';

interface MusicNodeModalProps {
  visible: boolean;
  data: MusicNodeData;
  onClose: () => void;
  onSave: (data: MusicNodeData) => void;
}

export const MusicNodeModal: React.FC<MusicNodeModalProps> = ({ visible, data, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (visible) {
      setVolume(data.volume || 100);
      form.setFieldsValue({ volume: data.volume || 100 });
    }
  }, [visible, data, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSave({ ...data, volume: values.volume });
      onClose();
    });
  };

  return (
    <Modal
      title="音频节点设置"
      open={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
      maskClosable={false}
    >
      <Form form={form} layout="vertical" initialValues={{ volume }}>
        <Form.Item
          name="volume"
          label="音量"
          rules={[{ required: true, message: '请设置音量' }]}
        >
          <Slider
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={setVolume}
            tooltipVisible={true}
          />
          <div style={{ textAlign: 'center', marginTop: 16 }}>{volume}%</div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MusicNodeModal;