import localFont from "next/font/google"; // or use @next/font

export default function Logo() {
	return (
		<div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
			{/* Badge Icon */}
			<div className="relative">
				<svg width="44" height="44" viewBox="-22 -22 44 44" fill="none">
					{/* Hexagon border */}
					<polygon
						points="0,-20 17.3,-10 17.3,10 0,20 -17.3,10 -17.3,-10"
						fill="none"
						stroke="#22c55e"
						strokeWidth="1.5"
						opacity="0.6"
					/>
					{/* Car silhouette */}
					<path
						d="M-10,3 L-13,3 L-13,8 L13,8 L13,3 L10,3 L7,-2 L0,-6 L-7,-2 Z"
						fill="#22c55e"
					/>
					<circle
						cx="-8"
						cy="9"
						r="2.5"
						fill="#152331"
						stroke="#22c55e"
						strokeWidth="1"
					/>
					<circle
						cx="8"
						cy="9"
						r="2.5"
						fill="#152331"
						stroke="#22c55e"
						strokeWidth="1"
					/>
				</svg>
			</div>

			{/* Text */}
			<div className="flex flex-col leading-none">
				<h1
					className="text-[1.75rem] font-black tracking-[0.1em] leading-tight"
					style={{ fontFamily: "'Orbitron', sans-serif" }}>
					<span className="text-white">AUTO</span>
					<span className="text-green-400">DEAL</span>
				</h1>

				{/* Accent line + tagline */}
				<div className="flex items-center gap-2 mt-0.5">
					<div className="h-[1.5px] w-full bg-gradient-to-r from-green-400 to-transparent" />
				</div>
				<span
					className="text-green-400 text-[0.42rem] tracking-[0.35em] mt-0.5 opacity-70"
					style={{ fontFamily: "'Orbitron', sans-serif" }}>
					PREMIUM AUTOMOTIVE
				</span>
			</div>
		</div>
	);
}
