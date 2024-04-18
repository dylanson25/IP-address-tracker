import styles from "../assets/IpTrackerView.module.sass";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import GeoApi from "../Api/GeoApi";
import IpifyApi from "../Api/IPify";

const IpTrackerView = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lat, setLat] = useState(33.42144);
  const [lng, setLng] = useState(-111.71069);

  const getIP = async () => {
    try {
      setLoading(true);
      const { data } = await IpifyApi.get("");
      console.log(data);
      setIpAddress(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      // const { data } = await GeoApi.get(
      //   `country,city?apiKey=${
      //     import.meta.env.VITE_APP_IPIFY_API_KEY
      //   }&ipAddress=72.200.71.37`
      // );
      const data = {
        ip: "72.200.71.37",
        location: {
          country: "US",
          region: "Arizona",
          city: "Dreamland Villa",
          lat: 33.42144,
          lng: -111.71069,
          postalCode: "",
          timezone: "-07:00",
          geonameId: 5293165,
        },
        as: {
          asn: 22773,
          name: "ASN-CXA-ALL-CCI-22773-RDC",
          route: "72.200.64.0/18",
          domain: "http://www.cox.com/peering",
          type: "Cable/DSL/ISP",
        },
        isp: "Cox Communications Inc.",
      };

      setLat(data.location.lat);
      setLng(data.location.lng);
      setIpAddress(data.ip);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIP();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>IP Address Tracker</h1>
        <h2>{ipAddress}</h2>
      </div>
      <MapContainer
        className={styles.leaftContainer}
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
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
