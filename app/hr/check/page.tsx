"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import CameraCapture from "./Capture";
import Image from "next/image";
import { createAttendance, updateAttendance } from "@/app/lib/action";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("@/app/components/UI/MapView"), {
  ssr: false,
});
import { LatLngExpression } from "leaflet";

interface AttendanceProps {
  userId: string;
}
export default function AttendanceTracking() {
  // const AttendanceTracking: React.FC<AttendanceProps> = ({ userId }) => {
  const [location, setLocation] = useState<LatLngExpression>({
    lat: 0,
    lng: 0,
  });
  const [checkInPhoto, setCheckInPhoto] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handlePhotoCapture = (file: File) => {
    setCheckInPhoto(file);
    setIsCameraOpen(false);
  };

  const handleCheckIn = async () => {
    if (!checkInPhoto) {
      alert("Silakan ambil foto terlebih dahulu");
      return;
    }

    try {
      // Dapatkan lokasi saat ini
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });

        const checkInData = new FormData();
        checkInData.append("checkInTime", Date.now().toString());
        checkInData.append("inLatitude", latitude.toString());
        checkInData.append("inLongitude", longitude.toString());

        // const response = await axios.post('/api/attendance/check-in', checkInData);
        // console.log('Check-in berhasil:', response.data);

        console.log("Check-in data:", checkInData);

        await createAttendance(checkInData);

        console.log("Check-in data:", checkInData);
      });
    } catch (error) {
      console.error("Gagal check-in:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const checkOutData = new FormData();
        checkOutData.append("checkOutTime", Date.now().toString());
        checkOutData.append("outLatitude", latitude.toString());
        checkOutData.append("outLongitude", longitude.toString());

        console.log("Check-out data:", checkOutData);

        await updateAttendance(checkOutData);

        // const response = await axios.post('/api/attendance/check-out', checkOutData);
        // console.log('Check-out berhasil:', response.data);
        console.log("Check-out data:", checkOutData);
      });
    } catch (error) {
      console.error("Gagal check-out:", error);
    }
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.fileUrl;
  };

  return (
    <div className="grid grid-col-1 justify-center">
      <h2 className="">Kehadiran Hari Ini</h2>
      <p>Tanggal: {format(new Date(), "dd MMMM yyyy")}</p>

      <CameraCapture onCapture={handlePhotoCapture} />

      {checkInPhoto && (
        <div>
          <p>Foto telah diambil</p>
          <Image
            src={URL.createObjectURL(checkInPhoto)}
            alt="Captured"
            style={{ maxWidth: "200px" }}
            width={200}
            height={200}
          />
        </div>
      )}

      <MapView
        location={location}
        targetLocations={[
          { lat: -6.173, lng: 106.941 }, // Office Cakung
          { lat: -6.153857, lng: 107.016924 }, // WPU
          { lat: -6.130013, lng: 106.942239 }, // Office Nagrak
        ]}
        circleRadius={100}
      />

      <button className="btn btn-primary mx-2" onClick={handleCheckIn}>
        Check-In
      </button>
      <button className="btn btn-primary" onClick={handleCheckOut}>
        Check-Out
      </button>

      {location && (
        <div>
          <p>Lokasi Check-in:</p>
        </div>
      )}
    </div>
  );
}

// export default AttendanceTracking;
