import { motion } from "framer-motion";
import style from "./page.module.css";
import Hero3D from "@/components/hero3d/hero3d";
import Animation from "@/components/animation/animation";

export default async function Home() {
  return (
    <main>
      <Animation />
      <Hero3D />
      <section className={style.section}>
        <div className={style.container}>
          <div className={style.t1}>
            <p>Multidisciplinary studio based in Milan.</p>
            <p>
              Art, Design, Film, Photography,
              <br />
              Cross-media Communication, and beyond.
              <br /> Above all, we believe in DREAMS.
            </p>
          </div>

          <div className={style.t2}>
            <p>
              Art&Creative Direction
              <br /> by Monica Silva & Valerio Fausti
            </p>
          </div>

          <div className={style.t3}>
            Social
            <a>Instagram</a> <a>LinkedIn</a> <a>Facebook</a>
          </div>

          <div className={style.t4}>
            Info&collaboration <a>info@factoryof.art</a> <a>+39 0282370121</a>
          </div>
        </div>
      </section>
    </main>
  );
}
