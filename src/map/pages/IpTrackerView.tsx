import styles from "../assets/IpTrackerView.module.sass";

import { useEffect, useState } from "react";
import { CardIpDetails, Input, Button, Map } from "../components";
import GeoApi from "../Api/GeoApi";
import IpifyApi from "../Api/IPify";

const ipRegex = new RegExp(
  /(?<!\S)((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\b|\.\b){7}(?!\S)/
);

const IpTrackerView = () => {
  const [ipUser, setIpUser] = useState<string>("Escribe una IP");
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    lat: 33.42144,
    lng: -111.71069,
  });
  const [dataLocation, setDataLocation] = useState({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const getIP = async () => {
    try {
      setLoading(true);
      const { data } = await IpifyApi.get("");
      setIpUser(data);
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
      setPosition({
        lat: data.location.lat,
        lng: data.location.lng,
      });
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

  useEffect(() => {
    ipRegex.test(ipAddress) ? setDisabled(false) : setDisabled(true);
  }, [ipAddress]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>IP Address Tracker</h1>
        <Input
          value={ipAddress}
          onChange={setIpAddress}
          placeholder="Search for any IP address or domain"
          addonsRight
        >
          <Button
            text=">"
            disabled={loading || disabled}
            eventClick={getLocation}
          />
        </Input>
        {dataLocation?.ip && <CardIpDetails data={dataLocation} />}
      </div>
      <Map position={position} className={styles.leaftContainer} />
    </div>
  );
};
export default IpTrackerView;

interface Position {
  lat: number;
  lng: number;
}
