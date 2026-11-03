"use client";

import { useEffect, useRef } from "react";
import styles from "./JacksTradeScene.module.css";

// The three icons from Jack's flyer — hammer, bolt, paint roller — printed as a
// pale tint of the brand red. One shows at a time, swapping as each section
// marked with data-trade scrolls into view.
export function JacksTradeScene({ tint }: { tint: string }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-trade]"));

    let lastUpdate = 0;
    const RAMP_DISTANCE = 700;

    function update() {
      if (!el) return;
      // Last marked section whose top has passed the middle of the screen
      let trade = "hammer";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.55) {
          trade = section.dataset.trade ?? trade;
        }
      }
      el.dataset.trade = trade;
      if (!reduceMotion) {
        const progress = Math.min(1, Math.max(0, window.scrollY / RAMP_DISTANCE));
        el.style.setProperty("--scroll-progress", progress.toFixed(3));
      }
    }

    // Throttled, with a trailing run so the shape is right once scrolling stops
    let trailing: number | undefined;
    function onScroll() {
      window.clearTimeout(trailing);
      trailing = window.setTimeout(update, 60);
      const now = Date.now();
      if (now - lastUpdate < 16) return;
      lastUpdate = now;
      update();
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(trailing);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} data-trade="hammer" aria-hidden="true">
      {/* Hammer sits on the right, poking out past the hero's job list card */}
      <div className={`${styles.shapeWrap} ${styles.right}`}>
        <svg viewBox="0 0 240 470" className={`${styles.svg} ${styles.shape} ${styles.hammer}`} preserveAspectRatio="xMidYMid meet" fill={tint}>
          <g transform="rotate(16 120 240)">
            {/* Handle, slightly flared at the grip */}
            <path d="M106,128 H134 L142,440 Q142,458 120,458 Q98,458 98,440 Z" />
            {/* Head with striking face on the right, claw curving down on the left */}
            <path d="M60,62 H192 V72 H218 V122 H192 V132 H60 C46,142 34,162 26,196 C14,154 20,104 42,78 C48,70 54,64 60,62 Z" />
          </g>
        </svg>
      </div>

      <div className={styles.shapeWrap}>
        <svg viewBox="0 0 240 470" className={`${styles.svg} ${styles.shape} ${styles.bolt}`} preserveAspectRatio="xMidYMid meet" fill={tint}>
          <path d="M128,10 L52,214 L104,214 L84,400 L186,152 L130,152 Z" />
        </svg>
      </div>

      <div className={styles.shapeWrap}>
        <svg viewBox="0 0 240 470" className={`${styles.svg} ${styles.shape} ${styles.roller}`} preserveAspectRatio="xMidYMid meet" fill={tint}>
          <g transform="rotate(-14 120 240)">
            {/* Roller sleeve */}
            <rect x="26" y="40" width="176" height="84" rx="16" />
            {/* Wire frame from the sleeve's end down to the handle */}
            <path
              d="M202,82 H226 V176 H120 V238"
              fill="none"
              stroke={tint}
              strokeWidth={16}
              strokeLinejoin="miter"
            />
            {/* Ferrule and handle */}
            <rect x="108" y="230" width="24" height="26" />
            <rect x="100" y="252" width="40" height="206" rx="20" />
          </g>
        </svg>
      </div>
    </div>
  );
}
