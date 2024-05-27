"use client";

import { motion, useAnimate } from "framer-motion";
import bg from "./fart-bg.svg";
import React from "react";

export default function Animation() {
  const [done, setDone] = React.useState(false);
  const bgr = React.useRef(null!);
  const textr = React.useRef(null!);
  const [_, animate] = useAnimate();

  React.useEffect(() => {
    async function start() {
      console.log("animation started");
      await animate(
        textr.current,
        {
          translateY: "11%",
        },
        { duration: 0.5 },
      );

      await animate(
        bgr.current,
        {
          opacity: 0,
        },
        { duration: 0.25 },
      );

      setDone(true);
    }

    setTimeout(start, 1000);
  }, []);

  return done ? null : (
    <motion.div
      ref={bgr}
      initial={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#f6dd34",
        opacity: 1,
        zIndex: 999,
      }}
    >
      <img
        ref={textr}
        src={bg.src}
        alt="fart logo"
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          padding: "0 min(5%, 50px)",
          boxSizing: "border-box",
        }}
      />
    </motion.div>
  );
}
