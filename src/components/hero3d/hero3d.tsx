"use client";

import { useMobile } from "@/utils/hooks/useMobile";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Hero3D() {
  const isMobile = useMobile();

  console.log({ isMobile });

  return isMobile ? <Mobile /> : <Desktop />;
}
