function WheelMark({ size = 48 }: { size?: number }) {
	const fiveLugAngles = [0, 72, 144, 216, 288];
	const ventAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 100 100"
			fill="none"
			className="drop-shadow-[0_0_18px_color-mix(in_oklch,var(--brand)_32%,transparent)]"
			aria-hidden="true"
		>
			<defs>
				<radialGradient id="logoCarbonDisc" cx="50%" cy="50%" r="52%">
					<stop offset="0%" stopColor="#2a2b25" />
					<stop offset="42%" stopColor="#65675a" />
					<stop offset="73%" stopColor="#b5b29f" />
					<stop offset="100%" stopColor="#393a32" />
				</radialGradient>
				<linearGradient id="logoMachinedFace" x1="14%" y1="8%" x2="86%" y2="94%">
					<stop offset="0%" stopColor="#f4f7f4" />
					<stop offset="34%" stopColor="#a8b2ab" />
					<stop offset="64%" stopColor="#4a544d" />
					<stop offset="100%" stopColor="#171d18" />
				</linearGradient>
				<linearGradient id="logoSpokeShadow" x1="18%" y1="12%" x2="88%" y2="90%">
					<stop offset="0%" stopColor="#6d7970" />
					<stop offset="56%" stopColor="#242b25" />
					<stop offset="100%" stopColor="#090c0a" />
				</linearGradient>
				<radialGradient id="logoTireSheen" cx="35%" cy="22%" r="70%">
					<stop offset="0%" stopColor="#313a33" />
					<stop offset="54%" stopColor="#111512" />
					<stop offset="100%" stopColor="#050605" />
				</radialGradient>
				<linearGradient id="logoBrakeCaliper" x1="18%" y1="18%" x2="76%" y2="88%">
					<stop offset="0%" stopColor="#12814f" />
					<stop offset="48%" stopColor="#075f39" />
					<stop offset="100%" stopColor="#023923" />
				</linearGradient>
			</defs>

			<g
				className="transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[34deg]"
				style={{ transformBox: "view-box", transformOrigin: "50px 50px" }}
			>
				<circle cx="50" cy="50" r="49" fill="url(#logoTireSheen)" />
				<circle cx="50" cy="50" r="46" stroke="var(--brand)" strokeWidth="1" opacity="0.68" />
				<circle cx="50" cy="50" r="43" stroke="#060806" strokeWidth="1.8" />

				{ventAngles.map((deg) => (
					<g key={deg} transform={`rotate(${deg} 50 50)`}>
						<path d="M 47.6 5.5 L 50 2.7 L 52.4 5.5 L 51.2 14 L 48.8 14 Z" fill="#080a08" opacity="0.9" />
					</g>
				))}

				<circle cx="50" cy="50" r="37.8" fill="url(#logoCarbonDisc)" stroke="#191a15" strokeWidth="1.2" />
				<circle cx="50" cy="50" r="34.2" fill="none" stroke="rgba(231,225,199,0.34)" strokeWidth="1.2" />
				<circle cx="50" cy="50" r="29.6" fill="none" stroke="rgba(8,10,8,0.42)" strokeWidth="1" />
				{ventAngles.map((deg) => (
					<g key={deg} transform={`rotate(${deg} 50 50)`}>
						<circle cx="50" cy="18.8" r="1.45" fill="#070907" stroke="rgba(231,225,199,0.2)" strokeWidth="0.35" />
						<circle cx="53.5" cy="24" r="1.05" fill="#090b09" stroke="rgba(231,225,199,0.18)" strokeWidth="0.3" />
						<line x1="46.3" y1="21" x2="40.6" y2="31.8" stroke="#070907" strokeWidth="1.8" strokeLinecap="round" />
						<line x1="46.8" y1="20.4" x2="41.5" y2="30.2" stroke="rgba(231,225,199,0.34)" strokeWidth="0.45" strokeLinecap="round" />
					</g>
				))}

				<circle cx="50" cy="50" r="40.5" fill="none" stroke="#929d95" strokeWidth="1.7" opacity="0.72" />
				<circle cx="50" cy="50" r="38.4" fill="none" stroke="#202721" strokeWidth="2.2" />

				{fiveLugAngles.map((deg) => (
					<g key={deg} transform={`rotate(${deg} 50 50)`}>
						<path d="M 50 10 L 44.5 17 L 42.2 41 L 48.7 38 L 50 23 Z" fill="url(#logoMachinedFace)" />
						<path d="M 50 10 L 50 23 L 51.3 38 L 57.8 41 L 55.5 17 Z" fill="url(#logoSpokeShadow)" />
						<path d="M 43.4 41 L 35 61 L 43 58 L 49 39 Z" fill="#111611" opacity="0.88" />
						<path d="M 56.6 41 L 65 61 L 57 58 L 51 39 Z" fill="#29312b" opacity="0.9" />
						<path d="M 44.5 17 L 50 10 L 55.5 17 L 50 24 Z" fill="#111611" stroke="#566158" strokeWidth="0.45" />
					</g>
				))}

				<circle
					cx="50"
					cy="50"
					r="33"
					fill="none"
					stroke="rgba(231,225,199,0.42)"
					strokeWidth="0.9"
					strokeDasharray="2.4 4.6"
					opacity="0.72"
				/>
				{ventAngles.map((deg) => (
					<g key={`visible-disc-${deg}`} transform={`rotate(${deg} 50 50)`} opacity="0.78">
						<circle cx="50" cy="21.8" r="0.9" fill="#050705" />
						<line x1="47.8" y1="23.8" x2="44.3" y2="30.7" stroke="#060806" strokeWidth="1" strokeLinecap="round" />
					</g>
				))}

				<circle cx="50" cy="50" r="12" fill="#111711" stroke="#6d7870" strokeWidth="1.1" />
				<circle cx="50" cy="50" r="8.3" fill="url(#logoCarbonDisc)" stroke="#1a211b" strokeWidth="1" />
				<circle cx="50" cy="50" r="4.4" fill="#050e0a" stroke="var(--brand)" strokeWidth="1.2" />
				<circle cx="50" cy="50" r="1.9" fill="var(--brand)" />

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
			</g>

			<g filter="drop-shadow(0 0 4px rgba(0, 255, 135, 0.28))">
				<path
					d="M 14 35 C 18 22 31 12 48 10 L 57 18 L 52 29 C 40 29 29 37 24 49 L 16 47 C 14 43 13 39 14 35 Z"
					fill="url(#logoBrakeCaliper)"
				/>
				<path
					d="M 24 36 C 30 27 39 22 49 21 L 46 27 C 38 28 32 33 28 41 Z"
					fill="#050e0a"
					opacity="0.62"
				/>
				<path
					d="M 17 40 C 19 33 24 26 30 22"
					stroke="rgba(218,230,216,0.34)"
					strokeWidth="1.1"
					strokeLinecap="round"
					opacity="0.72"
				/>
				<rect x="20.5" y="36" width="15.5" height="5" rx="2.5" fill="#0b130d" opacity="0.4" />
				<circle cx="27" cy="31.5" r="1.65" fill="#132117" stroke="rgba(218,230,216,0.34)" strokeWidth="0.35" />
				<circle cx="45.5" cy="18.8" r="1.65" fill="#132117" stroke="rgba(218,230,216,0.34)" strokeWidth="0.35" />
			</g>

		</svg>
	);
}

