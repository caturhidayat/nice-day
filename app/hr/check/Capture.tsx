'use client';

import React, { useRef, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setStreaming(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      canvas.getContext('2d')?.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
          onCapture(file);
        }
      }, 'image/jpeg');
    }

    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  }

  return (
    <div>
      {!streaming && (
        <button onClick={startCamera} className='btn btn-warning'>
          Aktifkan Kamera
        </button>
      )}

      <video 
        ref={videoRef} 
        style={{ display: streaming ? 'block' : 'none', maxWidth: '100%' }}
        onCanPlay={() => setStreaming(true)}
      />

      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
      />

      {streaming && (
        <button onClick={capturePhoto} className='btn btn-secondary'>
          Ambil Foto
        </button>
      )}
    </div>
  );
};

export default CameraCapture;