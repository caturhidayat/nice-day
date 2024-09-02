"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import L, { LatLngExpression, Map as leafletMap } from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { getDate } from "@/app/common/utils/get-date";
import { API_URL } from "@/app/common/constants/api";
import { getHeaders, post } from "@/app/common/utils/fetch";

// Dynamic import komponen Map
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

// Target Locations
const TargetLocations = [
  { lat: -6.173, lng: 106.941 }, // Office Cakung
  { lat: -6.153857, lng: 107.016924 }, // WPU
  { lat: -6.22, lng: 106.836666 }, // Lokasi 3
];

const RADIUS = 150;

export default function AttendancePreview() {
  // Location State
  const [location, setLocation] = useState<LatLngExpression>({
    lat: 0,
    lng: 0,
  });

  //  * State
  const [localTime, setLocalTime] = useState<any>(null);
  const [isoTime, setIsoTime] = useState<any>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<leafletMap | null>(null);
  const [inRadius, setInRadius] = useState(false);

  // Function to get user location
  const getLocation = async () => {
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

          mapRef.current?.flyTo(userLocation, 15, {
            animate: true,
            duration: 1.5,
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

  // Stop the camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();

    tracks?.forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  // Get user location on page load
  useEffect(() => {
    startCamera();
    getLocation();

    return () => {
      stopCamera();
    };
  }, []);

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
      setLocalTime(`${getDate().toLocaleTimeString()}`);
      setIsoTime(`${getDate().toISOString()}`);
    }
  };

  // Save attendance
  const saveAttendance = async () => {
    if (!photo) return;

    try {
      const uploadImage = await fetch("/api/save-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo }),
      });

      // const checkIn = await fetch(`http://localhost:3333/attendance/check-in`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json", ...getHeaders(),
      //   },
      //   body: JSON.stringify({
      //     time: isoTime,
      //     location: {
      //       lat: (location as any).lat,
      //       lng: (location as any).lng,
      //     },
      //   }),
      // });


      // if (checkIn.ok && uploadImage.ok) {
      //   console.log("Attendance saved successfully");
      // } else {
      //   console.error("Failed to save attendance");
      // }


      // if (checkIn.ok) {
      //   console.log("Attendance saved successfully");
      // } else {
      //   console.error("Failed to save attendance");
      // }

      if (uploadImage.ok) {
        console.log("Photo uploaded successfully");
      } else {
        console.error("Failed to upload photo");
      }
      

    } catch (error) {
      console.error("Error uploading photo", error);
    }
  };

  console.log(1, localTime);
  console.log(2, isoTime);

  return (
    <div className="grid grid-cols-1 w-auto gap-4">
      <div className="justify-center">
        {photo ? (
          <>
            <MapView
              location={location}
              targetLocations={TargetLocations}
              circleRadius={RADIUS}
              // mapRef={mapRef}
            />

            <div className="grid justify-center py-4">
              <h1 className="font-semibold text-lg">{localTime}</h1>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={photo}
                alt="Preview"
                className="rounded-lg"
                width={120}
                height={200}
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
            <div className="grid items-center justify-center gap-2">
              {isCameraOn ? (
                <button className="btn btn-primary" onClick={takePhoto}>
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
            className={`btn ${inRadius ? "btn-primary" : "btn-error"}`}
            onClick={inRadius ? saveAttendance : getLocation}
          >
            {inRadius ? "Save Attendance" : "Refresh Location"}
          </button>
        )}
      </div>
      <div className=""></div>
    </div>
  );
}
