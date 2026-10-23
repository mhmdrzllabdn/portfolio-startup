"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function RevealOnScroll({
  children,
  delayMs = 0,
  direction = "up",
  className = "",
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentElem = elementRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(currentElem);

    return () => {
      observer.unobserve(currentElem);
    };
  }, []);

  const getTransformStyle = () => {
    if (isVisible) return "translate3d(0, 0, 0)";

    // Subtle 20px offset for smoother, non-jarring entrance
    switch (direction) {
      case "up":
        return "translate3d(0, 20px, 0)";
      case "down":
        return "translate3d(0, -20px, 0)";
      case "left":
        return "translate3d(20px, 0, 0)";
      case "right":
        return "translate3d(-20px, 0, 0)";
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        transform: getTransformStyle(),
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
