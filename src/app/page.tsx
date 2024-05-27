import { motion } from "framer-motion";
import styles from "./page.module.css";
import Hero3D from "@/components/hero3d/hero3d";
import Animation from "@/components/animation/animation";
import Footer from "@/components/footer/footer";

export default async function Home() {
  return (
    <main>
      <Animation />
      <Hero3D />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.t1}>
            <p>Multidisciplinary studio based in Milan.</p>
            <p>
              Art, Design, Film, Photography,
              <br />
              Cross-media Communication, and beyond.
              <br /> Above all, we believe in DREAMS.
            </p>
          </div>

          <div className={styles.t2}>
            <p>
              Art&Creative Direction
              <br /> by Monica Silva & Valerio Fausti
            </p>
          </div>

          <div className={styles.t3}>
            Social
            <a>Instagram</a>
            <a>LinkedIn</a>
            <a>Facebook</a>
          </div>

          <div className={styles.t4}>
            Info&collaboration
            <a href="mailto:info@factoryof.art">info@factoryof.art</a>
            <a href="tel:+390282370121">+39 0282370121</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
