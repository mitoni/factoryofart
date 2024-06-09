"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import bg from "./fart-bg.svg";
import { emitter } from "@/emitter/emitter";
import React, { Suspense } from "react";
import {
  Image as _Image,
  Scroll,
  ScrollControls,
  useScroll,
  Text,
} from "@react-three/drei";
import projects, { TProject } from "@/data/projects";
import { Group, Vector3 } from "three";
import { damp, damp3 } from "maath/easing";

const IMG_SCALE = 2000;
const BASE_FONT_SIZE = 1;
const font = "/fonts/aga.woff";
const TEXT_COLOR = "white";

const Image = React.forwardRef(function Image(
  props: React.ComponentProps<typeof _Image> & { ["data-key"]: number } & {
    project: TProject;
    onImageChange(i: number): void;
  },
  _: any
) {
  const { "data-key": dataKey, scale, project, onImageChange, ...args } = props;
  const iref = React.useRef<any>(null!);
  const curr = React.useRef<number>(0);
  const scroll = useScroll();
  const { width: vw } = useThree((state) => state.viewport);

  const sx = Array.isArray(scale) ? scale?.[0] ?? 1 : 1;
  const sy = Array.isArray(scale) ? scale?.[1] ?? 1 : 1;
  const sMult = 2.5;
  const comp = 1 / vw / projects.length;

  useFrame((_, delta) => {
    const n = Math.floor((scroll.offset + comp) * projects.length);

    if (n != curr.current) {
      curr.current = n;
      onImageChange(n);
    }

    damp3(
      iref.current.scale,
      n == dataKey ? [sx * sMult, sy * sMult, 1] : [sx, sy, 1],
      0.25,
      delta
    );
  });

  return <_Image ref={iref} {...args} />;
});

function Images() {
  const { width: vw, height: vh } = useThree((state) => state.viewport);
  const tref = React.useRef<Group>(null!);
  const curr = React.useRef<number>(0);

  function onImageChange(i: number) {
    if (i == curr.current) return;
    curr.current = i;
  }

  useFrame((_, delta) => {
    tref.current.children.forEach((child, i) => {
      damp(child, "fillOpacity", curr.current == i ? 1 : 0, 0.25, delta);
    });
  });

  return (
    <>
      <group ref={tref}>
        {projects.map((project, i) => {
          return (
            <Text
              key={i}
              renderOrder={-1}
              font={font}
              fontSize={BASE_FONT_SIZE * 0.3}
              position={[0, vh * 0.25, 0]}
              fillOpacity={0}
            >
              {project.title}
              <meshBasicMaterial toneMapped={false} color={TEXT_COLOR} />
            </Text>
          );
        })}
      </group>

      <Scroll>
        {projects.map((project, i) => {
          const { width, height } = project.image;
          const position = new Vector3();
          position.setX(i * vw);

          return (
            <Image
              key={i}
              data-key={i}
              position={position}
              url={project.image.src}
              scale={[(1 / height) * IMG_SCALE, (1 / width) * IMG_SCALE]}
              project={project}
              onImageChange={onImageChange}
            />
          );
        })}
      </Scroll>
    </>
  );
}

export default function Mobile() {
  return (
    <div style={{ height: "100vh" }}>
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
        <Suspense fallback={<Fallback />}>
          <ScrollControls horizontal pages={projects.length + 1} damping={0}>
            <Images />
          </ScrollControls>
        </Suspense>
      </Canvas>
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
