import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, LatLng } from "leaflet";
import { useEffect } from "react";

interface LeafletMapProps {
  establishmentLatitude: number;
  establishmentLongitude: number;
}

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

const LeafletMap = ({
  establishmentLatitude,
  establishmentLongitude,
}: LeafletMapProps) => {
  return (
    <MapContainer
      className="h-[350px] w-full rounded-lg"
      center={{ lat: establishmentLatitude, lng: establishmentLongitude }}
      zoom={15}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

      <Marker
        position={{ lat: establishmentLatitude, lng: establishmentLongitude }}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      />

      <MapCenterHandler
        establishmentLatitude={establishmentLatitude}
        establishmentLongitude={establishmentLongitude}
      />
    </MapContainer>
  );
};

export default LeafletMap;
