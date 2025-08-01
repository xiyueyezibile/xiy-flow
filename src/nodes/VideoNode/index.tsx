import { Handle, Position } from "@xyflow/react"
import { useState, useRef } from 'react'
import { Slider } from 'antd';

interface NodePorps {
  data: {
    label: string
  }
}
export function VideoNode({ data }: NodePorps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>('');
  const [volume, setVolume] = useState<number>(100);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas) {
        video.src = URL.createObjectURL(file);
        video.onloadedmetadata = () => {
          const minutes = Math.floor(video.duration / 60);
          const seconds = Math.floor(video.duration % 60);
          setDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          video.currentTime = 0;
          video.onseeked = () => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              setCoverUrl(canvas.toDataURL('image/jpeg'));
            }
          };
        };
      }
    }
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = handleFileChange;
    input.click();
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
    }
  };

  return <div className="w-[200px] h-[240px] border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Bottom} />

    {!videoFile ? (
      <button 
        onClick={handleUploadClick}
        className="w-full h-full bg-gray-200 border-0 cursor-pointer text-sm"
      >
        上传视频
      </button>
    ) : (
      <>{coverUrl && (
          <img 
            src={coverUrl} 
            alt="Video Cover" 
            className="w-full h-[200px] object-cover"
          />
        )}
        <div className="p-2 text-center text-xs text-gray-600">
          {duration}
          <div className="mt-2 w-[80%] mx-auto">
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>
      </>
    )}

    <video ref={videoRef} className="hidden" />
    <canvas ref={canvasRef} className="hidden" />
  </div>
}