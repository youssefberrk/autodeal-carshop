import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Settings | AutoDeal",
  description: "Manage your cookie preferences for the AutoDeal website.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold font-['Playfair_Display'] mb-8">Cookie Settings</h1>
      <div className="space-y-6 text-gray-400 leading-relaxed">
        <p>
          AutoDeal uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and deliver personalized content.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device by your web browser. They help us remember your preferences and understand how you interact with our site.
        </p>
        <h2 className="text-white text-xl font-semibold mt-8">Types of Cookies We Use</h2>
        <div className="space-y-4">
          <div className="p-4 border border-green-900/40 rounded-lg">
            <h3 className="text-white font-semibold mb-1">Essential</h3>
            <p className="text-sm">Required for the website to function. Cannot be disabled.</p>
          </div>
          <div className="p-4 border border-green-900/40 rounded-lg">
            <h3 className="text-white font-semibold mb-1">Analytics</h3>
            <p className="text-sm">Help us understand how visitors use our site so we can improve performance.</p>
          </div>
          <div className="p-4 border border-green-900/40 rounded-lg">
            <h3 className="text-white font-semibold mb-1">Marketing</h3>
            <p className="text-sm">Used to deliver relevant advertisements and measure campaign effectiveness.</p>
          </div>
        </div>
        <h2 className="text-white text-xl font-semibold mt-8">Managing Cookies</h2>
        <p>
          You can control cookies through your browser settings. Disabling certain cookies may affect site functionality. Most browsers allow you to block or delete cookies via their preferences menu.
        </p>
        <p className="text-sm text-gray-500 mt-8">
          For more information, review our <a href="/privacy" className="text-[#00ff87] hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}