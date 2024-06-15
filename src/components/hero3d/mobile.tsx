"use client";

import React, { Suspense } from "react";
import bg from "./fart-bg.svg";
import { clamp } from "three/src/math/MathUtils.js";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as _Image, Text, PerspectiveCamera } from "@react-three/drei";
import { emitter } from "@/emitter/emitter";
import projects, { TProject } from "@/data/projects";
import { Group, Vector3 } from "three";
import { damp3 } from "maath/easing";

const BASE_FONT_SIZE = 0.15;
const FONT = "/fonts/aga.woff";
const TEXT_COLOR = "white";
const DZ = 3;
const DY = 2;

const Image3D = React.forwardRef(function Image(
  props: React.ComponentProps<typeof _Image> & {
    ["data-key"]: number;
  } & {
    project: TProject;
  },
  _: any
) {
  const { position, "data-key": dataKey, scale, project, ...args } = props;

  const iref = React.useRef<any>(null!);
  const title = React.useRef<any>(null!);
  const text = React.useRef<Group>(null!);
  const description = React.useRef<any>(null!);

  const three = useThree();

  const anchorX = "center";
  const textAlign = "center";

  // const sx = Array.isArray(scale) ? scale?.[0] ?? 1 : 1;
  const sy = Array.isArray(scale) ? scale?.[1] ?? 1 : 1;

  useFrame((_, delta) => {
    let dist = new Vector3();
    text.current.getWorldPosition(dist);

    const scale = clamp(dist.z + 2, 0, 1);

    damp3(title.current.scale, [scale, scale, scale], 0.15, delta);
    damp3(description.current.scale, [scale, scale, scale], 0.15, delta);
  });

  return (
    <group position={position}>
      <_Image ref={iref} scale={scale} {...args}></_Image>
      <group ref={text} position={[0, sy, 0]}>
        <Text
          anchorX={anchorX}
          anchorY={"bottom"}
          textAlign={textAlign}
          ref={title}
          font={FONT}
          fontSize={BASE_FONT_SIZE * 0.5}
          fillOpacity={1}
        >
          {project.title}
          <meshBasicMaterial toneMapped={false} color={TEXT_COLOR} />
        </Text>
        <Text
          anchorX={anchorX}
          anchorY={"top"}
          textAlign={textAlign}
          ref={description}
          font={FONT}
          fontSize={BASE_FONT_SIZE * 0.25}
          color={TEXT_COLOR}
          fillOpacity={1}
        >
          {project.description}
          <meshBasicMaterial toneMapped={false} color={TEXT_COLOR} />
        </Text>
      </group>
    </group>
  );
});

const Images = React.forwardRef(function Images(
  _,
  ref: React.ForwardedRef<any>
) {
  const scrolled = React.useRef(0);
  const group = React.useRef<Group>(null!);

  React.useImperativeHandle(ref, () => {
    return {
      move(p: number) {
        scrolled.current = p;
      },
    };
  });

  useFrame((_, delta) => {
    const target = new Vector3(
      0,
      scrolled.current * projects?.length * DY,
      scrolled.current * projects.length * DZ
    );
    damp3(group.current.position, target, 0, delta);
  });

  return (
    <group ref={group}>
      {projects?.map((project, i) => {
        const { width, height } = project.image;
        const position = new Vector3(0, -DY * i, -DZ * i);

        return (
          <Image3D
            key={i}
            data-key={i}
            scale={[(1 / height) * 1000, (1 / width) * 1000]}
            position={position}
            url={project.image.src}
            project={project}
          />
        );
      })}
    </group>
  );
});

export default function Mobile() {
  const ref = React.useRef<HTMLDivElement>(null);
  const imgs = React.useRef<any>(null);

  React.useEffect(() => {
    function handleScroll() {
      const rh = ref.current!.parentElement!.offsetHeight;
      const { top: ot } = ref.current!.parentElement!.getBoundingClientRect();
      const clamped = clamp(-ot / (rh - window.innerHeight), 0, Infinity);

      imgs.current?.move(clamped);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="hero3d" style={{ height: "500vh" }}>
      <div ref={ref} style={{ height: "100vh", position: "sticky", top: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <img
            src={bg.src}
            alt="fart logo"
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
              padding: "0 min(5%, 50px)",
              boxSizing: "border-box",
              transform: "translateY(11%)",
            }}
          />
        </div>
        <Canvas gl={{ antialias: false }}>
          <PerspectiveCamera
            makeDefault
            fov={35}
            position={[0, DY / 3, DZ * 1.5]}
          />
          <Suspense fallback={<Fallback />}>
            <Images ref={imgs} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

function Fallback() {
  React.useEffect(() => {
    return () => {
      emitter.emit("startAnimation");
    };
  }, []);

  return null;
}
