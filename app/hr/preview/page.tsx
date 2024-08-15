// app/page.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { LatLngExpression, Map as LeafletMap } from "leaflet";

// Dynamic import komponen Map
const Map = dynamic(() => import("../../components/UI/PreviewRecord"), {
    ssr: false,
});

const HomePage = () => {
    const [location, setLocation] = useState<LatLngExpression>([0, 0]);
    const mapRef = useRef<LeafletMap | null>(null);

    // Circle Location (HO Cakung)
    const circleCenter: LatLngExpression = [-6.173, 106.941];
    // Radius Circle (150 meter)
    const circleRadius = 150;

    // Function to get user location
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation([
                        position.coords.latitude,
                        position.coords.longitude,
                    ]);
                    // Set marker to user location
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

    // Get user location on page load
    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div className="grid grid-cols-1 w-auto gap-2 py-32">
            <div className="justify-center">
                <Map
                    position={location}
                    circleCenter={circleCenter}
                    circleRadius={circleRadius}
                    mapRef={mapRef}
                    getLocation={getLocation}
                />
            </div>
            <div className=""></div>
        </div>
    );
};

export default HomePage;
