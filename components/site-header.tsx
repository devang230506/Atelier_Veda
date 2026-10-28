"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = [
  ["Studio", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Contact", "/contact"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const element = header.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".wordmark", { y: -14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out" });
      gsap.fromTo(".primary-nav > *", { y: -12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.045, delay: 0.06, ease: "power3.out", clearProps: "transform,opacity,visibility" });
    }, element);
    return () => context.revert();
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="site-header" ref={header}>
      <Link className="wordmark" href="/" aria-label="Atelier Veda home">
        Atelier <span>Veda</span><i aria-hidden="true">✳</i>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
            {label}
          </Link>
        ))}
        <Link className="nav-cta" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
  );
}
