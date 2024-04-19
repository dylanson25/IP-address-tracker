import styles from "../assets/components/CardIpDetails.module.sass";

const CardIpDetails = ({ data }: Props) => {
  return (
    <section className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>IP ADDRESS</h3>
          <h2 className={styles.infoText}>{data.ip}</h2>
        </div>
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>LOCATION</h3>
          <h2
            className={styles.infoText}
          >{`${data.location.region}, ${data.location.city}`}</h2>
        </div>
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>TIMEZONE</h3>
          <h2 className={styles.infoText}>UTC{data.location.timezone}</h2>
        </div>
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>ISP</h3>
          <h2 className={styles.infoText}>{data.isp}</h2>
        </div>
      </div>
    </section>
  );
};
export default CardIpDetails;

interface Location {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}
interface As {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

interface Data {
  ip: string;
  location: Location;
  as: As;
  isp: string;
}

interface Props {
  data: Data | object;
}
