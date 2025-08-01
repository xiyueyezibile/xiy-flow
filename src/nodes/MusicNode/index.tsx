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
    <div className="w-[200px] h-[160px] border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />

      {!audioFile ? (
        <Button 
          onClick={handleUploadClick}
          className="w-full h-full"
        >
          上传音频/视频
        </Button>
      ) : (
        <div className="p-3 text-center">
          <div className="w-full h-[80px] bg-gray-200 rounded-md mb-2 flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
          <div className="text-xs text-gray-600 mb-2">{duration}</div>
          <Button onClick={handleOpenVolumeModal} size="small" className="w-[80%]">
            调整音量
          </Button>
        </div>
      )}

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}