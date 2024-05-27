"use client";

import React from "react";
import bg from "./fart-bg.svg";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Stats,
  Image as _Image,
  Text,
  PerspectiveCamera,
  ImageProps,
  Float,
  Loader,
} from "@react-three/drei";
import { ComponentProps, Suspense } from "react";
import {
  AdditiveBlending,
  Group,
  Material,
  Mesh,
  SubtractiveBlending,
  Vector3,
} from "three";
import { clamp } from "three/src/math/MathUtils.js";
import { damp3, damp } from "maath/easing";
import { remap } from "maath/misc";

import projects, { TProject } from "@/data/projects";

const SPACE = 5;
const BASE_FONT_SIZE = 1;

const Image3D = React.forwardRef(function Image(
  props: ComponentProps<typeof _Image> & { ["data-key"]: number } & {
    project: TProject;
  },
  _: React.ForwardedRef<ImageProps & Mesh>
) {
  const { position, "data-key": dataKey, scale, project, ...args } = props;
  const iref = React.useRef<any>(null!);
  const title = React.useRef<any>(null!);
  const gref = React.useRef<Group>(null!);
  const description = React.useRef<any>(null!);
  const hover = React.useRef(false);
  const three = useThree();

  const font = "/fonts/aga.woff";

  useFrame((_, delta) => {
    damp(iref.current, "zoom", hover.current ? 2 : 1, 0.25, delta);
    // damp(title.current, "fillOpacity", hover.current ? 1 : 0, 0.25, delta);
    // damp(
    //   description.current,
    //   "fillOpacity",
    //   hover.current ? 1 : 0,
    //   0.25,
    //   delta
    // );
  });

  const cpos = three.camera.position;
  const range = [0, 30];

  useFrame((_, delta) => {
    let ipos = new Vector3();
    iref.current.getWorldPosition(ipos);
    const _dist = cpos.z - ipos.z;
    const dist = clamp(_dist, range[0], range[1]);
    const remapped = remap(dist, range, [0, 1]);
    damp3(
      gref.current.scale,
      new Vector3(remapped, remapped, remapped),
      0.15,
      delta
    );
  });

  const pos = dataKey % 2 == 0 ? "left" : "right";
  const s = Array.isArray(scale) ? scale : [scale];
  const anchorX = pos == "right" ? "left" : "right";
  const textAlign = pos == "right" ? "left" : "right";
  const textColor = "white";

  return (
    <group position={position}>
      <group ref={gref}>
        <_Image
          ref={iref}
          scale={scale}
          {...args}
          transparent={true}
          onPointerEnter={() => (hover.current = true)}
          onPointerLeave={() => (hover.current = false)}
        ></_Image>
        <group
          position={
            pos == "right" ? [0.75 * s[0]!, 0, 0] : [-0.75 * s[0]!, 0, 0]
          }
        >
          <Text
            anchorX={anchorX}
            anchorY={"bottom"}
            textAlign={textAlign}
            ref={title}
            font={font}
            fontSize={BASE_FONT_SIZE * 0.5}
            color={textColor}
            //fillOpacity={0}
          >
            {project.title}
          </Text>
          <Text
            anchorX={anchorX}
            anchorY={"top"}
            textAlign={textAlign}
            ref={description}
            font={font}
            fontSize={BASE_FONT_SIZE * 0.25}
            color={textColor}
            //fillOpacity={0}
          >
            {project.description}
          </Text>
        </group>
      </group>
    </group>
  );
});

const Images = React.forwardRef(function Images(
  _,
  ref: React.ForwardedRef<any>
) {
  const scrolled = React.useRef(0);
  const triggered = React.useRef(false);
  const isMobile = window.innerWidth < 780;

  React.useImperativeHandle(ref, () => {
    return {
      move(p: number) {
        scrolled.current = p;
      },
    };
  });

  React.useEffect(() => {
    function handleScroll() {
      triggered.current = true;
      window.removeEventListener("scroll", handleScroll);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const group = React.useRef<Group>(null!);
  const img = React.useRef<any>(null);

  useFrame((_, delta) => {
    const target = triggered.current
      ? new Vector3(
          0,
          0,
          scrolled.current *
            (projects?.length + 2 ||
              0) /* compensate for initial camera offset */ *
            SPACE
        )
      : group.current.position.clone().add(new Vector3(0, 0, 0.1));

    damp3(group.current.position, target, 0.25, delta);
  });

  const dx = isMobile ? 1 : 6;
  const dy = isMobile ? 3 : 3;
  const space = isMobile ? SPACE * 2 : SPACE;

  const pts = [
    new Vector3(-dx, -dy, 0),
    new Vector3(dx, -dy, 0),
    new Vector3(-dx, dy, 0),
    new Vector3(dx, dy, 0),
  ];

  return (
    <group ref={group}>
      {projects?.map((project, i) => {
        const { width, height } = project.image;
        const p = i % 4;
        const position = pts[p].clone();

        position.setZ(-i * space);
        return (
          <Image3D
            key={i}
            data-key={i}
            ref={img}
            scale={[(1 / height) * 5000, (1 / width) * 5000]}
            position={position}
            url={project.image.src}
            project={project}
          />
        );
      })}
    </group>
  );
});

export default function Hero3D() {
  const ref = React.useRef<HTMLDivElement>(null);
  const imgs = React.useRef<any>(null);

  React.useEffect(() => {
    function handleScroll() {
      const rh = ref.current!.parentElement!.offsetHeight;
      const { top: ot } = ref.current!.parentElement!.getBoundingClientRect();
      const clamped = clamp(-ot / rh, 0, 1);

      imgs.current?.move(clamped);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div style={{ height: "500vh" }}>
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
              position={[0, 0, SPACE * 5]}
            />
            {/*<CameraControls />*/}
            <Suspense fallback={null}>
              <Images ref={imgs} />
            </Suspense>
          </Canvas>
          <Stats />
        </div>
      </div>
    </>
  );
}
