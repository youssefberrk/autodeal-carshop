"use client";

import Image, { type StaticImageData } from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Globe2, ShieldCheck } from "lucide-react";
import ferari from "@/public/ferari.jpg";
import porscheEngine from "@/public/porsche-w-engine-ai.jpg";
import showroom from "@/public/showroom.png";

const principles = [
	{
		index: "01",
		label: "Mission",
		title: "Bespoke acquisition",
		copy: "Provide a focused acquisition experience that honors the engineering mastery of the world's most prestigious automotive brands.",
		metric: "24/7",
		metricLabel: "concierge desk",
		phase: "Intake",
	},
	{
		index: "02",
		label: "Vision",
		title: "Global showroom standard",
		copy: "Set the benchmark for luxury automotive retail through digital precision and concierge-level physical service.",
		metric: "1:1",
		metricLabel: "curator matching",
		phase: "Curation",
	},
	{
		index: "03",
		label: "Values",
		title: "Enduring craftsmanship",
		copy: "Champion timeless engineering, curated provenance, and concierge care across every stage of ownership.",
		metric: "100%",
		metricLabel: "quality assurance",
		phase: "Handover",
	},
];

const principleIcons = [Compass, Globe2, ShieldCheck];

const images: Array<{
	src: StaticImageData;
	alt: string;
	label: string;
	className: string;
}> = [
	{
		src: showroom,
		alt: "AutoDeal showroom with performance vehicles on display",
		label: "Berlin showroom HQ",
		className: "md:translate-y-10",
	},
	{
		src: ferari,
		alt: "Curated Ferrari performance vehicle",
		label: "Curated V8 performance",
		className: "md:-translate-y-4",
	},
];

const stats = [
	{ target: 2024, label: "founded", suffix: "" },
	{ target: 3, label: "curator teams", suffix: "" },
	{ target: 48, label: "source review", suffix: "h" },
];

