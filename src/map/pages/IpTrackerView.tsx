import styles from "../assets/IpTrackerView.module.sass";

import { useEffect, useState } from "react";
import { CardIpDetails, Input, Button, Map } from "../components";
import GeoApi from "../Api/GeoApi";
import IpifyApi from "../Api/IPify";

const IpTrackerView = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    lat: 33.42144,
    lng: -111.71069,
  });
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
      // const data = {
      //   ip: "72.200.71.37",
      //   location: {
      //     country: "US",
      //     region: "Arizona",
      //     city: "Dreamland Villa",
      //     lat: 33.42144,
      //     lng: -111.71069,
      //     postalCode: "",
      //     timezone: "-07:00",
      //     geonameId: 5293165,
      //   },
      //   as: {
      //     asn: 22773,
      //     name: "ASN-CXA-ALL-CCI-22773-RDC",
      //     route: "72.200.64.0/18",
      //     domain: "http://www.cox.com/peering",
      //     type: "Cable/DSL/ISP",
      //   },
      //   isp: "Cox Communications",
      // };
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
  // 198.203.7.221
  // 72.200.71.37
  // 192.212.174.101
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
      <Map position={position} className={styles.leaftContainer} />
    </div>
  );
};
export default IpTrackerView;

interface Position {
  lat: number;
  lng: number;
}
