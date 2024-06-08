"use client";

import React from "react";

export function useMobile() {
  const [isMobile, setMobile] = React.useState<boolean>();

  React.useLayoutEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return isMobile;
}
