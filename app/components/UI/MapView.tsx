"use client";

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { PreviewRecordProps } from "@/app/common/interfaces/preview-record";
import { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
    useMap,
} from "react-leaflet";

// Impor icon default Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Function to change the default Leaflet icon
export const fixLeafletIcon = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
    });
};

const MapView = ({
    location,
    targetLocations,
    circleRadius,
}: PreviewRecordProps) => {
    // Function to fly to user location
    interface FlyToUserLocationProps {
        location: LatLngExpression;
    }

    function FlyToUserLocation({ location }: FlyToUserLocationProps) {
        const map = useMap();
        useEffect(() => {
            map.flyTo(location, 15, {
                animate: true,
                duration: 1.5,
            });

            fixLeafletIcon();
        }, [location, map]);

        return null;
    }

    return (
        <div className="grid grid-cols-1 gap-2">
            <MapContainer
                center={location}
                zoom={13}
                style={{ height: "200px", width: "100%" }}
            >
                {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}

                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                />

                {targetLocations.map((target, index) => (
                    <div key={index}>
                        <Circle
                            center={target}
                            radius={circleRadius}
                            color="red"
                            fillColor="red"
                            fillOpacity={0.3}
                        />
                    </div>
                ))}
                <Marker position={location}>
                    <Popup>Your Here</Popup>
                </Marker>
                <FlyToUserLocation location={location} />
            </MapContainer>
        </div>
    );
};

export default MapView;
