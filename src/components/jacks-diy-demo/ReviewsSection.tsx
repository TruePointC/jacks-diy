import { Star } from "@phosphor-icons/react/dist/ssr";
import { RED, INK, MUTED, display, mono } from "./theme";

type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  job?: string;
  location?: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} weight="fill" style={{ color: i < rating ? RED : "#E5E5E2" }} />
      ))}
    </span>
  );
}

// Hides itself while there are no real reviews yet — never fills this with
// placeholder/example quotes, see the note on jacksReviews in the config.
// `showHeading` is false when the caller's own page already has a hero
// heading (e.g. the dedicated /reviews page) and this should just be the
// average-rating line + card grid underneath it.
export function ReviewsSection({ reviews, showHeading = true }: { reviews: Review[]; showHeading?: boolean }) {
  if (!reviews.length) return null;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const summary = (
    <p className="flex items-center gap-2 text-lg font-bold" style={{ color: INK }}>
      <Stars rating={Math.round(average)} />
      {average.toFixed(1)} from {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
    </p>
  );

  return (
    <section aria-labelledby={showHeading ? "reviews-title" : undefined} className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {showHeading ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="reviews-title" style={display} className="text-5xl leading-[0.9] font-black uppercase sm:text-6xl">
              What people say
            </h2>
            {summary}
          </div>
        ) : (
          summary
        )}

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <li key={i} className="border-2 bg-white p-6" style={{ borderColor: INK }}>
              <Stars rating={review.rating} />
              <p className="mt-3 text-lg leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
              <p style={mono} className="mt-4 text-sm font-semibold" >
                {review.name}
                {(review.job || review.location) && (
                  <span style={{ color: MUTED }}>
                    {" "}
                    &middot; {[review.job, review.location].filter(Boolean).join(", ")}
                  </span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
