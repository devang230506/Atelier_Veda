"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VisualStoryParallax({ children }: { children: React.ReactNode }) {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".visual-story-parallax", grid.current).forEach((image, index) => {
        const amount = index === 0 ? 3 : 2;
        gsap.fromTo(image, { yPercent: -amount }, {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest("figure"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
      });
    }, grid);

    return () => context.revert();
  }, []);

  return <div className="wrap visual-story-grid" ref={grid}>{children}</div>;
}
