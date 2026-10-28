"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  as?: "h1" | "h2";
  text: string;
  className?: string;
  delay?: number;
};

export default function AnimatedHeading({ as: Tag = "h1", text, className = "", delay = 0 }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = heading.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = element.querySelectorAll<HTMLElement>(".animated-heading-word");
    const context = gsap.context(() => {
      gsap.fromTo(words, {
        yPercent: -125,
        autoAlpha: 0,
        rotateX: -14,
        transformPerspective: 1100,
        transformOrigin: "50% 0%",
      }, {
        yPercent: 0,
        autoAlpha: 1,
        rotateX: 0,
        duration: 0.88,
        delay,
        stagger: 0.075,
        ease: "power4.out",
        clearProps: "transform,opacity,visibility",
      });
    }, element);

    return () => context.revert();
  }, [delay, text]);

  return (
    <Tag ref={heading} className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span className="animated-heading-visual" aria-hidden="true">
        {text.split(/\s+/).map((word, index) => (
          <span className="animated-heading-mask" key={`${word}-${index}`}>
            <span className="animated-heading-word">{word}</span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
