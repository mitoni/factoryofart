"use client";

import { motion } from "framer-motion";
import styles from "./pictos.module.css";
import Image from "next/image";

export default function Pictos() {
  return (
    <div className={styles.container}>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.image}
          initial={{ opacity: 1, rotateZ: i * -90 }}
          whileInView={{ opacity: 1, rotateZ: 0 }}
          transition={{ duration: i * 0.5, delay: i * 0.5, ease: "backOut" }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <Image
            fill
            src={`/pictograms/${i + 1}.svg`}
            alt="fart pictogram"
            loading="eager"
          ></Image>
        </motion.div>
      ))}
    </div>
  );
}
