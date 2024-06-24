"use client";

import { useMobile } from "@/utils/hooks/useMobile";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Hero3D() {
  const isMobile = useMobile();
  return isMobile ? <Mobile /> : <Desktop />;
}
