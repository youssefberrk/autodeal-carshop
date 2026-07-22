interface CarWheelLoaderProps {
	size?: number;
	className?: string;
	color?: string;
	fullPage?: boolean;
	text?: string;
}

const fiveLugAngles = [0, 72, 144, 216, 288];
const ventAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export default function CarWheelLoader({
	size = 64,
	className = "",
	color = "#00ff87",
	fullPage = false,
	text,
}: CarWheelLoaderProps) {
	const content = (
		<div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
			<div className="relative" style={{ width: size, height: size }}>
				<svg
					width={size}
					height={size}
					viewBox="0 0 100 100"
					fill="none"
					className="absolute inset-0 pointer-events-none z-10"
				>
					<path
						d="M 17 34 C 22 21 34 13 49 11 L 55 18 L 50 28 C 39 29 30 35 25 45 Z"
						fill={color}
						opacity="0.97"
						style={{ filter: `drop-shadow(0 0 6px ${color})` }}
					/>
					<path
						d="M 24 34 C 30 25 39 21 49 20 L 46 25 C 38 26 32 31 28 38 Z"
						fill="#050e0a"
						opacity="0.38"
					/>
					<rect x="22" y="34" width="13" height="4.2" rx="2.1" fill="#0b130d" opacity="0.34" />
					<circle cx="27.5" cy="31" r="1.35" fill="#132117" opacity="0.86" />
					<circle cx="45.5" cy="18.5" r="1.35" fill="#132117" opacity="0.86" />
				</svg>

				<svg
					width={size}
					height={size}
					viewBox="0 0 100 100"
					fill="none"
					className="absolute inset-0 animate-spin"
					style={{ animationDuration: "0.72s", animationTimingFunction: "linear" }}
				>
					<defs>
						<radialGradient id="loaderCarbonDisc" cx="50%" cy="50%" r="52%">
							<stop offset="0%" stopColor="#1f241f" />
							<stop offset="48%" stopColor="#3d433e" />
							<stop offset="77%" stopColor="#747d75" />
							<stop offset="100%" stopColor="#232923" />
						</radialGradient>
						<linearGradient id="loaderMachinedFace" x1="14%" y1="8%" x2="86%" y2="94%">
							<stop offset="0%" stopColor="#f4f7f4" />
							<stop offset="34%" stopColor="#a9b3ac" />
							<stop offset="62%" stopColor="#4b554e" />
							<stop offset="100%" stopColor="#171d18" />
						</linearGradient>
						<linearGradient id="loaderSpokeShadow" x1="18%" y1="12%" x2="88%" y2="90%">
							<stop offset="0%" stopColor="#6d7970" />
							<stop offset="56%" stopColor="#242b25" />
							<stop offset="100%" stopColor="#090c0a" />
						</linearGradient>
						<radialGradient id="loaderTireSheen" cx="35%" cy="22%" r="70%">
							<stop offset="0%" stopColor="#303832" />
							<stop offset="54%" stopColor="#111512" />
							<stop offset="100%" stopColor="#050605" />
						</radialGradient>
					</defs>

					<circle cx="50" cy="50" r="49" fill="url(#loaderTireSheen)" />
					<circle cx="50" cy="50" r="45.5" stroke="#242b25" strokeWidth="2.1" />
					<circle cx="50" cy="50" r="42.4" stroke="#050605" strokeWidth="1.6" />

					{ventAngles.map((deg) => (
						<g key={deg} transform={`rotate(${deg} 50 50)`}>
							<path d="M 47.6 5.5 L 50 2.7 L 52.4 5.5 L 51.2 14 L 48.8 14 Z" fill="#080a08" opacity="0.9" />
						</g>
					))}

					<circle cx="50" cy="50" r="37.5" fill="url(#loaderCarbonDisc)" stroke="#111511" strokeWidth="1.2" />
					<circle cx="50" cy="50" r="31" fill="none" stroke="rgba(218,230,216,0.18)" strokeWidth="1" />

					{ventAngles.map((deg) => (
						<g key={deg} transform={`rotate(${deg} 50 50)`}>
							<circle cx="50" cy="18.8" r="1.05" fill="#070907" />
							<circle cx="53.2" cy="23.7" r="0.82" fill="#0b0e0b" />
							<line x1="46.8" y1="21" x2="41.7" y2="31" stroke="#121612" strokeWidth="1.2" strokeLinecap="round" />
						</g>
					))}

					<circle cx="50" cy="50" r="40.5" fill="none" stroke="#929d95" strokeWidth="1.7" opacity="0.72" />
					<circle cx="50" cy="50" r="38.4" fill="none" stroke="#202721" strokeWidth="2.2" />

					{fiveLugAngles.map((deg) => (
						<g key={deg} transform={`rotate(${deg} 50 50)`}>
							<path d="M 50 10 L 44.5 17 L 42.2 41 L 48.7 38 L 50 23 Z" fill="url(#loaderMachinedFace)" />
							<path d="M 50 10 L 50 23 L 51.3 38 L 57.8 41 L 55.5 17 Z" fill="url(#loaderSpokeShadow)" />
							<path d="M 43.4 41 L 35 61 L 43 58 L 49 39 Z" fill="#111611" opacity="0.88" />
							<path d="M 56.6 41 L 65 61 L 57 58 L 51 39 Z" fill="#29312b" opacity="0.9" />
							<path d="M 44.5 17 L 50 10 L 55.5 17 L 50 24 Z" fill="#111611" stroke="#566158" strokeWidth="0.45" />
						</g>
					))}

					<circle cx="50" cy="50" r="12" fill="#111711" stroke="#6d7870" strokeWidth="1.1" />
					<circle cx="50" cy="50" r="8.3" fill="url(#loaderCarbonDisc)" stroke="#1a211b" strokeWidth="1" />
					<circle cx="50" cy="50" r="4.4" fill="#050e0a" stroke={color} strokeWidth="1.2" />
					<circle cx="50" cy="50" r="1.9" fill={color} />

					{fiveLugAngles.map((deg) => (
						<circle
							key={deg}
							cx={50 + 6.2 * Math.sin((deg * Math.PI) / 180)}
							cy={50 - 6.2 * Math.cos((deg * Math.PI) / 180)}
							r="1.15"
							fill="#060806"
							stroke="#b6c0b9"
							strokeWidth="0.45"
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
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050e0a]/92 backdrop-blur-md animate-in fade-in duration-300">
				{content}
			</div>
		);
	}

	return content;
}
