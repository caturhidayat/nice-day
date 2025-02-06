import { LatLngExpression, Map as LeafletMap } from "leaflet";
import { MutableRefObject } from "react";

export interface PreviewRecordProps {
    location: LatLngExpression;
    targetLocationsWithRadius: TargetLocationWithRadius[];
    // mapRef: MutableRefObject<LeafletMap | null>;
    // getLocation: () => void;
  }


type TargetLocationWithRadius = {
  location: LatLngExpression;
  radius: number;
}