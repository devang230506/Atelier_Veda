"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "@/components/animated-heading";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsHandle } from "three-stdlib";
import { projects } from "@/data/projects";

const RoomCanvas = dynamic(() => import("./room-scene"), {
  ssr: false,
  loading: () => <div className="room-loading" aria-hidden="true" />,
});

const chapters = [
  { id: "shell", label: "The shell", title: "A room begins with its quiet structure.", body: "We start with proportion, movement and the path of natural light." },
  { id: "materials", label: "Materials", title: "Texture gives a room its voice.", body: "Plaster, oak and stone arrive in a palette made to feel calm and tactile." },
  { id: "objects", label: "Objects", title: "Every piece finds its place.", body: "Sofa, table and lighting settle into the plan, each with room to breathe." },
  { id: "feeling", label: "The feeling", title: "Light brings the room together.", body: "A considered glow completes the scene and makes the space feel lived in." },
];
const windowImage = projects[0].gallery[0].src.replace("w=1280&q=80", "w=900&q=70");

export default function RoomExperience() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef({ value: 0 });
  const controlsRef = useRef<OrbitControlsHandle | null>(null);
  const invalidateRef = useRef<(() => void) | null>(null);
  const targetAzimuth = useRef<number | null>(null);
  const copyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) {
      progress.current.value = 1;
      setActiveStep(chapters.length - 1);
      copyRefs.current.forEach((element, index) => {
        if (!element) return;
        const isFinal = index === chapters.length;
        element.style.visibility = isFinal ? "visible" : "hidden";
        element.style.opacity = isFinal ? "1" : "0";
      });
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "veda-room-story",
          trigger: root.current,
          start: "top top",
          end: "+=2800",
          pin: stage.current,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const value = progress.current.value;
          const next = value < 0.315 ? 0 : value < 0.565 ? 1 : value < 0.815 ? 2 : 3;
          setActiveStep((current) => current === next ? current : next);
          invalidateRef.current?.();
        },
      });

      timeline.to(progress.current, { value: 1, duration: 4, ease: "none" }, 0);
      chapters.forEach((_, index) => {
        const element = copyRefs.current[index + 1];
        if (!element) return;
        const start = index === 0 ? 0.28 : index;
        const previous = copyRefs.current[index];
        if (previous) timeline.to(previous, { autoAlpha: 0, y: -12, duration: 0.12, ease: "none" }, start);
        timeline.fromTo(element, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: "none" }, start + 0.14);
      });
      ScrollTrigger.refresh();
    }, root);

    return () => context.revert();
  }, []);

  const jumpTo = useCallback((index: number) => {
    const trigger = ScrollTrigger.getById("veda-room-story");
    if (!trigger) {
      root.current?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth" });
      return;
    }
    const fractions = [0.2, 0.45, 0.7, 0.92];
    const top = trigger.start + (trigger.end - trigger.start) * fractions[index];
    window.scrollTo({ top, behavior: reduced.current ? "auto" : "smooth" });
  }, []);

  const rotateRoom = useCallback((amount: number) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const baseAngle = targetAzimuth.current ?? controls.getAzimuthalAngle();
    targetAzimuth.current = baseAngle + amount;
    controls.setAzimuthalAngle(targetAzimuth.current);
    controls.update();
  }, []);

  const clearOrbitTarget = useCallback(() => {
    targetAzimuth.current = null;
  }, []);

  const resetRoomView = useCallback(() => {
    targetAzimuth.current = null;
    controlsRef.current?.reset();
    controlsRef.current?.update();
  }, []);

  return (
    <section className="room-experience" ref={root} aria-label="A room taking shape">
      <div className="room-stage" ref={stage}>
        <div className="room-scene-wash" aria-hidden="true" />
        <Suspense fallback={<div className="room-loading" aria-hidden="true" />}>
          <RoomCanvas progress={progress as MutableRefObject<{ value: number }>} controlsRef={controlsRef} invalidateRef={invalidateRef} windowImage={windowImage} onOrbitInteraction={clearOrbitTarget} />
        </Suspense>
        <div className="room-topline"><span>Atelier Veda / Interior study</span><span>01 / 04 / Scroll to shape the space</span></div>
        <div className="room-copy-stack" aria-live="polite" aria-atomic="true">
          <div className="room-opening" ref={(element) => { copyRefs.current[0] = element; }}>
            <span className="eyebrow">A room, revealed in four layers</span>
            <AnimatedHeading as="h1" text="Spaces shaped by light." delay={0.18} />
            <p>Architecture and interiors guided by the way you live.</p>
          </div>
          {chapters.map((chapter, index) => (
            <div className="room-chapter-copy" key={chapter.id} ref={(element) => { copyRefs.current[index + 1] = element; }}>
              <span className="eyebrow">0{index + 1} / 04&nbsp;&nbsp; {chapter.label}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
            </div>
          ))}
        </div>
        <nav className="room-chapters" aria-label="Room animation chapters">
          {chapters.map((chapter, index) => (
            <button
              type="button"
              key={chapter.id}
              className={activeStep === index ? "room-chapter-button is-active" : "room-chapter-button"}
              aria-current={activeStep === index ? "step" : undefined}
              onClick={() => jumpTo(index)}
            >
              <span>0{index + 1}</span>{chapter.label}
            </button>
          ))}
        </nav>
        <div className="room-drag-note"><span aria-hidden="true">↔</span> Drag or swipe sideways to orbit · Scroll to shape</div>
        <div className="room-view-controls" role="group" aria-label="3D room view controls">
          <button type="button" aria-label="Rotate room left 45 degrees" onClick={() => rotateRoom(-Math.PI / 4)}>↶</button>
          <button type="button" className="room-view-reset" aria-label="Reset room view" onClick={resetRoomView}>360°</button>
          <button type="button" aria-label="Rotate room right 45 degrees" onClick={() => rotateRoom(Math.PI / 4)}>↷</button>
        </div>
        <a className="room-skip" href="#intro">Skip the room story <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