const StoryImage = ({
	src,
	alt,
	label,
	className,
}: {
	src: StaticImageData;
	alt: string;
	label: string;
	className: string;
}) => (
	<figure
		className={`group relative min-h-[320px] overflow-hidden rounded-lg border border-[#00ff87]/10 bg-[#08110c] shadow-[0_28px_80px_rgba(0,0,0,0.42)] ${className}`}>
		<Image
			src={src}
			alt={alt}
			fill
			sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 100vw"
			className="object-cover opacity-80 transition duration-500 ease-out group-hover:scale-[1.035] group-hover:opacity-95"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-[#050806]/90 via-[#050806]/10 to-transparent" />
		<figcaption className="absolute bottom-4 left-4 right-4 inline-flex max-w-max items-center border border-[#00ff87]/20 bg-[#020503]/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00ff87]/85 backdrop-blur-sm">
			{label}
		</figcaption>
	</figure>
);

const PrincipleCard = ({
	index,
	label,
	title,
	copy,
	metric,
	metricLabel,
	phase,
	isActive,
	onActivate,
}: (typeof principles)[number] & {
	isActive: boolean;
	onActivate: () => void;
}) => {
	const Icon = principleIcons[Number(index) - 1];

	return (
		<article
			className={`group relative overflow-hidden rounded-lg border bg-[linear-gradient(140deg,rgba(218,230,216,0.1),rgba(8,16,12,0.78)_34%,rgba(3,7,5,0.92))] p-6 outline outline-1 transition duration-700 ease-out focus-visible:ring-2 focus-visible:ring-[#00ff87]/55 sm:p-7 ${
				isActive
					? "translate-y-0 border-[#00ff87]/35 opacity-100 shadow-[0_32px_120px_rgba(0,255,135,0.16)] outline-[#00ff87]/10"
					: "translate-y-3 border-white/5 opacity-42 shadow-[0_18px_60px_rgba(0,0,0,0.22)] outline-white/[0.02] grayscale-[0.2] hover:translate-y-0 hover:border-[#00ff87]/20 hover:opacity-78 hover:grayscale-0 lg:scale-[0.94] lg:hover:scale-[0.98]"
			}`}
			onClick={onActivate}
			onFocus={onActivate}
			onPointerEnter={onActivate}
			role="button"
			tabIndex={0}>
			<div
				className={`pointer-events-none absolute inset-0 rounded-lg ring-1 transition duration-700 ${
					isActive
						? "ring-[#00ff87]/30"
						: "ring-transparent group-hover:ring-[#00ff87]/15"
				}`}
			/>
			<div
				className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/60 to-transparent transition-opacity duration-700 ${
					isActive ? "opacity-90" : "opacity-20"
				}`}
			/>
			<div
				className={`absolute -right-20 -top-24 h-52 w-52 rounded-full blur-3xl transition duration-700 ${
					isActive ? "bg-[#00ff87]/[0.11]" : "bg-[#00ff87]/[0.025]"
				}`}
			/>
			<div
				className={`absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.08)_42%,transparent_48%)] transition duration-700 ${
					isActive ? "translate-x-16 opacity-45" : "opacity-0"
				}`}
			/>
			<div className="relative flex flex-col gap-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<span
						className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] shadow-[0_0_18px_rgba(0,255,135,0.12)] transition duration-700 ${
							isActive
								? "border-[#00ff87]/30 bg-[#00ff87]/10 text-[#00ff87]"
								: "border-white/10 bg-white/[0.03] text-[#dae6d8]/45"
						}`}>
						<Icon className="h-3.5 w-3.5" aria-hidden="true" />
						{label}
					</span>
					<span className="text-xs uppercase tracking-[0.28em] text-[#dae6d8]/45">
						{phase}
					</span>
				</div>

			<h3 className="max-w-[13rem] [font-family:Orbitron,sans-serif] text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
				{title}
			</h3>

			<p className="max-w-xl text-base leading-7 text-[#dae6d8]/72">{copy}</p>

			<div
				className={`flex items-end justify-between border-t pt-5 transition-colors duration-700 ${
					isActive ? "border-[#00ff87]/18" : "border-white/10"
				}`}>
				<div>
					<p
						className={`[font-family:Orbitron,sans-serif] text-3xl font-semibold transition-colors duration-700 ${
							isActive ? "text-[#00ff87]" : "text-[#dae6d8]/45"
						}`}>
						{metric}
					</p>
					<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#dae6d8]/45">
						{metricLabel}
					</p>
				</div>
				<div className="flex items-center gap-2 text-[#dae6d8]/35">
					<span className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ff87]/55" />
					<span className="font-mono text-[10px] tracking-[0.24em]">{index}</span>
				</div>
			</div>
		</div>
		</article>
	);
};

