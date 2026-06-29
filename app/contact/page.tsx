import React from "react";
import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact | AutoDeal - Concierge & Private Inquiries",
  description:
    "Reach the AutoDeal concierge team for vehicle acquisitions, bespoke configurations, financing, and private showroom appointments.",
  openGraph: {
    title: "Contact | AutoDeal",
    description:
      "Reach the AutoDeal concierge team for vehicle acquisitions, bespoke configurations, financing, and private showroom appointments.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <ContactClient />
    </main>
  );
}
