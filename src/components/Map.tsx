import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

import marker from "../assets/images/pin.png";

interface Props {
  latitude: number;
  longitude: number;
}

const markerIcon: L.Icon = L.icon({
  iconUrl: marker,
  iconSize: [32, 32],
});

const Map = ({ latitude, longitude }: Props) => {
  return (
    <div className="map h-max rounded shadow-xl md:mx-6 bg-slate-700">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={markerIcon} />
      </MapContainer>
    </div>
  );
};

export default Map;
