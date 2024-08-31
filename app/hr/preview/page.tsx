// app/page.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import { getDate, getDateTime } from "@/app/common/utils/get-date";

// Dynamic import komponen Map
const MapView = dynamic(() => import("../../components/UI/PreviewRecord"), {
  ssr: false,
});

// Target Locations
const TargetLocations = [
  { lat: -6.173, lng: 106.941 }, // Office Cakung
  { lat: -6.21, lng: 106.826666 }, // Lokasi 2
  { lat: -6.22, lng: 106.836666 }, // Lokasi 3
];

const RADIUS = 150;

const PreviewPage = () => {
  // Location State
  const [location, setLocation] = useState<LatLngExpression>({
    lat: 0,
    lng: 0,
  });
  const mapRef = useRef<LeafletMap | null>(null);

  //   Photo State
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inRadius, setInRadius] = useState(false);

  // Circle Location (HO Cakung)
  const circleCenter: LatLngExpression = [-6.173, 106.941];
  // Radius Circle (150 meter)
  const circleRadius = 150;

  // Function to get user location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new L.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // Calculate distance between user location and target locations
          const targetLatLng = TargetLocations.some((target) => {
            const targetLocation = new L.LatLng(target.lat, target.lng);
            const distance = userLocation.distanceTo(targetLocation);
            return distance <= RADIUS;
          });

          setInRadius(targetLatLng);
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
        video: { facingMode: "user", width: 200 },
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

  // Save attendance
  const saveAttendance = async () => {
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
    <div className="grid grid-cols-1 w-auto gap-4">
      <div className="justify-center">
        {photo ? (
          <>
            <MapView
              position={location}
              targetLocations={TargetLocations}
              circleRadius={RADIUS}
            />
            <div className="grid justify-center py-4">
              <h1 className="font-semibold text-lg">{`${getDate()} - ${getDateTime()}`}</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={photo}
                alt="Preview"
                className="rounded-lg"
                width={180}
                height={500}
              />
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
      <div className="flex flex-col items-center justify-center gap-2">
        {!isCameraOn && (
          <button
            className="btn btn-secondary"
            onClick={inRadius ? saveAttendance : getLocation}
          >
            {inRadius ? "Save Attendance" : "Refresh Location"}
          </button>
        )}
      </div>
      <div className=""></div>
    </div>
  );
};

export default PreviewPage;
