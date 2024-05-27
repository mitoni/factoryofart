"use client";

import React from "react";
import { memo } from "react";

function findTagInParents(el: Element | null, attr: string): boolean {
  function recurse(el: Element | null) {
    if (el == null) return false;
    if (el.getAttribute(attr)) return true;
    if (!el.parentElement) return false;
    return recurse(el.parentElement);
  }
  return recurse(el);
}

function _CirclePointer() {
  const cursor = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    function handlePointerMove(event: MouseEvent) {
      if (!cursor.current) return;
      const { x, y } = event;
      cursor.current.style.left = `${x}px`;
      cursor.current.style.top = `${y}px`;

      const hover = document.elementFromPoint(x, y);
      const isLink = findTagInParents(hover, "href");
      if (isLink) {
        cursor.current.style.width = "2rem";
        cursor.current.style.height = "2rem";
      } else if ((cursor.current.style.width = "2rem")) {
        cursor.current.style.width = "1rem";
        cursor.current.style.height = "1rem";
      }
    }
    // detect mobile
    if (window.innerWidth < 780) return;

    window.addEventListener("mousemove", handlePointerMove);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  // use another effect to revel the cursor at first movement
  // and then remove the listener
  React.useLayoutEffect(() => {
    function handlePointerMove() {
      if (!cursor.current) return;
      cursor.current.style.visibility = "visible";
      window.removeEventListener("mousemove", handlePointerMove);
    }
    // detect mobile
    if (window.innerWidth < 780) return;

    window.addEventListener("mousemove", handlePointerMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-exclusion">
      <div
        ref={cursor}
        style={{
          width: "1rem",
          height: "1rem",
          transitionProperty: "width, height",
          transitionDuration: "250ms",
          transitionTimingFunction: "cubic-bezier(0.87, 0, 0.13, 1)",
          visibility: "hidden",
          position: "fixed",
          inset: 0,
          borderRadius: 99,
          transform: "translate(-50%, -50%)",
          zIndex: 99,
          background: "white",
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
}

export const CirclePointer = memo(_CirclePointer);
