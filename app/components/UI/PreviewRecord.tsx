"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import { MutableRefObject, useEffect } from "react";

// Impor gambar ikon dari Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Menggunakan dynamic import untuk memuat komponen hanya di client-side
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

// Fungsi untuk mengganti ikon default Leaflet
const fixLeafletIcon = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
    });
};

interface PreviewRecordProps {
    latitude: number;
    longitude: number;
    circleCenter: LatLngExpression;
    circleRadius: number;
    mapRef: MutableRefObject<LeafletMap | null>;
}

const Map = ({
    latitude,
    longitude,
    circleCenter,
    circleRadius,
    mapRef,
}: PreviewRecordProps) => {
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 15, {
                animate: true,
                duration: 1.5,
            });
        }
        fixLeafletIcon(); // Panggil fungsi untuk memperbaiki ikon Leaflet saat komponen dirender
    }, [latitude, longitude, mapRef]);

    // Fungsi untuk menghitung jarak antara dua koordinat
    const isMarkerInsideCircle = (
        markerPos: L.LatLngLiteral | L.LatLngTuple,
        circleCenter: L.LatLngExpression,
        radius: number
    ) => {
        const distance = L.latLng(markerPos).distanceTo(L.latLng(circleCenter));
        return distance <= radius;
    };

    const markerInside = isMarkerInsideCircle(
        [latitude, longitude],
        circleCenter,
        circleRadius
    );

    return (
        <div>
            <MapContainer
                center={circleCenter}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        {markerInside
                            ? "Marker is inside the circle."
                            : "Marker is outside the circle."}
                    </Popup>
                </Marker>
                <Circle center={circleCenter} radius={circleRadius} />
            </MapContainer>
            {markerInside ? (
                <p className="text-green-500">
                    {latitude}, {longitude} is inside the circle.
                </p>
            ) : (
                <p className="text-red-500">
                    {latitude}, {longitude} Marker is outside the circle.
                </p>
            )}
        </div>
    );
};

export default Map;
