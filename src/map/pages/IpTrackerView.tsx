import styles from "../assets/IpTrackerView.module.sass";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const IpTrackerView = () => {
  const [ipAddress, setIpAddress] = useState("");
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIp();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>IP Address Tracker</h1>
        <h2>{ipAddress}</h2>
      </div>
      <MapContainer
        className={styles.leaftContainer}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default IpTrackerView;
//   IP Address Tracker Search for any IP address or domain IP Address Location
//   Timezone UTC ISP
//   <div className="attribution">
//     Challenge by{" "}
//     <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
//       Frontend Mentor
//     </a>
//     . Coded by <a href="#">Your Name Here</a>.
//   </div>
