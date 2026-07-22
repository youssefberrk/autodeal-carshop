import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | AutoDeal Showroom",
  description: "Search for premium luxury cars, electric vehicles, SUVs, and showrooms in our global inventory.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#050e0a] text-slate-400 font-manrope">Loading showroom results...</div>}>
      <SearchClient initialQuery={q} />
    </Suspense>
  );
}
