// app/page.js
"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression, Map as LeafletMap } from "leaflet";

// Dynamic import komponen Map
const Map = dynamic(() => import("../../components/UI/PreviewRecord"), {
    ssr: false,
});

const HomePage = () => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    }); // Default lokasi marker

    const mapRef = useRef<LeafletMap | null>(null);

    const circleCenter: LatLngExpression = [-6.173, 106.941]; // Pusat lingkaran
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

                    // Set marker ke lokasi user
                    if (mapRef.current) {
                        mapRef.current.flyTo(
                            [
                                position.coords.latitude,
                                position.coords.longitude,
                            ],
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

    return (
        <div>
            <h1>Aplikasi Absensi</h1>
            <Map
                latitude={location.latitude}
                longitude={location.longitude}
                circleCenter={circleCenter}
                circleRadius={circleRadius}
                mapRef={mapRef}
            />
            <button className="btn btn-neutral" onClick={getLocation}>Dapatkan Lokasi</button>
        </div>
    );
};

export default HomePage;
