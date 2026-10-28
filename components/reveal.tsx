"use client";

import { useEffect, useRef } from "react";

type Motion = "up" | "left" | "right" | "scale";

let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver?.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  }
  return revealObserver;
}

export default function Reveal({ children, className = "", motion = "up", delay = 0 }: { children: React.ReactNode; className?: string; motion?: Motion; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = getRevealObserver();
    if (!observer) {
      element.classList.add("is-visible");
      return;
    }

    element.dataset.motion = motion;
    element.style.setProperty("--reveal-delay", `${delay}s`);
    element.classList.add("reveal-motion-enabled");
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [delay, motion]);

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
