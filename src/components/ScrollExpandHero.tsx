"use client";

import { useEffect, useRef, useState } from "react";

type Props = { locale: "en" | "am"; eyebrow: string; titleA: string; titleB: string; body: string; book: string; inquiry: string; call: string; phoneHref: string };

export default function ScrollExpandHero({ locale, eyebrow, titleA, titleB, body, book, inquiry, call, phoneHref }: Props) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const progressRef = useRef(0);
  const touchY = useRef(0);

  useEffect(() => { progressRef.current = progress; }, [progress]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(1); setReady(true); return; }
    const update = (delta: number) => {
      const next = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = next; setProgress(next); if (next >= .995) setReady(true);
    };
    const wheel = (event: globalThis.WheelEvent) => {
      if (scrollY > 8 || progressRef.current >= 1 && event.deltaY > 0) return;
      if (progressRef.current < 1 || event.deltaY < 0 && scrollY <= 8) { event.preventDefault(); update(event.deltaY * .00125); }
    };
    const start = (event: globalThis.TouchEvent) => { touchY.current = event.touches[0]?.clientY || 0; };
    const move = (event: globalThis.TouchEvent) => {
      if (!touchY.current) return; const now = event.touches[0]?.clientY || 0; const delta = touchY.current - now;
      if (scrollY <= 8 && (progressRef.current < 1 || delta < 0)) { event.preventDefault(); update(delta * .005); touchY.current = now; }
    };
    addEventListener("wheel", wheel, { passive: false }); addEventListener("touchstart", start, { passive: true }); addEventListener("touchmove", move, { passive: false });
    return () => { removeEventListener("wheel", wheel); removeEventListener("touchstart", start); removeEventListener("touchmove", move); };
  }, []);

  const mediaStyle = { width: `${320 + progress * 1280}px`, height: `${430 + progress * 500}px`, maxWidth: `${92 + progress * 8}vw`, maxHeight: `${76 + progress * 24}svh`, borderRadius: `${28 - progress * 28}px` };
  const titleShift = progress * 64;
  return <section className={`nova-hero ${ready ? "hero-ready" : ""}`} id="top" style={{ "--hero-progress": progress } as React.CSSProperties}>
    <div className="hero-backdrop" style={{ opacity: 1 - progress * .9 }}><img src="/assets/images/nova-team-hero.png" alt="Nova Physiotherapy care team" /></div>
    <div className="hero-veil" />
    <div className="hero-kicker"><span>{eyebrow}</span><span>ADDIS ABABA · ET</span></div>
    <div className="hero-frame" style={mediaStyle}>
      <video autoPlay muted loop playsInline preload="metadata" poster="/assets/images/nova-team-hero.png"><source src="/assets/videos/nova-hero.mp4" type="video/mp4" /></video>
      <div className="hero-video-overlay" />
      <div className="hero-frame-label"><span>PHYSIOTHERAPY · REIMAGINED</span><b>01</b></div>
    </div>
    <div className="hero-title" aria-label={`${titleA} ${titleB}`}>
      <span style={{ transform: `translateX(${-titleShift}vw)` }}>{titleA}</span>
      <em style={{ transform: `translateX(${titleShift}vw)` }}>{titleB}</em>
    </div>
    <div className="hero-copy-block" style={{ opacity: Math.max(0, 1 - progress * 2.1) }}><p>{body}</p><div><a className="button button-cream" href="#booking" data-cursor>{book}</a><a className="button button-glass" href="#booking" data-cursor>{inquiry}</a><a className="hero-call" href={phoneHref}>{call} ↗</a></div></div>
    <div className="hero-scroll"><span>{progress < .98 ? (locale === "en" ? "SCROLL TO ENTER" : "ለመግባት ይሸብልሉ") : (locale === "en" ? "EXPLORE NOVA" : "ኖቫን ያስሱ")}</span><i><b style={{ transform: `scaleX(${Math.max(.08, progress)})` }} /></i><small>{String(Math.round(progress * 100)).padStart(2,"0")}</small></div>
  </section>;
}
