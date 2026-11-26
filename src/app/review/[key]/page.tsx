import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { isValidKey } from "@/lib/review-keys";
import { ReviewForm } from "@/components/review-form";
import { ShieldIcon, StarIcon } from "@/components/icons";
import { HeroPower } from "@/components/hero-power";
import logoMark from "../../../../public/brand/logo-mark.png";

/** Private page: only reachable with the secret link, never indexed. */
export const metadata: Metadata = {
  title: "Share your review",
  robots: { index: false, follow: false, nocache: true },
};

export default function ReviewPage({ params }: PageProps<"/review/[key]">) {
  return (
    <section className="relative isolate min-h-[80vh] overflow-hidden bg-ink pt-14 pb-24 md:pt-20">
      <div className="circuit absolute inset-0 -z-10" />
      <HeroPower />
      <div className="absolute -top-40 -right-40 -z-10 size-[34rem] rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
      <div className="wrap max-w-2xl">
        <div className="text-center text-white">
          <Image src={logoMark} alt="" className="mx-auto h-16 w-auto" sizes="80px" priority />
          <div className="mt-5 flex justify-center gap-1 text-spark" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className="size-6" />
            ))}
          </div>
          <h1 className="mt-4 text-5xl text-white md:text-6xl">How did we do?</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
            Thank you for choosing {siteConfig.name}. Your honest review takes one minute and helps other families in{" "}
            {siteConfig.city} find a safe electrician.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-lift md:p-10">
          <Suspense fallback={<p className="py-16 text-center text-steel">Loading…</p>}>
            <ReviewGate params={params} />
          </Suspense>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
          <ShieldIcon className="size-4" />
          This page is private and only shared with our customers.
        </p>
      </div>
    </section>
  );
}

async function ReviewGate({ params }: { params: PageProps<"/review/[key]">["params"] }) {
  const { key } = await params;
  if (!isValidKey("REVIEW_FORM_KEY", key)) notFound();
  return <ReviewForm formKey={key} services={categories.map((c) => c.name)} areas={siteConfig.serviceAreas} />;
}
