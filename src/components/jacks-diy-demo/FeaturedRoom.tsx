import Image from "next/image";
import { jacksRoom } from "@/lib/config";
import { AnnotatedPhoto } from "./AnnotatedPhoto";
import { RoomVideo } from "./RoomVideo";
import { RED, INK, MUTED, display, mono } from "./theme";

// The living room makeover: annotated media wall, walk-through video and
// detail shots. Shown on the home page and the recent jobs page.
export function FeaturedRoom() {
  return (
    <article className="border-2 bg-white" style={{ borderColor: INK }}>
      <figure className="border-b-2" style={{ borderColor: INK }}>
        <figcaption
          style={display}
          className="flex items-baseline justify-between gap-4 border-b-2 px-4 py-2.5 text-xl font-extrabold uppercase sm:px-5"
        >
          The finished media wall
          <span style={{ ...mono, color: MUTED }} className="hidden text-xs font-normal tracking-normal normal-case sm:inline">
            What Jack did, piece by piece
          </span>
        </figcaption>
        <AnnotatedPhoto
          src={jacksRoom.finished.src}
          alt={jacksRoom.finished.alt}
          notes={jacksRoom.finished.notes}
          red={RED}
          ink={INK}
          display={display}
          mono={mono}
        />
      </figure>
      <div className="grid lg:grid-cols-[360px_1fr]">
        <div className="relative aspect-[4/5] w-full border-b-2 lg:aspect-[9/16] lg:border-r-2 lg:border-b-0" style={{ borderColor: INK }}>
          <RoomVideo src={jacksRoom.video} poster={jacksRoom.poster} label="Walk-through video of the finished living room" />
        </div>
        <div className="flex flex-col p-5 sm:p-8">
          <p style={{ ...mono, color: RED }} className="text-xs font-semibold tracking-[0.14em] uppercase">
            Featured job
          </p>
          <h3 style={display} className="mt-2 text-4xl leading-[0.95] font-black uppercase sm:text-5xl">
            {jacksRoom.title}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {jacksRoom.features.map((f) => (
              <li key={f} className="border-2 px-3 py-1 text-[15px] font-bold" style={{ borderColor: INK }}>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid flex-1 grid-cols-3 gap-3">
            {jacksRoom.stills.map((still) => (
              <div key={still.src} className="relative aspect-[3/4] overflow-hidden lg:aspect-auto lg:min-h-[260px]">
                <Image src={still.src} alt={still.alt} fill sizes="(min-width: 1024px) 240px, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
