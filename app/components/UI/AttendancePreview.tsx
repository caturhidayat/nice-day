"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import L, { LatLngExpression, Map as leafletMap } from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { createAttendance } from "@/app/hr/attendance/actions/create-attendance";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";
import dayjs from "dayjs";
import LocalizeFormat from "dayjs/plugin/localizedFormat";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

dayjs.extend(LocalizeFormat);

// Dynamic import komponen Map
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

// Target Locations
const TargetLocations = [
  { lat: -6.173, lng: 106.941 }, // Office Cakung
  { lat: -6.153857, lng: 107.016924 }, // WPU
  { lat: -6.130013, lng: 106.942239 }, // Office Nagrak
];

const RADIUS = 150;

export default function AttendancePreview() {
  //  * State
  const [location, setLocation] = useState<LatLngExpression>({
    lat: 0,
    lng: 0,
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [inRadius, setInRadius] = useState(false);
  const [response, setResponse] = useState<FormResponse>();
  const [checkInTime, setCheckInTime] = useState<string>();
  const [checkOutTime, setCheckOutTime] = useState<string>();

  // * Router
  const router = useRouter();

  // * Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<leafletMap | null>(null);

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
      if (!checkInTime) {
        setCheckInTime(dayjs().toISOString());
      }
      setIsCameraOn(false);
      stopCamera();
    }
  };

  // Save attendance
  const saveAttendance = async () => {
    // if (!photo || !location) return;

    // const blob = await fetch(photo).then((res) => res.blob());
    const formData = new FormData();
    const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    // formData.append("image", blob, imageName);
    formData.append("inLatitude", (location as any).lat);
    formData.append("inLongitude", (location as any).lng);
    formData.append("checkInTime", checkInTime?.toString() || "");

    // console.log("check In time : ", checkInTime);
    // console.log("lon", (location as any).lng);
    // console.log("lon", (location as any).lat);

    const response = await createAttendance(formData);
    if (response.error) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-md font-medium text-gray-900">Error</p>
                <p className="mt-1 text-sm text-gray-500">
                  {response.error}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      router.push("/hr");
    }


    setResponse(response);

    if (response.error) {
      console.error("error", response.error);
    } else {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-md font-medium text-gray-900">
                  Attendance Saved
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  your attendance at {dayjs(checkInTime).format("LLL")} has been
                  saved
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ));
      setTimeout(() => {
        router.push("/hr");
      }, 2000);
    }
    // console.log("response", response);
  };

  return (
    <div className="grid grid-cols-1 w-auto gap-4 justify-center">
      <div className="justify-center">
        {photo ? (
          <>
            <MapView
              location={location}
              targetLocations={TargetLocations}
              circleRadius={RADIUS}
            />
            <div className="grid justify-center py-4">
              <h1 className="font-semibold text-lg">
                {dayjs(checkInTime).format("LLL")}
              </h1>
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
