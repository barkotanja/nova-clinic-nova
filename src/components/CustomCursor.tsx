"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, frame = 0;
    const move = (event: MouseEvent) => { x = event.clientX; y = event.clientY; dot.current?.style.setProperty("transform", `translate3d(${x}px,${y}px,0)`); };
    const loop = () => { rx += (x - rx) * .17; ry += (y - ry) * .17; ring.current?.style.setProperty("transform", `translate3d(${rx}px,${ry}px,0)`); frame = requestAnimationFrame(loop); };
    const over = (event: MouseEvent) => { const target = event.target as HTMLElement; ring.current?.classList.toggle("cursor-active", Boolean(target.closest("a,button,input,select,textarea,[data-cursor]"))); };
    addEventListener("mousemove", move); addEventListener("mouseover", over); frame = requestAnimationFrame(loop);
    return () => { removeEventListener("mousemove", move); removeEventListener("mouseover", over); cancelAnimationFrame(frame); };
  }, []);

  return <><div ref={dot} className="cursor-dot" /><div ref={ring} className="cursor-ring"><span>MOVE</span></div></>;
}
