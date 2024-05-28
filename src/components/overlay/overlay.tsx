import Link from "next/link";
import styles from "./overlay.module.css";
import Image from "next/image";

export default function Overlay() {
  return (
    <div className={styles.container}>
      <div style={{ placeSelf: "start start" }} className={styles.shadow}>
        <Link href="/" className={styles.catcher}>
          <Image
            src={"/logo.svg"}
            width={100}
            height={100}
            alt="factory of art logo"
          ></Image>
        </Link>
      </div>

      <div style={{ placeSelf: "start end" }}>
        <Link
          href={"/about-us"}
          className={`${styles.shadow} ${styles.catcher}`}
        >
          About Us
        </Link>
      </div>

      <div style={{ placeSelf: "end start" }}>
        {
          // <span className={styles.shadow}>Back To Top</span>
        }
      </div>

      <div style={{ placeSelf: "end end" }}>
        {
          //  <Link href={"/about-us"} className={styles.shadow}>
          //  About Us
          //  </Link>
        }
      </div>
    </div>
  );
}
