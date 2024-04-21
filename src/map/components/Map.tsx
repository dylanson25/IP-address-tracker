import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./Marker";

const Map = ({ position, className }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latLng, setLatLng] = useState<Position>({ ...position });

  useEffect(() => {}, [latLng]);

  return (
    <MapContainer
      className={`${className}`}
      center={{ lat: latLng.lat, lng: latLng.lng }}
      zoomControl={false}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
    </MapContainer>
  );
};

export default Map;

interface Props {
  position: Position;
  className: CSSModuleClasses[string];
}
interface Position {
  lat: number;
  lng: number;
}
