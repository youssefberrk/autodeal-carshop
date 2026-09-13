import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: {
    default: "AutoDeal | Luxury Cars",
    template: "%s | AutoDeal",
  },
  description:
    "Explore and shop premium vehicles with AutoDeal. Browse luxury cars, compare specifications, manage your wishlist, and experience a modern online car shopping platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <NavBar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
