import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="wrap py-28">
      <h1 className="text-5xl md:text-6xl">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-lg text-lg text-steel">
        The link may be old or mistyped. Our services and rates are one click away.
      </p>
      <div className="mt-8">
        <ButtonLink href="/services" arrow>See services &amp; rates</ButtonLink>
      </div>
    </div>
  );
}
