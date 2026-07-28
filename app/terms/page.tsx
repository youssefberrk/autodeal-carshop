import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | AutoDeal",
  description: "AutoDeal terms of service — the conditions governing your use of our platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold font-['Playfair_Display'] mb-8">Terms of Service</h1>
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <p><strong className="text-white">Last updated:</strong> July 2026</p>
        <p>
          By accessing or using AutoDeal (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Use of the Platform</h2>
        <p>
          You agree to use the Platform only for lawful purposes and in a manner that does not infringe the rights of others. You must not attempt to gain unauthorized access to our systems.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Vehicle Listings</h2>
        <p>
          All vehicle listings are provided for informational purposes. While we strive for accuracy, we do not warrant that descriptions, images, or specifications are error-free. Vehicles are subject to prior sale.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Purchases & Transactions</h2>
        <p>
          Transactions are facilitated through our platform but are ultimately between buyer and seller. AutoDeal acts as a marketplace and is not a party to any sale unless explicitly stated.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Intellectual Property</h2>
        <p>
          All content on the Platform — including text, images, logos, and design — is the property of AutoDeal and may not be reproduced without written permission.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Limitation of Liability</h2>
        <p>
          AutoDeal shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
        <p>
          For questions about these terms, contact us at <Link href="/contact" className="text-[#00ff87] hover:underline">legal@autodeal.com</Link>.
        </p>
      </div>
    </main>
  );
}