"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Bolt = { paths: Point[][]; born: number; life: number; width: number };

/**
 * "Power" effect for the hero banner (mouse only):
 * the circuit lines light up around the cursor, a soft glow follows it,
 * and short white lightning sparks crackle out as the cursor moves.
 * Place it inside the hero <section>; it listens to pointer moves on that section.
 */
export function HeroPower() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const section = layer?.parentElement;
    if (!layer || !canvas || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const sparks = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let bolts: Bolt[] = [];
    let frame = 0;
    let lastSpawn = 0;
    let last: Point | null = null;

    const resize = () => {
      const { width, height } = section.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    /** Jagged line from a point in a direction, with an occasional branch. */
    const makeBolt = (from: Point): Bolt => {
      const angle = Math.random() * Math.PI * 2;
      const length = 50 + Math.random() * 90;
      const main: Point[] = [from];
      const steps = 7 + Math.floor(Math.random() * 4);
      const paths: Point[][] = [main];
      for (let i = 1; i <= steps; i++) {
        const t = (i / steps) * length;
        const jitter = (Math.random() - 0.5) * 22;
        const p = {
          x: from.x + Math.cos(angle) * t + Math.cos(angle + Math.PI / 2) * jitter,
          y: from.y + Math.sin(angle) * t + Math.sin(angle + Math.PI / 2) * jitter,
        };
        main.push(p);
        if (i > 2 && i < steps - 1 && Math.random() < 0.3) {
          const bAngle = angle + (Math.random() < 0.5 ? -1 : 1) * (0.5 + Math.random() * 0.6);
          const branch: Point[] = [p];
          const bLen = 15 + Math.random() * 35;
          for (let j = 1; j <= 3; j++) {
            const bt = (j / 3) * bLen;
            branch.push({
              x: p.x + Math.cos(bAngle) * bt + (Math.random() - 0.5) * 8,
              y: p.y + Math.sin(bAngle) * bt + (Math.random() - 0.5) * 8,
            });
          }
          paths.push(branch);
        }
      }
      return { paths, born: performance.now(), life: 220 + Math.random() * 160, width: 1.2 + Math.random() * 1.2 };
    };

    const draw = (now: number) => {
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bolts = bolts.filter((b) => now - b.born < b.life);
      for (const b of bolts) {
        const fade = 1 - (now - b.born) / b.life;
        // Flicker like a real arc.
        const alpha = fade * (0.65 + Math.random() * 0.35);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        b.paths.forEach((path, i) => {
          ctx.beginPath();
          path.forEach((p, k) => (k === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
          // Blue outer glow, then a white hot core.
          ctx.shadowColor = "rgba(47, 134, 255, 0.95)";
          ctx.shadowBlur = 14;
          ctx.strokeStyle = `rgba(160, 205, 255, ${alpha * 0.6})`;
          ctx.lineWidth = (i === 0 ? b.width : b.width * 0.6) + 2.5;
          ctx.stroke();
          ctx.shadowBlur = 6;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = i === 0 ? b.width : b.width * 0.6;
          ctx.stroke();
        });
      }
      frame = bolts.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = section.getBoundingClientRect();
      const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      layer.style.setProperty("--px", `${p.x}px`);
      layer.style.setProperty("--py", `${p.y}px`);
      layer.dataset.active = "true";

      if (!sparks) return;
      const now = performance.now();
      const speed = last ? Math.hypot(p.x - last.x, p.y - last.y) : 0;
      last = p;
      // More movement, more sparks; still throttled so it stays subtle.
      if (now - lastSpawn > (speed > 18 ? 55 : 110)) {
        lastSpawn = now;
        bolts.push(makeBolt(p));
        if (speed > 30 && Math.random() < 0.5) bolts.push(makeBolt(p));
        if (!frame) frame = requestAnimationFrame(draw);
      }
    };
    const onLeave = () => {
      layer.dataset.active = "false";
      last = null;
    };

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={layerRef}
        data-active="false"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 data-[active=true]:opacity-100"
      >
        {/* Circuit lines light up around the cursor */}
        <div
          className="circuit-lit absolute inset-0"
          style={{
            maskImage: "radial-gradient(circle 230px at var(--px, -999px) var(--py, -999px), #000 0%, #000 30%, rgb(0 0 0 / 0.5) 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle 230px at var(--px, -999px) var(--py, -999px), #000 0%, #000 30%, rgb(0 0 0 / 0.5) 60%, transparent 100%)",
          }}
        />
        {/* Soft glow that follows the cursor */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 260px at var(--px, -999px) var(--py, -999px), rgb(255 255 255 / 0.13), rgb(47 134 255 / 0.12) 40%, transparent 70%)",
          }}
        />
      </div>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />
    </>
  );
}
