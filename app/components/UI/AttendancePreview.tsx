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
import axios from "axios";
import { API_URL } from "@/app/lib/constants/api";
import { Button } from "@/components/ui/button";

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
      canvasRef.current.toBlob((blob) => {
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
      }, "image/jpeg", 0.8); // 0.8 quality for better file size
    }
  };

  // const uploadPhoto = async (file: File): Promise<string> => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   const response = await axios.post(
  //     `${API_URL}/attendances/${attendanceId}/image`,
  //     formData,
  //     {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     }
  //   );

  //   return response.data.fileUrl;
  // };

  // * Save attendance
  const saveAttendance = async () => {
    try {
      if (!location) {
        toast.error("Lokasi tidak ditemukan");
        return;
      }

      const formData = new FormData();

      if (mode === "in") {
        if (!checkInPhoto) {
          toast.error("Silakan ambil foto terlebih dahulu");
          return;
        }

        console.log("checkInPhoto file :", checkInPhoto);
        formData.append("inLatitude", (location as any).lat);
        formData.append("inLongitude", (location as any).lng);
        formData.append("checkInTime", checkInTime?.toString() || "");
        formData.append("image", checkInPhoto);

        // Upload check-in photo
        // const checkInPhotoUrl = await uploadPhoto(checkInPhoto);
        // formData.append("checkInPhotoUrl", checkInPhotoUrl);
      } else if (mode === "out") {
        if (!checkOutPhoto) {
          toast.error("Silakan ambil foto terlebih dahulu");
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
        toast.error(response.error);
        return;
      }

      toast.success(
        mode === "in" ? "Berhasil Check In!" : "Berhasil Check Out!"
      );
      router.push("/hr");
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
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
