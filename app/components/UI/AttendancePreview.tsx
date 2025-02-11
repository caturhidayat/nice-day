"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import L, { LatLngExpression, Map as leafletMap } from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { FormResponse } from "@/app/lib/interfaces/form-response.interface";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createAttendance, updateAttendance } from "@/app/lib/action";
import { AttendancePreviewProps } from "@/app/lib/interfaces/attendance.interface";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";


// Dynamic import komponen Map
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

// -6.2785393106250345, 107.15864398307146 
// -6.278292210508911, 107.295504867729
// -6.245460747124666, 107.28079689656437
// -6.374668342338985, 107.32776063928956
// -6.196474488258041, 106.97737172725586
// const TargetLocations = [
//   { lat: -6.173, lng: 106.941 }, // Office Cakung
// * -6.172872, 106.941640 // Office Cakung
//   { lat: -6.153857, lng: 107.016924 }, // WPU
//   { lat: -6.130013, lng: 106.942239 }, // Office Nagrak
// * -6.129503750410665, 106.94506771794923 // Nagrak
//   { lat: -6.2785393106250345, lng: 107.15864398307146 }, // Office Jl. Tekno raya
// * -6,274988, 107,159851 // Office Jl. Tekno raya GENESIS yelo3
//   { lat: -6.278292210508911, lng: 107.295504867729 }, // Office KRWG Tanjung Pura
// * -6.278472108300512, 107.2955143129147 // Office KRWG Tanjung Pura karawang 2
//   { lat: -6.245460747124666, lng: 107.28079689656437 }, // Office KRWG Tunggakjati
// -6.246722, 107.281064 // Office KRWG Tunggakjati
// -6.3800194403391535, 107.32365024954318 // Office KRWG SLP main
// * -6.380323846727715, 107.32358433007559 // Office KRWG SLP
// * -6,199584, 106,976736 // Office Yamaha motor PU
// * -6.249241202375471, 107.2798416588952 // Karawang Logistics Center
// ];
// Target Locations
export const TargetLocationsWithRadius = [
  { location: { lat: -6.172872, lng: 106.941640 }, radius: 150 }, // Office Cakung
  { location: { lat: -6.153857, lng: 107.016924 }, radius: 150 }, // WPU
  { location: { lat: -6.129503750410665, lng: 106.94506771794923 }, radius: 450 }, // Nagrak
  { location: { lat: -6.274988, lng: 107.159851 }, radius: 100 }, // Office Jl. Tekno raya GENESIS yelo3
  { location: { lat: -6.278472108300512, lng: 107.2955143129147 }, radius: 100 }, // Office KRWG Tanjung Pura karawang 2
  { location: { lat: -6.246722, lng: 107.281064 }, radius: 120 }, // Office KRWG Tunggakjati
  { location: { lat: -6.380323846727715, lng: 107.32358433007559 }, radius: 100 }, // Office KRWG SLP
  { location: { lat: -6.199584, lng: 106.976736 }, radius: 70 }, // Office PU Yamaha motor
  { location: { lat: -6.249241202375471, lng: 107.2798416588952 }, radius: 50 }, // Karawang Logistics Center
];

const RADIUS = 200;

