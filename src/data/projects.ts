import { StaticImageData } from "next/image";

import inchioma from "./imgs/IN CHIOMA.jpg";
import mhe from "./imgs/MY HIDDEN EGO PROJECT.jpg";
import zanetti from "./imgs/ZANETTI-MAGNETI-SRL.jpg";
import mv from "./imgs/MARIO VENUTI LOVE.jpg";
import ac from "./imgs/AMORE IN UN LAMPO.jpg";
import painita from "./imgs/PAINITA.jpg";
import longari from "./imgs/LONGARI ARTE.jpg";
import eicma from "./imgs/EICMA.jpg";
import moi from "./imgs/MOI COMPOSITES.jpg";
import zpt from "./imgs/FAUSTI ZPT.jpg";
import gesa from "./imgs/GeSa.jpg";
import commercial from "./imgs/COMMERCIAL COLLINETTA PARCO-EX ALFA ROMEO.jpg";
import ino from "./imgs/INO FIRENZE.jpg";

export type TProject = {
  title: string;
  description: string;
  image: StaticImageData;
};

const projects: TProject[] = [
  {
    title: "IN CHIOMA",
    description: "BRAND IDENTITY/WEBSITE/SOCIAL MEDIA",
    image: inchioma,
  },
  {
    title: "MY HIDDEN EGO PROJECT",
    description: "BRAND IDENTITY/WEBSITE/PROJECT DESIGN/ADV",
    image: mhe,
  },
  {
    title: "ZANETTI MAGNETI S.R.L.",
    description:
      "BRAND IDENTITY/PHOTOGRAPHY/VIDEO/SOCIAL MEDIA/TRADE SHOW BOOTH DESIGN",
    image: zanetti,
  },
  {
    title: "MARIO VENUTI",
    description: "PORTRAIT/GRAPHIC DESIGN/ADV",
    image: mv,
  },
  {
    title: "AMORE IN UN LAMPO",
    description: "PORTRAIT/GRAPHIC DESIGN",
    image: ac,
  },
  {
    title: "PAINITA",
    description: "GRAPHIC DESIGN/LOGO/WEBSITE/VIDEO",
    image: painita,
  },
  {
    title: "LONGARI ARTE MILANO",
    description: "PHOTOGRAPHY/ART INSTALLATION/VIDEO/CONCEPTUAL DESIGN",
    image: longari,
  },
  {
    title: "EICMA",
    description: "ADV CAMPAIGN/PHOTOGRAPHY/VIDEO",
    image: eicma,
  },
  {
    title: "MOI COMPOSITES",
    description: "PHOTOGRAPHY",
    image: moi,
  },
  {
    title: "FAUSTI Z.P.T. SRL",
    description: "R&D/PRODUCT DESIGN/PHOTOGRAPHY/VIDEO",
    image: zpt,
  },
  {
    title: "GESA VENDING",
    description: "PHOTOGRAPHY/VIDEO",
    image: gesa,
  },
  {
    title: "COMMERCIAL",
    description: "PHOTOGRAPHY/VIDEO/ADV CAMPAIGN",
    image: commercial,
  },
  {
    title: "INO FIRENZE",
    description: "PORTRAIT/ STILL LIFE PHOTOGRAPHY/ADV CAMPAIGN",
    image: ino,
  },
];

export default projects;
