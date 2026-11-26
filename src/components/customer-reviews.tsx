import { testimonials } from "@/content/general";
import { getPublishedReviews } from "@/lib/reviews";
import { ReviewsGrid, type ReviewCardData } from "@/components/reviews-grid";
import { Eyebrow, JsonLd } from "@/components/ui";
import { StarIcon } from "@/components/icons";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/content/site";

/**
 * Reviews section: reviews customers submitted through the private link,
 * plus any reviews typed into `testimonials` in src/content/general.ts.
 * Hidden completely until there is at least one real review.
 */
export async function CustomerReviews() {
  const submitted = await getPublishedReviews();
  const manual = testimonials.filter((t) => !t.sample || process.env.NODE_ENV !== "production");

  const items: ReviewCardData[] = [
    ...submitted.map((r) => ({
      id: r.id,
      name: r.name,
      area: r.area,
      service: r.service,
      rating: r.rating,
      text: r.text,
      date: new Date(r.createdAt).toLocaleDateString("en-PK", { month: "short", year: "numeric", timeZone: "Asia/Karachi" }),
    })),
    ...manual.map((t, i) => ({ id: `manual-${i}`, name: t.name, area: t.area, service: t.service, rating: 5, text: t.quote, sample: t.sample })),
  ];
  if (items.length === 0) return null;

  const rated = items.filter((i) => !i.sample);
  const average = rated.length ? rated.reduce((s, i) => s + i.rating, 0) / rated.length : 5;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="border-t border-line bg-white py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8" data-reveal>
          <div className="max-w-2xl">
            <Eyebrow>Reviews</Eyebrow>
            <h2 id="reviews-title" className="mt-3 text-4xl md:text-[3.25rem]">
              What our customers say
            </h2>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper px-5 py-4">
            <span className="condensed text-5xl font-extrabold text-brand-deep">{average.toFixed(1)}</span>
            <span>
              <span className="flex gap-0.5 text-spark" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className={i < Math.round(average) ? "size-5" : "size-5 text-line"} />
                ))}
              </span>
              <span className="mt-1 block text-sm text-steel">
                Based on {items.length} {items.length === 1 ? "review" : "reviews"}
              </span>
            </span>
          </div>
        </div>
        <ReviewsGrid items={items} />
      </div>

      {rated.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Electrician",
            "@id": absoluteUrl("/#business"),
            name: siteConfig.name,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: average.toFixed(1),
              reviewCount: rated.length,
              bestRating: 5,
              worstRating: 1,
            },
          }}
        />
      )}
    </section>
  );
}
