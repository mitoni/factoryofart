import styles from "./overlay.module.css";
import Image from "next/image";

export default function Overlay() {
  return (
    <div className={styles.container}>
      <div style={{ placeSelf: "start start" }} className={styles.shadow}>
        <Image
          src={"/logo.svg"}
          width={100}
          height={100}
          alt="factory of art logo"
        ></Image>
      </div>
      <div style={{ placeSelf: "start end" }}>
        <span className={styles.shadow}>About Us</span>
      </div>
      <div style={{ placeSelf: "end start" }}>
        <span className={styles.shadow}>Back To Top</span>
      </div>
      <div style={{ placeSelf: "end end" }}>
        <span className={styles.shadow}>About Us</span>
      </div>
    </div>
  );
}
