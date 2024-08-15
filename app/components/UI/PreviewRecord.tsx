"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import { MutableRefObject, useEffect, useState } from "react";

// Impor icon default Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useMapEvents } from "react-leaflet";
import { get } from "http";

// Using dynamic import to load components only on the client-side
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
});
const Circle = dynamic(
    () => import("react-leaflet").then((mod) => mod.Circle),
    { ssr: false }
);

// Function to change the default Leaflet icon
const fixLeafletIcon = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
    });
};

interface PreviewRecordProps {
    position: LatLngExpression;
    circleCenter: LatLngExpression;
    circleRadius: number;
    mapRef: MutableRefObject<LeafletMap | null>;
    getLocation: () => void;
}

const Map = ({
    position,
    circleCenter,
    circleRadius,
    mapRef,
    getLocation,
}: PreviewRecordProps) => {
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(position, 15, {
                animate: true,
                duration: 1.5,
            });
        }

        fixLeafletIcon();
    }, [position, mapRef]);

    // Function to calculate the distance between two coordinates
    const isMarkerInsideCircle = (
        markerPos: L.LatLngLiteral | L.LatLngTuple,
        circleCenter: L.LatLngExpression,
        radius: number
    ) => {
        const distance = L.latLng(markerPos).distanceTo(L.latLng(circleCenter));
        return distance <= radius;
    };

    const markerInside = isMarkerInsideCircle(
        position,
        circleCenter,
        circleRadius
    );

    // Funtion Location Marker
    function LocationMarker() {
        const map = useMapEvents({
            click() {
                map.locate();
            },
            locationfound() {
                map.flyTo(position, map.getZoom());
            },
        });

        // Store map event reference
        mapRef.current = map;

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        );
        // return null;
    }

    // Function to trigger map click event
    const triggerMapClick = () => {
        if (mapRef.current) {
            mapRef.current.locate();
        }
    };

    return (
        <div className="grid grid-cols-1 gap-2">
            <MapContainer
                center={position}
                zoom={15}
                style={{ height: "300px", width: "100%" }}
                ref={mapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                <Circle center={circleCenter} radius={circleRadius} />
            </MapContainer>
            <button
                onClick={() => {
                    getLocation();
                    triggerMapClick();
                }}
                className="btn btn-error btn-md"
            >
                Refresh Location
            </button>
            {markerInside ? (
                <button className="btn btn-accent btn-md">
                    Save Attendance
                </button>
            ) : null}
        </div>
    );
};

export default Map;
