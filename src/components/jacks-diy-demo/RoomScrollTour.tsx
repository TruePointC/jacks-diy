"use client";

import { useEffect, useRef } from "react";
import { jacksDemo } from "@/lib/config";
import { useJobList } from "./jobListStore";
import { RED, display, mono, mailto } from "./theme";
import styles from "./RoomScrollTour.module.css";

type Step = {
  id: string;
  box: { x: number; y: number; w: number; h: number };
  title: string;
  text: string;
  tags: string[];
  job: string;
  before?: boolean;
};

// box = the area to zoom to, on a 1600 x 900 grid over the room image.
// Illustrative room (Owen confirmed it's AI-generated, not a real finished
// job) — so the jobs it walks through are real services from the site's own
// list, but the room itself isn't presented as a specific completed job.
const STEPS: Step[] = [
  {
    id: "media",
    box: { x: 540, y: 140, w: 550, h: 560 },
    title: "Media walls",
    job: "Media walls",
    text: "Media walls built from scratch with recesses for the TV and fire, or just a TV mounted neatly with the cables hidden away.",
    tags: ["Media walls", "TV mounting", "Hidden cables"],
  },
  {
    id: "lighting",
    box: { x: 340, y: 30, w: 700, h: 470 },
    title: "Lighting",
    job: "Fit wall lights",
    text: "Old light fittings swapped for new ones, like the wall light on the panelling, plus LED strips that make a room feel warm in the evening.",
    tags: ["Light fittings", "Wall lights", "LED strips"],
  },
  {
    id: "painting",
    box: { x: 0, y: 0, w: 300, h: 600 },
    title: "Painting & decorating",
    job: "Painting walls and ceilings",
    text: "Cracks and holes filled, then walls, ceilings, doors and skirting painted with crisp, clean lines. Keep scrolling to paint the wall.",
    tags: ["Filling", "Walls & ceilings", "Doors & skirting"],
    before: true,
  },
  {
    id: "slats",
    box: { x: 266, y: 162, w: 290, h: 496 },
    title: "Slat panelling",
    job: "Acoustic slat panelling",
    text: "Acoustic oak slat panels, cut to size and fitted level from floor to ceiling, so a plain wall becomes a feature.",
    tags: ["Acoustic panels", "Feature walls"],
  },
  {
    id: "sofa",
    box: { x: 0, y: 566, w: 560, h: 334 },
    title: "Flat-pack & assembly",
    job: "Fix furniture to the wall (anti-tip)",
    text: "Wardrobes, beds and flat-pack of every kind, built solidly and fixed to the wall where it needs to be.",
    tags: ["Flat-pack", "Wall fixing"],
  },
  {
    id: "flooring",
    box: { x: 1060, y: 652, w: 430, h: 112 },
    title: "Flooring",
    job: "Floor boarding (MDF and ply)",
    text: "Floor boarding laid on a level base, uneven floors boarded flat, and squeaky boards fixed for good.",
    tags: ["Floor boarding", "Squeaky floors", "Thresholds"],
  },
  {
    id: "sockets",
    box: { x: 1236, y: 562, w: 90, h: 54 },
    title: "Sockets & switches",
    job: "Replace sockets and switches",
    text: "Old sockets and switches replaced with faceplates that match the room. The small finishing touch people notice.",
    tags: ["Sockets", "Switches", "Faceplates"],
  },
  {
    id: "shelves",
    box: { x: 1068, y: 192, w: 304, h: 316 },
    title: "Floating shelves",
    job: "Shelves and floating shelves",
    text: "Hidden-fix shelves with no brackets showing, levelled and fixed solidly enough to hold the books.",
    tags: ["Hidden fixings", "Alcoves"],
  },
];

const MAX_ZOOM = 2.4;
const PAD = 16;
const N = STEPS.length;

