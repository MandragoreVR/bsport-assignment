import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, LatLng } from "leaflet";
import React, { useEffect } from "react";

interface LeafletMapProps {
  establishmentLatitude: number;
  establishmentLongitude: number;
}

/**
 * Handler that centers the Leaflet map on the establishment's coordinates every time they change.
 * @param establishmentLatitude Establishment's latitude
 * @param establishmentLongitude Establishment's longitude
 * @returns null
 */
const MapCenterHandler = ({
  establishmentLatitude,
  establishmentLongitude,
}: LeafletMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.panTo(new LatLng(establishmentLatitude, establishmentLongitude));
  }, [establishmentLatitude, establishmentLongitude, map]);

  return null;
};

/**
 * Map component displayed on the offer details page.
 * @param establishmentLatitude Establishment's latitude
 * @param establishmentLongitude Establishment's longitude
 * @returns The map component using Leaflet and OpenStreetMap
 */
const LeafletMap = ({
  establishmentLatitude,
  establishmentLongitude,
}: LeafletMapProps) => (
  <MapContainer
    center={{ lat: establishmentLatitude, lng: establishmentLongitude }}
    className="h-[350px] w-full rounded-lg"
    scrollWheelZoom={false}
    zoom={15}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

    <Marker
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
      position={{ lat: establishmentLatitude, lng: establishmentLongitude }}
    />

    <MapCenterHandler
      establishmentLatitude={establishmentLatitude}
      establishmentLongitude={establishmentLongitude}
    />
  </MapContainer>
);

export default LeafletMap;
