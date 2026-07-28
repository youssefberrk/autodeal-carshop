import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AutoDeal",
  description: "AutoDeal privacy policy — how we collect, use, and safeguard your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold font-['Playfair_Display'] mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <p><strong className="text-white">Last updated:</strong> July 2026</p>
        <p>
          AutoDeal (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) respects your privacy. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Information We Collect</h2>
        <p>
          We collect personal data you provide — name, email, phone number — when you submit enquiries, subscribe to our newsletter, or request vehicle information. We also collect browsing data such as IP address, browser type, and pages visited.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To respond to your enquiries and provide vehicle information</li>
          <li>To send marketing communications (with your consent)</li>
          <li>To improve our website and user experience</li>
          <li>To comply with legal obligations</li>
        </ul>
        <h2 className="text-white text-xl font-semibold mt-8">Data Sharing</h2>
        <p>
          We do not sell your personal data. We may share information with trusted service providers who assist in operating our website and business, subject to confidentiality agreements.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time by contacting us.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
        <p>
          For privacy-related enquiries, please reach out to our data protection team at privacy@autodeal.com.
        </p>
      </div>
    </main>
  );
}