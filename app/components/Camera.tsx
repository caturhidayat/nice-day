"use client";

import { useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera", error);
    }
  };

  // Take a photo
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, width, height);
      setPhoto(canvasRef.current.toDataURL("image/png"));
      stopCamera();
    }
  };

  // Save the photo
  const savePhoto = async () => {
    if (!photo) return;

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: photo }),
      });

      if (res.ok) {
        console.log("Photo uploaded successfully");
        setPhoto(null);
        stopCamera();
      } else {
        console.error("Failed to save the photo");
      }
    } catch (error) {
      console.error("Failed to Upload the photo", error);
    }
  };

  //   Stop the camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();

    tracks?.forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <div>
        <video ref={videoRef} autoPlay playsInline />
      </div>
      
      <button className="btn btn-accent" onClick={takePhoto}>
        Take Photo
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {photo && (
        <div>
          <img
            src={photo}
            alt="Capture"
            style={{ widows: "100%", height: "300px" }}
          />
          <button className="btn btn-primary my-4 block" onClick={savePhoto}>
            Save Photo
          </button>
        </div>
      )}
      {!photo && (
        <div className="grid">
          <button className="btn btn-primary block" onClick={startCamera}>
            Start Camera
          </button>
        </div>
      )}
    </div>
  );
}