export function RoomScrollTour() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<SVGRectElement>(null);
  const ringRef = useRef<SVGRectElement>(null);
  const shadeRef = useRef<SVGRectElement>(null);
  const pNumRef = useRef<HTMLSpanElement>(null);
  const pFillRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLElement | null)[]>([]);
  const beforeRef = useRef<HTMLDivElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const baBeforeRef = useRef<HTMLSpanElement>(null);
  const baAfterRef = useRef<HTMLSpanElement>(null);
  const outroListRef = useRef<HTMLDivElement>(null);
  const sendLinkRef = useRef<HTMLAnchorElement>(null);

  const { ticked, toggle } = useJobList();

  // Keep the outro "your list" summary and mailto link in sync with the
  // real, shared job list (same store the rest of the site uses).
  useEffect(() => {
    const n = ticked.length;
    if (outroListRef.current) {
      outroListRef.current.innerHTML = n
        ? `<h4 style="font:700 13px var(--font-big-shoulders),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${RED};margin-bottom:10px">Your list &middot; ${n} job${n > 1 ? "s" : ""}</h4><ul>${ticked
            .map(
              (j) =>
                `<li style="font-size:13.5px;padding:6px 11px;background:rgba(215,38,46,.16);color:#fff;border:1px solid rgba(215,38,46,.4)">${j.replace(/</g, "&lt;")}</li>`,
            )
            .join("")}</ul>`
        : `<h4 style="font:700 13px var(--font-big-shoulders),sans-serif;letter-spacing:.12em;text-transform:uppercase;color:${RED};margin-bottom:10px">Your list</h4><p style="color:#bfc4bd;font-size:14.5px;line-height:1.5;margin:0">Nothing ticked yet &mdash; scroll back and add a job, or just send Jack a message about what you need.</p>`;
    }
    const body = `Hi Jack, here are the jobs I need doing:\n\n${ticked.length ? ticked.map((j) => "- " + j).join("\n") : "(tell Jack what you need)"}\n\nMy area: \nBest time to call: \n`;
    if (sendLinkRef.current) {
      sendLinkRef.current.href = `${mailto}?subject=${encodeURIComponent("My job list")}&body=${encodeURIComponent(body)}`;
    }
  }, [ticked]);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || cancelled) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const vp = viewportRef.current;
      const stage = stageRef.current;
      if (!vp || !stage) return;

      type Layout = {
        vw: number;
        vh: number;
        k: number;
        Sw: number;
        Sh: number;
        left: number;
        top: number;
        off: number;
        fy: number;
        aw: number;
        ah: number;
      };
      let L: Layout = { vw: 0, vh: 0, k: 1, Sw: 0, Sh: 0, left: 0, top: 0, off: 0, fy: 0, aw: 0, ah: 0 };
      const cam = { p: 0 };
      const fx = { dim: 0 };

      function layout() {
        if (!vp || !stage) return;
        const vw = vp.clientWidth;
        const vh = vp.clientHeight;
        const k = Math.max(vw / 1600, vh / 900);
        const mobile = vw < 760;
        L = {
          vw,
          vh,
          k,
          Sw: 1600 * k,
          Sh: 900 * k,
          left: (vw - 1600 * k) / 2,
          top: (vh - 900 * k) / 2,
          off: mobile ? 0 : vw * 0.16,
          fy: mobile ? vh * 0.36 : vh * 0.5,
          aw: mobile ? vw * 0.9 : vw * 0.5,
          ah: mobile ? vh * 0.48 : vh * 0.74,
        };
        stage.style.width = L.Sw + "px";
        stage.style.height = L.Sh + "px";
        stage.style.left = L.left + "px";
        stage.style.top = L.top + "px";
      }

      function frame(j: number) {
        if (j <= 0 || j > N) return { x: 800, y: 450, z: 1, fo: 0, h: [-40, -40, 1680, 980] };
        const b = STEPS[j - 1].box;
        const z = Math.min(MAX_ZOOM, Math.max(1, Math.min(L.aw / (b.w * L.k), L.ah / (b.h * L.k))));
        const side = b.x + b.w / 2 < 700 ? -1 : 1;
        return { x: b.x + b.w / 2, y: b.y + b.h / 2, z, fo: side, h: [b.x - PAD, b.y - PAD, b.w + PAD * 2, b.h + PAD * 2] };
      }
      const mix = (a: number, b: number, t: number) => a + (b - a) * t;

      function render() {
        if (!stage) return;
        const i = Math.min(N, Math.floor(cam.p));
        const t = cam.p - i;
        const A = frame(i);
        const B = frame(i + 1);
        const z = Math.exp(mix(Math.log(A.z), Math.log(B.z), t));
        const x = mix(A.x, B.x, t);
        const y = mix(A.y, B.y, t);
        const fo = mix(A.fo, B.fo, t);
        const focX = L.vw / 2 + fo * L.off;
        const focY = L.vh / 2 + Math.abs(fo) * (L.fy - L.vh / 2);
        let tx = focX - L.left - z * x * L.k;
        let ty = focY - L.top - z * y * L.k;
        tx = Math.min(-L.left, Math.max(L.vw - L.left - z * L.Sw, tx));
        ty = Math.min(-L.top, Math.max(L.vh - L.top - z * L.Sh, ty));
        stage.style.transform = `translate(${tx}px,${ty}px) scale(${z})`;
        const h = A.h.map((v, k2) => mix(v, B.h[k2], t));
        [holeRef.current, ringRef.current].forEach((el) => {
          if (!el) return;
          el.setAttribute("x", String(h[0]));
          el.setAttribute("y", String(h[1]));
          el.setAttribute("width", String(h[2]));
          el.setAttribute("height", String(h[3]));
        });
        shadeRef.current?.setAttribute("opacity", String(fx.dim));
        ringRef.current?.setAttribute("opacity", String(Math.min(1, fx.dim * 1.5)));
        const step = Math.max(1, Math.min(N, Math.round(cam.p)));
        if (pNumRef.current) pNumRef.current.textContent = String(step).padStart(2, "0");
        if (progressRef.current) progressRef.current.style.opacity = cam.p > 0.5 && cam.p < N + 0.5 ? "1" : "0";
      }

      layout();
      const T0 = 0.6;
      const STEP = 2;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onUpdate() {
          render();
          if (pFillRef.current) pFillRef.current.style.width = tl.progress() * 100 + "%";
        },
      });
      if (introRef.current) tl.to(introRef.current, { autoAlpha: 0, y: -40, duration: 0.5, ease: "power1.in" }, 0.05);

      STEPS.forEach((s, i) => {
        const at = T0 + i * STEP;
        tl.to(cam, { p: i + 1, duration: 1 }, at);
        if (i === 0) tl.to(fx, { dim: 0.68, duration: 0.8 }, at);
        const cap = capRefs.current[i];
        if (cap) {
          tl.fromTo(cap, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power1.out" }, at + 0.75);
          tl.to(cap, { autoAlpha: 0, y: -24, duration: 0.35, ease: "power1.in" }, at + 1.75);
        }
        if (s.before && beforeRef.current && rollerRef.current && baBeforeRef.current && baAfterRef.current) {
          tl.to([beforeRef.current, baBeforeRef.current], { autoAlpha: 1, duration: 0.4, ease: "none" }, at + 0.3);
          tl.set(rollerRef.current, { autoAlpha: 1 }, at + 0.85);
          tl.fromTo(
            beforeRef.current,
            { clipPath: "polygon(0% 0,100% 0,100% 100%,0% 100%)" },
            { clipPath: "polygon(100% 0,100% 0,100% 100%,100% 100%)", duration: 0.8, ease: "none" },
            at + 0.85,
          );
          tl.fromTo(rollerRef.current, { left: "0%" }, { left: "17.1%", duration: 0.8, ease: "none" }, at + 0.85);
          tl.to(baBeforeRef.current, { autoAlpha: 0, duration: 0.15 }, at + 0.95);
          tl.to(baAfterRef.current, { autoAlpha: 1, duration: 0.2 }, at + 1.5);
          tl.to([rollerRef.current, baAfterRef.current], { autoAlpha: 0, duration: 0.2 }, at + 1.75);
          tl.set(beforeRef.current, { autoAlpha: 0 }, at + 1.7);
        }
      });
      const end = T0 + N * STEP;
      tl.to(cam, { p: N + 1, duration: 1 }, end);
      tl.to(fx, { dim: 0.6, duration: 1 }, end);
      if (outroRef.current) tl.fromTo(outroRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power1.out" }, end + 0.6);
      tl.to({}, { duration: 0.6 }, end + 1.1);

      const st = ScrollTrigger.create({
        trigger: vp,
        start: "top top",
        pin: true,
        scrub: 0.8,
        animation: tl,
        end: () => "+=" + Math.round(tl.duration() * window.innerHeight * 0.55),
        onRefresh() {
          layout();
          render();
        },
      });
      const onResize = () => {
        layout();
        render();
      };
      window.addEventListener("resize", onResize);
      render();

      cleanup = () => {
        window.removeEventListener("resize", onResize);
        st.kill();
        tl.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className={styles.tour}>
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={stageRef} className={styles.stage}>
          <img
            src="/images/jacks-diy-demo/room-tour.jpg"
            alt="An illustration of the kind of finish Jack's DIY aims for: a media wall with TV and electric fire, oak slat panelling, floating shelves and a corner sofa"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", display: "block" }}
          />
          <div ref={beforeRef} className={styles.before} />
          <div ref={rollerRef} className={styles.roller} style={{ backgroundColor: RED }} />
          <span ref={baBeforeRef} className={styles.ba} style={{ ...mono, left: "1.2%", top: "52%" }}>
            Before
          </span>
          <span ref={baAfterRef} className={styles.ba} style={{ ...mono, left: "1.2%", top: "52%" }}>
            After
          </span>

          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ pointerEvents: "none" }}>
            <defs>
              <mask id="mHole" maskUnits="userSpaceOnUse" x={-100} y={-100} width={1800} height={1100}>
                <rect x={-100} y={-100} width={1800} height={1100} fill="#fff" />
                <rect ref={holeRef} x={0} y={0} width={1600} height={900} rx={2} fill="#000" />
              </mask>
            </defs>
            <rect ref={shadeRef} x={-100} y={-100} width={1800} height={1100} fill="#070807" mask="url(#mHole)" opacity={0} />
            <rect ref={ringRef} x={0} y={0} width={1600} height={900} fill="none" stroke="#e8b464" strokeWidth={2} vectorEffect="non-scaling-stroke" opacity={0} />
          </svg>
        </div>

        <div ref={introRef} className={styles.intro}>
          <p style={{ ...mono, color: RED }} className="text-sm font-semibold">
            Handyman &middot; Carpentry &middot; Decorating
          </p>
          <h1 style={display} className="mt-3 text-5xl leading-[0.9] font-black text-white uppercase sm:text-7xl lg:text-8xl">
            Every detail of your room, done properly.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            An illustration of the kind of finish Jack works to &mdash; media walls, panelling, shelving, flooring and
            more. Scroll through and tick the jobs you need.
          </p>
          <div className={styles.cue}>
            <span />
            Scroll to explore and tick the jobs you need
          </div>
        </div>

        <div className={styles.captions}>
          {STEPS.map((s, i) => {
            const side = s.box.x + s.box.w / 2 < 700 ? -1 : 1;
            const on = ticked.includes(s.job);
            const n = String(i + 1).padStart(2, "0");
            return (
              <article
                key={s.id}
                ref={(el) => {
                  capRefs.current[i] = el;
                }}
                className={`${styles.cap} ${side < 0 ? styles.right : ""}`}
              >
                <div style={{ ...mono, color: RED }} className="text-xs font-bold tracking-widest">
                  {n} / {String(N).padStart(2, "0")}
                </div>
                <h2 style={display} className="mt-2 mb-3 text-3xl leading-[1.05] font-black text-white uppercase sm:text-4xl">
                  {s.title}
                </h2>
                <p className="text-[15.5px] leading-relaxed text-white/80">{s.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border px-3 py-1.5 text-xs text-white/85"
                      style={{ ...mono, borderColor: "rgba(215,38,46,.4)", backgroundColor: "rgba(215,38,46,.14)" }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => toggle(s.job)}
                  style={on ? { ...display, color: RED, borderColor: RED } : { ...display, backgroundColor: RED, borderColor: RED }}
                  className={`mt-4 inline-flex items-center gap-2 border-2 px-4 py-2 text-sm font-extrabold tracking-wide uppercase ${on ? "bg-transparent" : "text-white"}`}
                >
                  {on ? "✓ On your list" : "+ Add to my list"}
                </button>
              </article>
            );
          })}
        </div>

        <div ref={outroRef} className={styles.outro}>
          <h2 style={display} className="max-w-[16ch] text-4xl leading-[0.95] font-black text-white uppercase sm:text-6xl">
            Small jobs. Big difference.
          </h2>
          <div ref={outroListRef} className={styles.mylist} />
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              ref={sendLinkRef}
              href={mailto}
              style={{ ...display, backgroundColor: RED }}
              className="inline-flex min-h-11 items-center px-6 text-lg font-extrabold tracking-wide text-white uppercase"
            >
              Send Jack your list
            </a>
            <a
              href="#services"
              style={{ ...display, borderColor: "rgba(255,255,255,.5)" }}
              className="inline-flex min-h-11 items-center border-2 px-6 text-lg font-extrabold tracking-wide text-white uppercase"
            >
              See all services
            </a>
          </div>
          <p className="mt-4 text-sm text-white/70">Or text Jack on {jacksDemo.phoneDisplay}</p>
          <p className="mt-1 text-sm text-white/55">{jacksDemo.area}</p>
        </div>

        <div ref={progressRef} className={styles.progress}>
          <span ref={pNumRef} style={{ ...display, color: "white" }} className="text-sm font-bold">
            01
          </span>
          <em style={{ ...mono, color: "rgba(255,255,255,.55)" }} className="not-italic">
            / {String(N).padStart(2, "0")}
          </em>
          <div className={styles.track}>
            <div ref={pFillRef} className={styles.fill} style={{ backgroundColor: RED }} />
          </div>
        </div>
      </div>
    </section>
  );
}
