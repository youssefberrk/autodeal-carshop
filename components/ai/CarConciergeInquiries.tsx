"use client";

import { useState } from "react";
import {
	Sparkles,
	Globe,
	Zap,
	ShieldCheck,
	Settings2,
	BarChart3,
	ArrowRight,
	Search,
	Gauge,
	TrendingUp,
	Wind,
	Activity,
	Radio,
	Compass,
	CheckCircle2,
	SlidersHorizontal,
	type LucideIcon,
} from "lucide-react";
import { Cars } from "@/types/Cars";

interface CarConciergeInquiriesProps {
	car: Cars;
	onOpenConcierge: (carId: number, prompt?: string) => void;
}

interface InquiryItem {
	id: string;
	category: "all" | "web" | "performance" | "reliability" | "ownership" | "compare";
	label: string;
	subtitle: string;
	description: string;
	query: string;
	tag: string;
	icon: LucideIcon;
	telemetryBadge?: string;
}

const CATEGORIES = [
	{ id: "all", label: "All Intelligence Briefings", count: 6 },
	{ id: "web", label: "Web Deep Dive", count: 1 },
	{ id: "performance", label: "Track & Telemetry", count: 2 },
	{ id: "reliability", label: "Reliability & Care", count: 1 },
	{ id: "ownership", label: "Value & Upkeep", count: 1 },
	{ id: "compare", label: "Rival Benchmarks", count: 1 },
] as const;

