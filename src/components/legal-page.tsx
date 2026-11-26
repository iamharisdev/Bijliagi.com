import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <div className="wrap max-w-3xl pt-10 pb-24">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title, path }]} />
      <h1 className="mt-6 text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-steel">Last updated {updated}</p>
      <div className="mt-10 space-y-6 [&_h2]:mt-10 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_p]:text-steel">{children}</div>
    </div>
  );
}
