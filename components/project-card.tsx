"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Project } from "@/data/projects";
import Reveal from "@/components/reveal";

export default function ProjectCard({ project, index = 0, featured = false }: { project: Project; index?: number; featured?: boolean }) {
  const imageFrame = useRef<HTMLDivElement>(null);
  const tiltTo = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null);
  const motion = index % 2 === 0 ? "left" : "right";
  const formattedIndex = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const frame = imageFrame.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    tiltTo.current = {
      x: gsap.quickTo(frame, "rotationX", { duration: 0.42, ease: "power2.out" }),
      y: gsap.quickTo(frame, "rotationY", { duration: 0.42, ease: "power2.out" }),
    };
    return () => {
      tiltTo.current = null;
      gsap.killTweensOf(frame);
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltTo.current?.x(y * -3.5);
    tiltTo.current?.y(x * 3.5);
  };

  const handlePointerLeave = () => {
    tiltTo.current?.x(0);
    tiltTo.current?.y(0);
  };

  return (
    <Reveal className={`project-card ${featured ? "project-card-featured" : "project-card-standard"} project-card-${index % 4}`} motion={motion} delay={featured ? (index % 2) * 0.1 : 0}>
      <Link href={`/projects/${project.slug}`} className="project-card-link">
        <div className="project-image-wrap" ref={imageFrame} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
          <div className="project-image-parallax"><img src={project.image} alt={project.alt} loading={featured ? "lazy" : index < 2 ? "eager" : "lazy"} decoding="async" fetchPriority={!featured && index === 0 ? "high" : "auto"} /></div>
          <span className="project-index">{formattedIndex}</span>
          <span className="project-open" aria-hidden="true">↗</span>
          <span className="project-image-caption" aria-hidden="true">Explore study <span>↗</span></span>
        </div>
        <div className="project-card-meta"><h3>{project.title}</h3><span>{project.category}</span></div>
      </Link>
    </Reveal>
  );
}
