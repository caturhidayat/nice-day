import { LatLngExpression, Map as LeafletMap } from "leaflet";
import { MutableRefObject } from "react";

export interface PreviewRecordProps {
    location: LatLngExpression;
    targetLocations: LatLngExpression[];
    circleRadius: number;
    // mapRef: MutableRefObject<LeafletMap | null>;
    // getLocation: () => void;
  }