export default function CarConciergeInquiries({
	car,
	onOpenConcierge,
}: CarConciergeInquiriesProps) {
	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [customPrompt, setCustomPrompt] = useState("");

	const carName = car.model ? `${car.brand} ${car.model}` : car.brand;

	const inquiries: InquiryItem[] = [
		{
			id: "web-specs",
			category: "web",
			label: "Deep Dive Specs & Journalist Verdicts",
			subtitle: "Automotive Press & Dyno Dossier",
			description: `Conduct a live web search for instrumented track tests, chassis response, dyno figures, and journalist verdicts on the ${carName}.`,
			query: `Search the web for more details, real-world tests, dyno charts, and expert reviews of the ${carName}.`,
			tag: "Web Dossier",
			icon: Globe,
			telemetryBadge: "Live Web Feed",
		},
		{
			id: "performance-telemetry",
			category: "performance",
			label: "Real-World 0–60 & Cornering Telemetry",
			subtitle: "Instrumented Drag & Lateral Acceleration",
			description: `Analyze real-world 0–60 mph, quarter-mile trap speeds, braking distance, and lateral grip vs factory claims.`,
			query: `How does the ${carName} perform in real-world 0-60 mph, quarter-mile, and handling tests compared to factory claims?`,
			tag: "Performance",
			icon: Zap,
			telemetryBadge: "0-60 & Track Logs",
		},
		{
			id: "aerodynamics-powertrain",
			category: "performance",
			label: "Powertrain Charisma & Sound Profile",
			subtitle: "Engine Architecture & Downforce",
			description: `Explore engine torque delivery, transmission response time, exhaust harmonics, and active aerodynamic downforce.`,
			query: `Detail the powertrain architecture, exhaust sound profile, downforce levels, and gear shift speed of the ${carName}.`,
			tag: "Powertrain",
			icon: Wind,
			telemetryBadge: "Aero & Powertrain",
		},
		{
			id: "reliability-issues",
			category: "reliability",
			label: "Reliability Records & Known Quirks",
			subtitle: "Owner Forums & Service History",
			description: `Examine verified owner feedback, known mechanical vulnerabilities, recall notices, and maintenance advice.`,
			query: `Search the web for known reliability records, common mechanical issues, and maintenance notes on the ${carName}.`,
			tag: "Reliability",
			icon: ShieldCheck,
			telemetryBadge: "Service History",
		},
		{
			id: "ownership-costs",
			category: "ownership",
			label: "True Ownership & Servicing Costs",
			subtitle: "Depreciation Curve & Maintenance",
			description: `Review estimated annual servicing expenses, consumable wear rates, insurance ratings, and 5-year value retention.`,
			query: `What are the estimated annual ownership costs, maintenance intervals, and depreciation profile for the ${carName}?`,
			tag: "Ownership",
			icon: TrendingUp,
			telemetryBadge: "5-Year Cost Profile",
		},
		{
			id: "rival-comparison",
			category: "compare",
			label: "Benchmark Against Primary Rivals",
			subtitle: "Direct Showroom & Track Shootout",
			description: `Compare driving engagement, exhaust charisma, cabin craft, and collector prestige against direct segment competitors.`,
			query: `Benchmark the ${carName} against its closest showroom competitors in power delivery, handling, and collector appeal.`,
			tag: "Comparison",
			icon: BarChart3,
			telemetryBadge: "Rival Benchmarks",
		},
	];

	const filteredInquiries =
		activeCategory === "all"
			? inquiries
			: inquiries.filter((item) => item.category === activeCategory);

	const handleCustomSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!customPrompt.trim() || !car.id) return;
		onOpenConcierge(car.id, customPrompt.trim());
		setCustomPrompt("");
	};

	const handleQuickPrompt = (promptText: string) => {
		if (!car.id) return;
		onOpenConcierge(car.id, `${promptText} for the ${carName}`);
	};

	const quickPrompts = [
		`Real 0-60 & 1/4 mile times`,
		`Known reliability issues & recalls`,
		`Benchmark vs top segment rivals`,
		`Estimated annual maintenance cost`,
	];

	return (
		<div
			aria-labelledby="concierge-inquiries-title"
			className="relative overflow-hidden rounded-3xl border border-[#00ff87]/30 bg-gradient-to-b from-[#0a1f14]/95 via-[#06140d]/98 to-[#030906] p-6 shadow-[0_35px_90px_-30px_rgba(0,255,135,0.22)] backdrop-blur-xl sm:p-10 lg:p-12"
		>
			{/* HUD Corner Accents */}
			<div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[#00ff87]/80" />
			<div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[#00ff87]/80" />
			<div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#00ff87]/80" />
			<div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#00ff87]/80" />

			{/* Animated Scanner Beam */}
			<div className="pointer-events-none absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#00ff87] to-transparent opacity-80 animate-pulse" />

			{/* Background Ambient Radial Glow */}
			<div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00ff87]/10 blur-[100px]" />
			<div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(0,255,135,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,135,0.4)_1px,transparent_1px)] [background-size:32px_32px]" />

			{/* Header */}
			<div className="relative z-10 flex flex-wrap items-start justify-between gap-6 pb-8 border-b border-[#e5efe3]/12">
				<div className="space-y-3 max-w-3xl">
					<div className="inline-flex items-center gap-2.5 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ff87] font-['Orbitron']">
						<Radio size={12} className="animate-pulse text-[#00ff87]" />
						<span>Marque Intelligence Engine • Live Grounding</span>
					</div>

					<h2
						id="concierge-inquiries-title"
						className="text-3xl sm:text-4xl lg:text-5xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3]"
					>
						AI Marque Concierge{" "}
						<span className="bg-gradient-to-r from-[#00ff87] via-[#b3ffd9] to-[#ffffff] bg-clip-text text-transparent not-italic font-['Manrope'] font-extrabold text-2xl sm:text-3xl lg:text-4xl ml-1">
							&amp; Live Intelligence
						</span>
					</h2>

					<p className="text-xs sm:text-sm text-[#dae6d8]/75 leading-relaxed font-['Manrope'] max-w-2xl">
						Instantly query our web-grounded neural concierge for deep-dive instrumented test results, track lap telemetry, verified owner reliability logs, and direct showroom benchmarks for the{" "}
						<span className="text-[#00ff87] font-semibold">{carName}</span>.
					</p>
				</div>

				<div className="flex flex-col items-end gap-2 shrink-0">
					<div className="inline-flex items-center gap-2.5 rounded-xl border border-[#00ff87]/40 bg-[#05180f]/80 px-4 py-2 text-xs font-mono font-medium text-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.2)]">
						<span className="relative flex h-2.5 w-2.5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
							<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff87]" />
						</span>
						<span>Web Grounding Active</span>
					</div>
					<span className="text-[10px] font-mono text-[#e5efe3]/40 tracking-wider">
						LATENCY &lt; 1.2S • GEMINI INTELLIGENCE
					</span>
				</div>
			</div>

			{/* Telemetry Feature Chips Bar */}
			<div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-[#e5efe3]/8">
				<div className="flex items-center gap-3 rounded-xl border border-[#e5efe3]/8 bg-[#050e0a]/60 px-3.5 py-2.5">
					<Gauge size={16} className="text-[#00ff87] shrink-0" />
					<div className="min-w-0">
						<span className="block text-[10px] uppercase font-mono tracking-wider text-[#e5efe3]/50">Track Telemetry</span>
						<span className="block text-xs font-bold font-mono text-[#e5efe3] truncate">0-60 &amp; Lateral Gs</span>
					</div>
				</div>

				<div className="flex items-center gap-3 rounded-xl border border-[#e5efe3]/8 bg-[#050e0a]/60 px-3.5 py-2.5">
					<ShieldCheck size={16} className="text-[#00ff87] shrink-0" />
					<div className="min-w-0">
						<span className="block text-[10px] uppercase font-mono tracking-wider text-[#e5efe3]/50">Reliability Index</span>
						<span className="block text-xs font-bold font-mono text-[#e5efe3] truncate">Owner &amp; Recall Logs</span>
					</div>
				</div>

				<div className="flex items-center gap-3 rounded-xl border border-[#e5efe3]/8 bg-[#050e0a]/60 px-3.5 py-2.5">
					<BarChart3 size={16} className="text-[#00ff87] shrink-0" />
					<div className="min-w-0">
						<span className="block text-[10px] uppercase font-mono tracking-wider text-[#e5efe3]/50">Market Matrix</span>
						<span className="block text-xs font-bold font-mono text-[#e5efe3] truncate">Rival Shootouts</span>
					</div>
				</div>

				<div className="flex items-center gap-3 rounded-xl border border-[#e5efe3]/8 bg-[#050e0a]/60 px-3.5 py-2.5">
					<TrendingUp size={16} className="text-[#00ff87] shrink-0" />
					<div className="min-w-0">
						<span className="block text-[10px] uppercase font-mono tracking-wider text-[#e5efe3]/50">Value Curve</span>
						<span className="block text-xs font-bold font-mono text-[#e5efe3] truncate">5-Year Depreciation</span>
					</div>
				</div>
			</div>

			{/* Category Filter Tabs */}
			<div className="relative z-10 pt-6 pb-4">
				<div className="flex items-center justify-between gap-3 mb-3">
					<span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5efe3]/50 font-['Orbitron'] flex items-center gap-2">
						<SlidersHorizontal size={12} className="text-[#00ff87]" />
						Select Intelligence Dossier Category
					</span>
					<span className="text-[11px] font-mono text-[#00ff87]/80">
						Showing {filteredInquiries.length} of {inquiries.length} Briefings
					</span>
				</div>

				<div
					role="tablist"
					aria-label="Concierge Inquiry Categories"
					className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none"
				>
					{CATEGORIES.map((cat) => {
						const isActive = activeCategory === cat.id;
						return (
							<button
								key={cat.id}
								role="tab"
								type="button"
								aria-selected={isActive}
								onClick={() => setActiveCategory(cat.id)}
								className={`group shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] ${
									isActive
										? "border border-[#00ff87]/70 bg-[#00ff87]/20 text-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.28)]"
										: "border border-[#e5efe3]/12 bg-[#050e0a]/80 text-[#e5efe3]/70 hover:border-[#00ff87]/40 hover:text-[#e5efe3]"
								}`}
							>
								<span>{cat.label}</span>
								<span
									className={`rounded-full px-1.5 py-0.5 text-[9px] font-mono transition-colors ${
										isActive
											? "bg-[#00ff87] text-[#050e0a] font-bold"
											: "bg-[#e5efe3]/10 text-[#e5efe3]/60 group-hover:bg-[#00ff87]/20 group-hover:text-[#00ff87]"
									}`}
								>
									{cat.count}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Inquiries Cards Grid */}
			<div
				role="list"
				className="relative z-10 grid grid-cols-1 gap-5 pt-3 md:grid-cols-2 lg:grid-cols-3"
			>
				{filteredInquiries.map((item) => {
					const Icon = item.icon;
					return (
						<button
							key={item.id}
							role="listitem"
							type="button"
							onClick={() => car.id && onOpenConcierge(car.id, item.query)}
							className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e5efe3]/12 bg-gradient-to-b from-[#091a11]/90 to-[#050e0a]/95 p-6 text-left transition-all duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:border-[#00ff87]/70 hover:bg-[#00ff87]/[0.09] hover:shadow-[0_20px_45px_-15px_rgba(0,255,135,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] active:scale-[0.98] cursor-pointer"
						>
							{/* Top card accent glow */}
							<div className="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-[#00ff87]/0 group-hover:bg-[#00ff87]/20 transition-all duration-500 blur-xl" />

							<div>
								{/* Header pill & badge */}
								<div className="flex items-center justify-between gap-2 mb-4">
									<div className="flex items-center gap-3">
										<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#00ff87]/30 bg-[#00ff87]/15 text-[#00ff87] group-hover:border-[#00ff87]/60 group-hover:bg-[#00ff87] group-hover:text-[#050e0a] transition-all duration-300 shadow-[0_0_12px_rgba(0,255,135,0.2)]">
											<Icon size={16} />
										</span>
										<span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff87]/90 bg-[#00ff87]/10 px-2.5 py-1 rounded-md border border-[#00ff87]/20">
											{item.tag}
										</span>
									</div>

									{item.telemetryBadge && (
										<span className="text-[9px] font-mono text-[#e5efe3]/40 border-b border-[#e5efe3]/15 pb-0.5">
											{item.telemetryBadge}
										</span>
									)}
								</div>

								{/* Title & Subtitle */}
								<div className="space-y-1 mb-3">
									<h3 className="text-base font-bold text-[#e5efe3] group-hover:text-[#00ff87] transition-colors font-['Manrope'] line-clamp-1">
										{item.label}
									</h3>
									<p className="text-[11px] font-mono text-[#00ff87]/70 italic">
										{item.subtitle}
									</p>
								</div>

								{/* Description */}
								<p className="text-xs leading-relaxed text-[#dae6d8]/70 group-hover:text-[#dae6d8]/90 transition-colors line-clamp-3 font-['Manrope']">
									{item.description}
								</p>
							</div>

							{/* Action Footer */}
							<div className="mt-6 flex items-center justify-between pt-4 border-t border-[#e5efe3]/10 text-xs font-mono text-[#00ff87]/80 group-hover:text-[#00ff87] transition-colors">
								<span className="flex items-center gap-1.5 font-bold tracking-wider">
									<Sparkles size={12} className="text-[#00ff87]" />
									<span>Run Neural Briefing</span>
								</span>
								<div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 group-hover:border-[#00ff87] group-hover:bg-[#00ff87] group-hover:text-[#050e0a] transition-all duration-300">
									<ArrowRight
										size={12}
										className="transition-transform duration-300 group-hover:translate-x-0.5"
									/>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			{/* Quick One-Touch Prompt Chips */}
			<div className="relative z-10 mt-8 pt-6 border-t border-[#e5efe3]/10">
				<div className="flex items-center gap-2 mb-3">
					<Compass size={13} className="text-[#00ff87]" />
					<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5efe3]/50 font-['Orbitron']">
						Quick Telemetry Presets
					</span>
				</div>
				<div className="flex flex-wrap gap-2">
					{quickPrompts.map((qp, idx) => (
						<button
							key={idx}
							type="button"
							onClick={() => handleQuickPrompt(qp)}
							className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5efe3]/10 bg-[#050e0a]/80 px-3 py-1.5 text-xs text-[#e5efe3]/70 hover:border-[#00ff87]/50 hover:bg-[#00ff87]/10 hover:text-[#00ff87] transition-all cursor-pointer"
						>
							<Sparkles size={10} className="text-[#00ff87]" />
							<span>{qp}</span>
						</button>
					))}
				</div>
			</div>

			{/* Custom Direct Inquire Form */}
			<form
				onSubmit={handleCustomSubmit}
				className="relative z-10 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-[#00ff87]/25 bg-[#050e0a]/90 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
			>
				<div className="relative flex-1">
					<Search
						size={18}
						className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff87]/70"
					/>
					<input
						type="text"
						value={customPrompt}
						onChange={(e) => setCustomPrompt(e.target.value)}
						placeholder={`Ask any custom question about the ${carName} (e.g. real 0-60, track times, common faults)...`}
						aria-label={`Custom concierge inquiry for ${carName}`}
						className="w-full rounded-xl border border-transparent bg-transparent py-3 pl-12 pr-4 text-xs sm:text-sm text-[#e5efe3] placeholder-[#e5efe3]/40 transition-colors focus:outline-none"
					/>
				</div>
				<button
					type="submit"
					disabled={!customPrompt.trim()}
					className="shrink-0 flex items-center justify-center gap-2.5 rounded-xl border border-[#00ff87]/60 bg-gradient-to-r from-[#00ff87] via-[#20ff95] to-[#00e07a] px-7 py-3 text-xs sm:text-sm font-bold tracking-wide text-[#050e0a] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_25px_rgba(0,255,135,0.4)] disabled:opacity-30 disabled:pointer-events-none active:scale-[0.97] cursor-pointer"
				>
					<span>Consult Concierge</span>
					<Sparkles size={15} />
				</button>
			</form>
		</div>
	);
}
