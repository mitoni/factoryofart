"use client";

import projects from "@/data/projects";
import { emitter } from "@/emitter/emitter";
import Image from "next/image";
import React from "react";
import styles from "./mobile.module.css";

export default function Mobile() {
  React.useEffect(() => {
    emitter.emit("startAnimation");
  }, []);

  const wv = React.useRef(window.innerWidth);
  const titleRef = React.useRef<HTMLSpanElement>(null);
  const descriptionRef = React.useRef<HTMLSpanElement>(null);

  function handleScroll(event: React.UIEvent) {
    const scrolled =
      (event.target as HTMLDivElement).scrollLeft + wv.current / 2;
    const i = Math.floor(scrolled / wv.current);

    const title = projects[i].title;
    const description = projects[i].description;

    if (titleRef.current) {
      titleRef.current.textContent = title;
    }
    if (descriptionRef.current) {
      descriptionRef.current.textContent = description;
    }
  }

  return (
    <div
      className={styles.container}
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflowX: "scroll",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          display: "flex",
        }}
      >
        {projects.map((project) => {
          return (
            <div
              key={project.image.src}
              style={{
                width: "100vw",
                height: "70%",
                padding: "10rem 1rem 0",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Image
                  fill
                  loading="eager"
                  style={{ objectFit: "contain" }}
                  src={project.image.src}
                  alt={project.title}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "sticky",
          top: "100%",
          width: "100%",
          height: "30%",
          boxSizing: "border-box",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <span ref={titleRef}>{projects[0].title}</span>
        <span style={{ fontSize: "0.75em", opacity: 0.5 }} ref={descriptionRef}>
          {projects[0].description}
        </span>
      </div>
    </div>
  );
}
