import { Handle, Position } from "@xyflow/react";
import { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { useModalStore } from '@/stores/modalStore';

export interface MusicNodeData {
  label: string;
  volume?: number;
}

interface NodeProps {
  data: MusicNodeData;
  id: string;
}

export function MusicNode({ data, id }: NodeProps) {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const openMusicNodeModal = useModalStore(state => state.openMusicNodeModal);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      setAudioFile(file);
      const audio = audioRef.current;
      if (audio) {
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
          const minutes = Math.floor(audio.duration / 60);
          const seconds = Math.floor(audio.duration % 60);
          setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };
      }
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*,video/*';
    input.onchange = handleFileChange;
    input.click();
  };

  const handleOpenVolumeModal = () => {
    openMusicNodeModal(id, data);
  };

  useEffect(() => {
    if (audioRef.current && data.volume !== undefined) {
      audioRef.current.volume = data.volume / 100;
    }
  }, [data.volume]);

  return (
    <div style={{ width: '200px', height: '160px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5' }}>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />

      {!audioFile ? (
        <Button 
          onClick={handleUploadClick}
          style={{ width: '100%', height: '100%' }}
        >
          上传音频/视频
        </Button>
      ) : (
        <div style={{ padding: '12px', textAlign: 'center' }}>
          <div style={{ width: '100%', height: '80px', backgroundColor: '#e8e8e8', borderRadius: '4px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '24px' }}>🎵</span>
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{duration}</div>
          <Button onClick={handleOpenVolumeModal} size="small" style={{ width: '80%' }}>
            调整音量
          </Button>
        </div>
      )}

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}