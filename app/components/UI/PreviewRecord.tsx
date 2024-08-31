"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { PreviewRecordProps } from "@/app/common/interfaces/preview-record";
import { fixLeafletIcon } from "@/app/common/utils/fix-leaflet-icon";
import { useMap, useMapEvents } from "react-leaflet";

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
// Function to fly to user location
interface FlyToUserLocationProps {
  position: LatLngExpression;
}

function FlyToUserLocation({ position }: FlyToUserLocationProps) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }

    fixLeafletIcon();
  }, [position, map]);

  return null;
}

const MapView = ({
  position,
  targetLocations,
  circleRadius,
}: PreviewRecordProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {targetLocations.map((target, index) => (
          <div key={index}>
            <Circle
              center={target}
              radius={circleRadius}
              color="red"
              fillColor="red"
              fillOpacity={0.5}
            />
          </div>
        ))}
        <Marker position={position}>
          <Popup>Your Location</Popup>
        </Marker>
        <FlyToUserLocation position={position} />
      </MapContainer>
    </div>
  );
};

export default MapView;
