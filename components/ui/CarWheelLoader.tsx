import React from "react";

interface CarWheelLoaderProps {
	size?: number;
	className?: string;
	color?: string; // Brake caliper color
	fullPage?: boolean;
	text?: string;
}

export default function CarWheelLoader({
	size = 64,
	className = "",
	color = "#00ff87", // Brand accent color
	fullPage = false,
	text,
}: CarWheelLoaderProps) {
	const content = (
		<div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
			<div className="relative" style={{ width: size, height: size }}>
				{/* Outer/Backing element: fixed brake caliper (stationary) */}
				<svg
					width={size}
					height={size}
					viewBox="0 0 100 100"
					fill="none"
					className="absolute inset-0 pointer-events-none z-10"
				>
					{/* Brake Caliper (stationary, rendered in front of disc but behind spokes) */}
					{/* Sits at roughly 10 o'clock to 12 o'clock */}
					<path
						d="M 22 36 A 35 35 0 0 1 52 15 L 48 24 A 26 26 0 0 0 26 40 Z"
						fill={color}
						opacity="0.95"
						style={{ filter: `drop-shadow(0px 0px 4px ${color})` }}
					/>
					{/* Caliper hardware details (bolts/pins) */}
					<circle cx="28" cy="32" r="1.2" fill="#1c2d21" opacity="0.8" />
					<circle cx="46" cy="19" r="1.2" fill="#1c2d21" opacity="0.8" />
				</svg>

				{/* Spinning element: Brake Disc + Alloy spokes + Tire */}
				<svg
					width={size}
					height={size}
					viewBox="0 0 100 100"
					fill="none"
					className="absolute inset-0 animate-spin"
					style={{ animationDuration: "0.8s", animationTimingFunction: "linear" }}
				>
					<defs>
						{/* Metallic Radial Gradient for Brake Disc */}
						<radialGradient id="discGrad" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#2a2e2b" />
							<stop offset="70%" stopColor="#4c534e" />
							<stop offset="90%" stopColor="#7a857d" />
							<stop offset="95%" stopColor="#5b635e" />
							<stop offset="100%" stopColor="#3d423f" />
						</radialGradient>

						{/* Metallic Linear Gradient for Spoke Facing (Light highlight) */}
						<linearGradient id="spokeLight" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#9ca3af" />
							<stop offset="50%" stopColor="#f3f4f6" />
							<stop offset="100%" stopColor="#d1d5db" />
						</linearGradient>

						{/* Metallic Linear Gradient for Spoke Shading (Darker side) */}
						<linearGradient id="spokeDark" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#374151" />
							<stop offset="50%" stopColor="#4b5563" />
							<stop offset="100%" stopColor="#1f2937" />
						</linearGradient>
					</defs>

					{/* 1. ROTATING BRAKE DISC (Behind Wheel Spokes) */}
					<circle cx="50" cy="50" r="35" fill="url(#discGrad)" stroke="#1a1c1a" strokeWidth="1" />
					
					{/* Slotted Holes & Slots on Brake Disc (Ventilation Holes) */}
					<g stroke="#1a1c1a" strokeWidth="0.8" opacity="0.6">
						{[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
							<g key={deg} transform={`rotate(${deg} 50 50)`}>
								<circle cx="50" cy="22" r="0.8" fill="#111" />
								<circle cx="50" cy="27" r="0.8" fill="#111" />
								<circle cx="53" cy="24.5" r="0.8" fill="#111" />
								<line x1="48" y1="20" x2="43" y2="30" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
							</g>
						))}
					</g>

					{/* 2. ROTATING TIRE & RIM */}
					{/* Outer rubber tire */}
					<circle cx="50" cy="50" r="48" stroke="#161816" strokeWidth="4" />
					<circle cx="50" cy="50" r="45" stroke="#262826" strokeWidth="2" />
					<circle cx="50" cy="50" r="43" stroke="#000000" strokeWidth="1" />

					{/* Outer Rim Lip */}
					<circle cx="50" cy="50" r="41.5" stroke="#6b7280" strokeWidth="1.5" opacity="0.8" />
					
					{/* 3. ROTATING SPOKES (V-spoke high performance design) */}
					{[0, 72, 144, 216, 288].map((deg) => (
						<g key={deg} transform={`rotate(${deg} 50 50)`}>
							{/* Spoke Left Prong (Light metallic highlight) */}
							<path
								d="M 50 15 L 47 18 L 44 41 L 49 40 L 50 22 Z"
								fill="url(#spokeLight)"
							/>
							{/* Spoke Right Prong (Darker metallic shading) */}
							<path
								d="M 50 15 L 50 22 L 51 40 L 56 41 L 53 18 Z"
								fill="url(#spokeDark)"
							/>
							{/* Connecting Web between V prongs */}
							<path
								d="M 47 18 L 50 15 L 53 18 L 50 23 Z"
								fill="#1e201f"
								stroke="#374151"
								strokeWidth="0.5"
							/>
						</g>
					))}

					{/* Center Hub cap */}
					<circle cx="50" cy="50" r="9" fill="#1c201d" stroke="#4b5563" strokeWidth="1" />
					<circle cx="50" cy="50" r="7.5" fill="url(#discGrad)" />
					
					{/* Center brand logo accent (Glowing Center Cap) */}
					<circle cx="50" cy="50" r="3.5" fill="#0c160e" stroke={color} strokeWidth="1" />
					<circle cx="50" cy="50" r="1.5" fill={color} />

					{/* Wheel Lug Nuts (5 small circles in a pentagon) */}
					{[0, 72, 144, 216, 288].map((deg) => (
						<circle
							key={deg}
							cx={50 + 5.5 * Math.sin((deg * Math.PI) / 180)}
							cy={50 - 5.5 * Math.cos((deg * Math.PI) / 180)}
							r="1"
							fill="#111"
							stroke="#9ca3af"
							strokeWidth="0.4"
						/>
					))}
				</svg>
			</div>

			{text && (
				<p className="text-xs uppercase tracking-[0.25em] text-[#dae6d8]/60 font-medium font-['Manrope'] animate-pulse mt-2 text-center max-w-xs">
					{text}
				</p>
			)}
		</div>
	);

	if (fullPage) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c160e]/92 backdrop-blur-md animate-in fade-in duration-300">
				{content}
			</div>
		);
	}

	return content;
}
