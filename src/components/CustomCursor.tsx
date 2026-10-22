"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointing devices (desktop mouse/trackpad)
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    } else {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCoords({ x: Math.round(mouseX), y: Math.round(mouseY) });

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check context from hovered target
      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorType("default");
        return;
      }

      const viewElement = target.closest('[data-cursor="view"]');
      if (viewElement) {
        setCursorType("view");
        return;
      }

      const isInteractive = target.closest(
        'button, a, input, textarea, select, [role="button"], label, .interactive-hover'
      );
      if (isInteractive) {
        setCursorType("hover");
        return;
      }

      setCursorType("default");
    };

    const render = () => {
      // Elastic spring interpolation for organic trailing physics
      const speed = cursorType === "view" ? 0.15 : 0.22;
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorType]);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Center Aim Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference transition-opacity duration-200 ${
          cursorType === "view"
            ? "w-2 h-2 -ml-1 -mt-1 bg-white opacity-0"
            : cursorType === "hover"
            ? "w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-white opacity-100"
            : "w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-white opacity-85"
        }`}
      />

      {/* Trailing Architectural Cursor Body */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-[width,height,margin,background-color,border-color,opacity,transform] duration-300 ease-out ${
          cursorType === "view"
            ? "w-20 h-20 -ml-10 -mt-10 bg-white text-black font-heading font-extrabold text-[11px] tracking-widest shadow-2xl scale-100"
            : cursorType === "hover"
            ? "w-12 h-12 -ml-6 -mt-6 border border-white bg-white/15 backdrop-blur-[2px] mix-blend-difference scale-110"
            : "w-7 h-7 -ml-3.5 -mt-3.5 border border-white/40 mix-blend-difference opacity-50"
        }`}
      >
        {cursorType === "view" && (
          <span className="select-none animate-pulse">VIEW</span>
        )}
      </div>
    </>
  );
}