const HudTimeline = ({
	isVisible,
	activeIndex,
}: {
	isVisible: boolean;
	activeIndex: number;
}) => {
	const activePrinciple = principles[activeIndex];
	const ActiveIcon = principleIcons[activeIndex];

	return (
	<div className="relative mx-auto flex min-h-[34rem] w-full max-w-[18rem] flex-col items-center justify-center py-4 text-center lg:min-h-[42rem]">
		<div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00ff87]/20 to-transparent" />
		<div className="absolute inset-y-10 left-1/2 w-[72px] -translate-x-1/2 rounded-full border-x border-[#00ff87]/10 bg-[linear-gradient(90deg,transparent,rgba(0,255,135,0.035),transparent)]" />
		<div
			className={`absolute left-1/2 top-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#00ff87] via-[#00ff87]/55 to-transparent shadow-[0_0_30px_rgba(0,255,135,0.55)] transition-all duration-1000 ease-out ${
				isVisible ? "opacity-100" : "h-0 opacity-0"
			}`}
			style={{
				height: isVisible ? `${30 + activeIndex * 24}%` : "0%",
			}}
		/>

		<div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-full border border-[#00ff87]/25 bg-[#030705]/85 shadow-[inset_0_0_52px_rgba(0,255,135,0.1),0_24px_90px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-700 hover:border-[#00ff87]/45">
			<div
				className="absolute inset-3 rounded-full border border-dashed border-[#00ff87]/25 transition-transform duration-700"
				style={{ transform: `rotate(${activeIndex * 38}deg)` }}
			/>
			<div className="absolute inset-7 rounded-full border border-white/10 bg-[#08100c]/75" />
			<div className="absolute inset-[18px] rounded-full bg-[conic-gradient(from_160deg,rgba(0,255,135,0.08),transparent_24%,rgba(0,255,135,0.2)_42%,transparent_54%,rgba(218,230,216,0.08)_72%,transparent)] opacity-80" />
			<div className="relative flex flex-col items-center">
				<ActiveIcon className="mb-3 h-7 w-7 text-[#00ff87]" aria-hidden="true" />
				<p className="font-mono text-[10px] uppercase tracking-[0.38em] text-[#00ff87]/65">
					{activePrinciple.phase}
				</p>
				<p className="mt-2 [font-family:Orbitron,sans-serif] text-lg font-semibold uppercase tracking-[0.2em] text-white">
					{activePrinciple.label}
				</p>
				<p className="mt-2 font-mono text-[10px] tracking-[0.24em] text-[#dae6d8]/40">
					{activePrinciple.index} / 03
				</p>
			</div>
		</div>

		<div className="relative z-10 mt-10 flex w-full flex-col gap-8">
			{principles.map(({ index, phase }, itemIndex) => (
				<div
					key={index}
					style={{ transitionDelay: `${itemIndex * 150}ms` }}
					className={`relative flex items-center justify-center transition duration-700 ease-out ${
						isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}>
					<div
						className={`absolute left-1/2 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition duration-700 ${
							itemIndex === activeIndex ? "via-[#00ff87]/70" : "via-[#00ff87]/18"
						}`}
					/>
					<div
						className={`relative flex h-14 w-14 items-center justify-center rounded-full border bg-[#050806] transition duration-700 ${
							itemIndex === activeIndex
								? "scale-110 border-[#00ff87]/70 shadow-[0_0_42px_rgba(0,255,135,0.32)]"
								: "border-[#00ff87]/18 shadow-[0_0_22px_rgba(0,255,135,0.08)]"
						}`}>
						<span
							className={`absolute rounded-full bg-[#00ff87] shadow-[0_0_18px_rgba(0,255,135,0.85)] transition-all duration-700 ${
								itemIndex === activeIndex ? "h-4 w-4" : "h-2.5 w-2.5 opacity-55"
							}`}
						/>
						<span
							className={`absolute -right-24 hidden font-mono text-[10px] uppercase tracking-[0.28em] transition duration-700 lg:block ${
								itemIndex === activeIndex
									? "text-[#00ff87]/80"
									: "text-[#dae6d8]/32"
							}`}>
							{phase}
						</span>
					</div>
				</div>
			))}
		</div>
	</div>
	);
};

const Story = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
	const sectionRef = useRef<HTMLElement>(null);
	const wheelLockRef = useRef(false);
	const wheelReleaseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const currentSection = sectionRef.current;
		if (!currentSection) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				threshold: 0.18,
				rootMargin: "0px 0px -80px 0px",
			},
		);

		observer.observe(currentSection);

		return () => observer.disconnect();
	}, []);

	const [displayStats, setDisplayStats] = useState<number[]>(() =>
		stats.map(() => 0),
	);

	useEffect(() => {
		if (!isVisible) return;

		let animationFrameId = 0;
		const startTime = performance.now();
		const duration = 1200;

		const animate = (time: number) => {
			const progress = Math.min((time - startTime) / duration, 1);

			setDisplayStats(stats.map(({ target }) => Math.round(target * progress)));

			if (progress < 1) {
				animationFrameId = requestAnimationFrame(animate);
			}
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrameId);
	}, [isVisible]);

	useEffect(() => {
		return () => {
			if (wheelReleaseRef.current) {
				clearTimeout(wheelReleaseRef.current);
			}
		};
	}, []);

	const moveActivePrinciple = useCallback((direction: 1 | -1) => {
		setActivePrincipleIndex((current) => {
			const next = current + direction;

			if (next < 0) return principles.length - 1;
			if (next >= principles.length) return 0;

			return next;
		});
	}, []);

	const handleHudWheel = useCallback(
		(event: React.WheelEvent<HTMLDivElement>) => {
			if (Math.abs(event.deltaY) < 18) return;

			event.preventDefault();
			if (wheelLockRef.current) return;

			wheelLockRef.current = true;
			moveActivePrinciple(event.deltaY > 0 ? 1 : -1);

			if (wheelReleaseRef.current) {
				clearTimeout(wheelReleaseRef.current);
			}

			wheelReleaseRef.current = setTimeout(() => {
				wheelLockRef.current = false;
			}, 620);
		},
		[moveActivePrinciple],
	);

	const handleHudKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				moveActivePrinciple(1);
			}

			if (event.key === "ArrowUp") {
				event.preventDefault();
				moveActivePrinciple(-1);
			}
		},
		[moveActivePrinciple],
	);

	return (
		<section
			ref={sectionRef}
			className="relative isolate overflow-hidden border-y border-[#00ff87]/10 bg-[#050806] px-4 py-20 text-white sm:px-6 lg:py-28">
			<Image
				src={porscheEngine}
				alt=""
				fill
				sizes="100vw"
				aria-hidden="true"
				className="absolute inset-0 -z-20 object-cover opacity-[0.14] saturate-75"
			/>
			<div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#050806_0%,rgba(5,8,6,0.84)_34%,#050806_100%)]" />
			<div className="absolute left-1/2 top-24 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#00ff87]/5 blur-[120px]" />

			<div
				className={`mx-auto grid max-w-7xl gap-12 transition duration-700 ease-out lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:gap-16 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
				}`}>
				<div className="flex flex-col justify-between gap-10">
					<div>
						<span className="inline-flex max-w-full border border-[#00ff87]/20 bg-[#00ff87]/5 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#00ff87] backdrop-blur-sm sm:tracking-[0.42em]">
							Origin & heritage
						</span>
						<h2 className="mt-6 max-w-3xl [font-family:Orbitron,sans-serif] text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
							The Auto<span className="text-[#00ff87]">Deal</span> Story
						</h2>
					</div>

					<div className="space-y-6 border-l border-[#00ff87]/30 pl-5 sm:pl-7">
						<p className="max-w-2xl text-2xl font-semibold uppercase leading-tight tracking-wide text-white sm:text-3xl">
							Founded in 2024, AutoDeal was born from a singular obsession: the
							intersection of kinetic energy and mechanical art.
						</p>
						<p className="max-w-xl text-base leading-8 text-[#dae6d8]/68 sm:text-lg">
							We do not just sell vehicles. We curate high-performance legacies
							for discerning drivers through provenance research, mechanical
							expertise, and a showroom standard built around trust.
						</p>
					</div>

					<div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
						{stats.map(({ label, suffix }, index) => (
							<div
								key={label}
								style={{ transitionDelay: `${index * 120}ms` }}
								className={`rounded-3xl border border-[#00ff87]/10 bg-[#08100c]/70 p-4 shadow-[0_24px_80px_rgba(0,255,135,0.06)] transition duration-700 ease-out hover:border-[#00ff87]/30 sm:p-5 ${
									isVisible
										? "translate-y-0 opacity-100"
										: "translate-y-4 opacity-0"
								}`}>
								<p className="[font-family:Orbitron,sans-serif] text-xl font-semibold text-[#00ff87] sm:text-2xl">
									{displayStats[index]}
									<span className="ml-1 text-sm font-medium text-[#dae6d8]/85">
										{suffix}
									</span>
								</p>
								<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#dae6d8]/45">
									{label}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
					{images.map((image) => (
						<StoryImage key={image.label} {...image} />
					))}
				</div>
			</div>

			<div
				className={`mx-auto mt-14 max-w-7xl transition duration-700 ease-out lg:mt-24 ${
					isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
				}`}>
				<div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
					<div>
						<p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#00ff87]/70">
							Operational doctrine
						</p>
						<h3 className="mt-3 max-w-2xl [font-family:Playfair_Display,serif] text-3xl font-semibold italic leading-tight text-white sm:text-4xl">
							A live cockpit for provenance, curation, and ownership.
						</h3>
					</div>
					<div className="hidden h-px flex-1 bg-gradient-to-r from-[#00ff87]/35 to-transparent lg:block" />
				</div>

				<div
					className="group/hud relative rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87]/55"
					onWheel={handleHudWheel}
					onKeyDown={handleHudKeyDown}
					tabIndex={0}
					aria-label="AutoDeal operating principles timeline">
					<div className="absolute inset-0 -z-10 rounded-lg bg-[radial-gradient(circle_at_50%_45%,rgba(0,255,135,0.12),transparent_34%)] opacity-0 blur-2xl transition duration-700 group-hover/hud:opacity-100" />
					<div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00ff87]/18 to-transparent lg:block" />
					<div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[18rem] -translate-x-1/2 rounded-full border border-[#00ff87]/10 opacity-0 transition duration-700 group-hover/hud:opacity-100 lg:block" />
					<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.48fr)_minmax(0,1fr)] lg:items-center">
						<div className="grid gap-8 lg:pr-8">
							<div
								style={{ transitionDelay: `0ms` }}
								className={`relative transition duration-700 ease-out lg:mr-8 ${
									isVisible
										? "translate-x-0 opacity-100"
										: "-translate-x-6 opacity-0"
								}`}>
								<div
									className={`pointer-events-none absolute -inset-4 rounded-lg bg-[#00ff87]/[0.055] blur-xl transition duration-700 ${
										activePrincipleIndex === 0 ? "opacity-100" : "opacity-0"
									}`}
								/>
								<div
									className={`absolute -right-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r to-transparent transition duration-700 lg:block ${
										activePrincipleIndex === 0
											? "from-[#00ff87]/70"
											: "from-[#00ff87]/18"
									}`}
								/>
								<PrincipleCard
									{...principles[0]}
									isActive={activePrincipleIndex === 0}
									onActivate={() => setActivePrincipleIndex(0)}
								/>
							</div>
							<div
								style={{ transitionDelay: `300ms` }}
								className={`relative transition duration-700 ease-out lg:ml-12 ${
									isVisible
										? "translate-x-0 opacity-100"
										: "-translate-x-6 opacity-0"
								}`}>
								<div
									className={`pointer-events-none absolute -inset-4 rounded-lg bg-[#00ff87]/[0.055] blur-xl transition duration-700 ${
										activePrincipleIndex === 2 ? "opacity-100" : "opacity-0"
									}`}
								/>
								<div
									className={`absolute -right-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r to-transparent transition duration-700 lg:block ${
										activePrincipleIndex === 2
											? "from-[#00ff87]/70"
											: "from-[#00ff87]/18"
									}`}
								/>
								<PrincipleCard
									{...principles[2]}
									isActive={activePrincipleIndex === 2}
									onActivate={() => setActivePrincipleIndex(2)}
								/>
							</div>
						</div>

						<HudTimeline
							isVisible={isVisible}
							activeIndex={activePrincipleIndex}
						/>

						<div className="grid gap-8 lg:pl-8">
							<div
								style={{ transitionDelay: `150ms` }}
								className={`relative transition duration-700 ease-out lg:ml-8 ${
									isVisible
										? "translate-x-0 opacity-100"
										: "translate-x-6 opacity-0"
								}`}>
								<div
									className={`pointer-events-none absolute -inset-4 rounded-lg bg-[#00ff87]/[0.055] blur-xl transition duration-700 ${
										activePrincipleIndex === 1 ? "opacity-100" : "opacity-0"
									}`}
								/>
								<div
									className={`absolute -left-12 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-l to-transparent transition duration-700 lg:block ${
										activePrincipleIndex === 1
											? "from-[#00ff87]/70"
											: "from-[#00ff87]/18"
									}`}
								/>
								<PrincipleCard
									{...principles[1]}
									isActive={activePrincipleIndex === 1}
									onActivate={() => setActivePrincipleIndex(1)}
								/>
							</div>
							<div
								className={`hidden rounded-lg border bg-[#030705]/70 p-6 text-right shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition duration-700 lg:block ${
									activePrincipleIndex === 1
										? "border-[#00ff87]/20 opacity-100"
										: "border-white/10 opacity-45"
								}`}>
								<p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#00ff87]/60">
									Concierge signal
								</p>
								<p className="mt-3 text-sm leading-7 text-[#dae6d8]/62">
									Every milestone stays visible, verified, and paired with a human
									curator before the keys change hands.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Story;
