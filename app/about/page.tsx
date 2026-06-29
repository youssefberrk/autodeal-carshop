import React from "react";
import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Us | AutoDeal - Kinetic Automotive Curation",
  description: "Learn about AutoDeal's obsession with mechanical precision, engineering legacies, and our premium curated automotive acquisition experience.",
  openGraph: {
    title: "About Us | AutoDeal",
    description: "Learn about AutoDeal's obsession with mechanical precision, engineering legacies, and our premium curated automotive acquisition experience.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <AboutClient />
    </main>
  );
}
