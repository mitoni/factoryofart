"use client";

import { motion } from "framer-motion";
import styles from "./pictos.module.css";
import Image from "next/image";

export default function Pictos() {
  return (
    <div className={styles.container}>
      <div className={styles.picContainer} style={{ gridColumn: "1 / -1" }}>
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

      <motion.div className={styles.right} style={{ textAlign: "right" }}>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          viewport={{ once: true, margin: "-10%" }}
        >
          MORE THAN CREATIVE
        </motion.h3>
      </motion.div>

      <motion.div
        className={styles.left}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <p>
          Our pictogram represents the synthesis of our creative process. From
          the curious, attentive and profound observation of things to the
          creation of new worlds, passing through the stages of research and the
          overturning of reality, the change of point of view.
        </p>
      </motion.div>
    </div>
  );
}
