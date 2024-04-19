import styles from "../assets/IpTrackerView.module.sass";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CardIpDetails, Input, Button } from "../components";
import GeoApi from "../Api/GeoApi";
import IpifyApi from "../Api/IPify";

const IpTrackerView = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lat, setLat] = useState(33.42144);
  const [lng, setLng] = useState(-111.71069);
  const [dataLocation, setDataLocation] = useState({});

  const getIP = async () => {
    try {
      setLoading(true);
      const { data } = await IpifyApi.get("");
      setIpAddress(data);
      await getLocation();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      const { data } = await GeoApi.get(
        `country,city?apiKey=${
          import.meta.env.VITE_APP_IPIFY_API_KEY
        }&ipAddress=${ipAddress}`
      );

      setLat(data.location.lat);
      setLng(data.location.lng);
      setIpAddress(data.ip);
      setDataLocation(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getIP();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>IP Address Tracker</h1>
        <Input
          value={ipAddress}
          onChange={setIpAddress}
          placeholder="72.200.71.37"
          addonsRight
        >
          <Button text=">" disabled={loading} eventClick={getLocation} />
        </Input>
        {dataLocation?.ip && <CardIpDetails data={dataLocation} />}
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
