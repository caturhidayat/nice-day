// app/page.js
"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

// Dynamic import komponen Map
const Map = dynamic(() => import("../../components/UI/PreviewRecord"), {
    ssr: false,
});

const HomePage = () => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    }); // Default lokasi marker
    const circleCenter: LatLngExpression = [106.941418, -6.173130]; // Pusat lingkaran
    const circleRadius = 500; // Radius lingkaran dalam meter

    // Fungsi untuk mendapatkan lokasi
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error obtaining location", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <h1>Aplikasi Absensi</h1>
            <button onClick={getLocation}>Dapatkan Lokasi</button>
            <Map
                latitude={location.latitude}
                longitude={location.longitude}
                circleCenter={circleCenter}
                circleRadius={circleRadius}
            />
        </div>
    );
};

export default HomePage;