export default function AttendancePreview({
  mode,
  attendanceId,
}: AttendancePreviewProps) {
  // console.log("attendanceId props : ", attendanceId);
  //  * State
  const [location, setLocation] = useState<LatLngExpression>({
    lat: 0,
    lng: 0,
  });
  const [photo, setPhoto] = useState<string>("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [inRadius, setInRadius] = useState(false);
  const [response, setResponse] = useState<FormResponse>();
  const [checkInTime, setCheckInTime] = useState<number>();
  const [checkOutTime, setCheckOutTime] = useState<number>();

  const [checkInPhoto, setCheckInPhoto] = useState<File | null>(null);
  const [checkOutPhoto, setCheckOutPhoto] = useState<File | null>(null);

  // * Router
  const router = useRouter();

  // * Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<leafletMap | null>(null);

  // * Function to get user location
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
            duration: 0.5,
          });

          // Calculate distance between user location and target locations
          const targetLatLng = TargetLocationsWithRadius.some((target) => {
            const targetLocation = new L.LatLng(target.location.lat, target.location.lng);
            const distance = userLocation.distanceTo(targetLocation);
            return distance <= target.radius;
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

  // * Start the camera
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

  // * Stop the camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();

    tracks?.forEach((track) => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  // * Get user location on page load
  useEffect(() => {
    startCamera();
    getLocation();
    setCheckInTime(Date.now());
    setCheckOutTime(Date.now());

    return () => {
      stopCamera();
    };
  }, []);

  // Take a photo
  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, width, height);

      // Convert canvas data to blob
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            const fileName = "image.jpeg";
            const file = new File([blob], fileName, { type: "image/jpeg" });

            // Set photo based on whether it's check-in or check-out
            if (mode === "in") {
              setCheckInPhoto(file);
            } else {
              setCheckOutPhoto(file);
            }

            // Save preview
            setPhoto(canvasRef.current!.toDataURL("image/jpeg"));

            // Turn off camera after taking photo
            setIsCameraOn(false);
            stopCamera();
          }
        },
        "image/jpeg",
        0.8
      ); // 0.8 quality for better file size
    }
  };

  // * Save attendance Toast
  const saveAttendance = async () => {
    try {
      if (!location) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Error</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Location not found
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
        return;
      }

      const formData = new FormData();

      if (mode === "in") {
        if (!checkInPhoto) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Error!</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please take photo first
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
          return;
        }

        // Attendance Date in epoch
        const today = new Date().getTime();

        console.log("checkInPhoto file :", checkInPhoto);
        formData.append("attendanceDate", today.toString());
        formData.append("inLatitude", (location as any).lat);
        formData.append("inLongitude", (location as any).lng);
        formData.append("checkInTime", checkInTime?.toString() || "");
        formData.append("image", checkInPhoto);

        // Upload check-in photo
        // const checkInPhotoUrl = await uploadPhoto(checkInPhoto);
        // formData.append("checkInPhotoUrl", checkInPhotoUrl);
      } else if (mode === "out") {
        if (!checkOutPhoto) {
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">Error!</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please take photo first
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
          return;
        }
        formData.append("outLatitude", (location as any).lat);
        formData.append("outLongitude", (location as any).lng);
        formData.append("checkOutTime", checkOutTime?.toString() || "");
        formData.append("image", checkOutPhoto);

        // Upload check-out photo
        // const checkOutPhotoUrl = await uploadPhoto(checkOutPhoto);
        // formData.append("checkOutPhotoUrl", checkOutPhotoUrl);
      }

      // Save attendance data
      // console.log("formData : ", formData);
      const response = await (mode === "in"
        ? createAttendance(formData)
        : updateAttendance(formData));

      if (response?.error) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Error!</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {response?.error}
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
        return;
      }

      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Success!</p>
                <p className="mt-1 text-sm text-gray-500">
                  {mode === "in"
                    ? "Check-in has been saved successfully"
                    : "Check-out has been saved successfully"}
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
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">Error!</p>
                <p className="mt-1 text-sm text-gray-500">
                  {error instanceof Error ? error.message : "Unknown error"}
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
    }
  };

  return (
    <div className="grid grid-cols-1 w-auto gap-4 justify-center">
      <div className="justify-center">
        {photo ? (
          <>
            <MapView
              location={location}
              targetLocationsWithRadius={TargetLocationsWithRadius}
              // targetLocations={TargetLocationsWithRadius}
              // circleRadius={TargetLocationsWithRadius.radius}
            />
            <div className="grid justify-center py-4">
              <h1 className="font-semibold text-lg">
                {checkInTime && format(new Date(checkInTime), "PPpp")}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={photo}
                alt="Preview"
                className="rounded-lg"
                width={180}
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
            <div className="grid gap-2 p-2">
              {isCameraOn ? (
                <Button onClick={takePhoto} className="w-full">
                  Take Photo
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 p-2">
        {!isCameraOn && (
          <Button
            variant={inRadius ? "default" : "destructive"}
            onClick={inRadius ? saveAttendance : getLocation}
            className="w-full"
          >
            {inRadius ? "Save Attendance" : "Refresh Location"}
          </Button>
        )}
      </div>
      <div className=""></div>
    </div>
  );
}