export default function Logo() {
	return (
		<div
			className="group flex items-center gap-3.5"
			aria-label="AutoDeal Premium Automotive"
		>
			<div className="relative grid size-12 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(218,230,216,0.13),rgba(0,255,135,0.04)_42%,rgba(5,10,7,0.9)_74%)] ring-1 ring-[color-mix(in_oklch,var(--brand)_42%,transparent)] shadow-[inset_0_0_18px_rgba(218,230,216,0.06),0_0_26px_rgba(0,255,135,0.12)] transition-shadow duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[inset_0_0_18px_rgba(218,230,216,0.08),0_0_34px_rgba(0,255,135,0.2)]">
				<div className="will-change-transform transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
					<WheelMark size={42} />
				</div>
			</div>

			<div className="flex flex-col leading-none">
				<div
					className="text-[1.55rem] font-black leading-[0.95] tracking-[0.075em] sm:text-[1.75rem]"
					style={{ fontFamily: "'Orbitron', sans-serif" }}
				>
					<span className="text-foreground">Auto</span>
					<span className="text-primary">Deal</span>
				</div>

				<div className="mt-1 flex items-center gap-2">
					<div className="h-px w-10 bg-primary/80 shadow-[0_0_10px_rgba(0,255,135,0.45)] transition-all duration-300 group-hover:w-14" />
					<span
						className="text-[0.42rem] font-semibold tracking-[0.32em] text-primary/70 sm:text-[0.46rem]"
						style={{ fontFamily: "'Orbitron', sans-serif" }}
					>
						PREMIUM AUTOMOTIVE
					</span>
				</div>
			</div>
		</div>
	);
}
