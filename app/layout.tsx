import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ClientSessionProvider } from "@/components/ClientSessionProvider";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ConciergeProvider } from "@/components/ConciergeProvider";

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
					<ConciergeProvider>
						<NavBar />
						<main id="main-content" className="flex-1">
							{children}
						</main>
						<Footer />
						<ToastContainer />
					</ConciergeProvider>
				</ClientSessionProvider>
			</body>
		</html>
	);
}
