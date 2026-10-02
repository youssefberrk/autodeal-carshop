import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		qualities: [75, 100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "cdn.worldvectorlogo.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "cdn.brandfetch.io",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "worldvectorlogo.com",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
