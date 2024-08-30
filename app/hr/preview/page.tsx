// app/page.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression, Map as LeafletMap } from "leaflet";

// Dynamic import komponen Map
const Map = dynamic(() => import("../../components/UI/PreviewRecord"), {
  ssr: false,
});

const PreviewPage = () => {
  // Location State
  const [location, setLocation] = useState<LatLngExpression>([0, 0]);
  const mapRef = useRef<LeafletMap | null>(null);

  //   Photo State
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Circle Location (HO Cakung)
  const circleCenter: LatLngExpression = [-6.173, 106.941];
  // Radius Circle (150 meter)
  const circleRadius = 150;

  // Function to get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
          // Set marker to user location
          if (mapRef.current) {
            mapRef.current.flyTo(
              [position.coords.latitude, position.coords.longitude],
              15,
              {
                animate: true,
                duration: 1.5,
              }
            );
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Get user location on page load
  useEffect(() => {
    getLocation();
  }, []);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error("Error accessing the camera", error);
    }
  };

  // Call the startCamera function when the component mounts
  useEffect(() => {
    if (videoRef.current && !photo) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, []);

  // Stop the camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();

    tracks?.forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
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
      setIsCameraOn(false);
      stopCamera();
    }
  };

    // Save the photo
    const savePhoto = async () => {
      if (!photo) return;
  
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photo }),
        });
  
        if (response.ok) {
          console.log("Photo uploaded successfully");
        } else {
          console.error("Failed to upload photo");
        }
      } catch (error) {
        console.error("Error uploading photo", error);
      }
    };

  return (
    <div className="grid grid-cols-1 w-auto gap-2">
      <div className="justify-center">
        {photo ? (
          <>
            <Map
              position={location}
              circleCenter={circleCenter}
              circleRadius={circleRadius}
              mapRef={mapRef}
              getLocation={getLocation}
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <img src={photo} alt="Preview"
                className="w-64 h-64 object-cover rounded-lg" />
                <button className="btn btn-primary btn-md" onClick={savePhoto}>
                  Save Photo
                </button>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            <div className="flex flex-col items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full"
                autoPlay
                playsInline
              ></video>
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              {isCameraOn ? (
                <button className="btn btn-primary btn-md" onClick={takePhoto}>
                  Take Photo
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className=""></div>
    </div>
  );
};

export default PreviewPage;
