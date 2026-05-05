"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect if hovering clickable elements
      const target = e.target;
      const isClickable =
        target.closest("a, button, [role='button'], .cursor-pointer");

      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <div
        className={`
          fixed top-0 left-0 z-[9999]
          pointer-events-none
          w-2 h-2 rounded-full
          bg-accent
          transform -translate-x-1/2 -translate-y-1/2
          transition-all duration-150 ease-out
          ${isPointer ? "scale-150 bg-accent-pink" : ""}
        `}
        style={{
          left: position.x,
          top: position.y,
        }}
      />

      {/* Outer Ring */}
      <div
        className={`
          fixed top-0 left-0 z-[9998]
          pointer-events-none
          w-8 h-8 rounded-full
          border border-accent/50
          transform -translate-x-1/2 -translate-y-1/2
          transition-all duration-300 ease-out
          ${isPointer ? "scale-150 border-accent-pink" : ""}
        `}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  );
}