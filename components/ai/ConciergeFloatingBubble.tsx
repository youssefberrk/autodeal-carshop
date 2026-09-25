"use client";

import { useState } from "react";
import { Sparkles, X, ChevronDown, MessageSquareText, Radio } from "lucide-react";

interface ConciergeFloatingBubbleProps {
	isOpen: boolean;
	onToggle: () => void;
	onDismiss: () => void;
	activeCarName?: string;
	hasMessages?: boolean;
}

export default function ConciergeFloatingBubble({
	isOpen,
	onToggle,
	onDismiss,
	activeCarName,
	hasMessages = false,
}: ConciergeFloatingBubbleProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<aside
			aria-label="AI Marque Concierge Launcher"
			className="fixed bottom-6 right-6 z-[95] flex items-center gap-3 select-none"
		>
			{/* Optional Tooltip / Preview Pill on Desktop */}
			<div
				role="status"
				className={`hidden sm:flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#050e0a]/90 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 pointer-events-none ${
					isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
				}`}
			>
				<Radio size={12} className="text-[#00ff87] animate-pulse" />
				<span className="text-[11px] font-mono font-medium text-[#e5efe3] tracking-wide">
					{isOpen
						? "Minimize Concierge"
						: activeCarName
							? `AI Concierge • ${activeCarName}`
							: "AI Marque Concierge"}
				</span>
			</div>

			{/* Main Bubble Container with Dismiss 'X' */}
			<div className="relative group">
				{/* Small Dismiss 'X' Button to permanently remove bubble from page */}
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onDismiss();
					}}
					aria-label="Remove AI Concierge bubble from page"
					title="Remove bubble from page"
					className="absolute -top-1.5 -right-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full border border-[#dae6d8]/30 bg-[#050e0a] text-[#dae6d8]/70 shadow-md transition-all duration-200 hover:border-[#ef4444] hover:bg-[#ef4444]/20 hover:text-[#ef4444] hover:scale-110 active:scale-90 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ef4444]"
				>
					<X size={10} strokeWidth={2.5} />
				</button>

				{/* Primary Floating Launcher Button */}
				<button
					type="button"
					onClick={onToggle}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
					aria-expanded={isOpen}
					className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff87] ${
						isOpen
							? "border-[#00ff87] bg-gradient-to-br from-[#091a11] via-[#050e0a] to-[#000000] text-[#00ff87] shadow-[0_0_30px_rgba(0,255,135,0.45)]"
							: "border-[#00ff87]/50 bg-gradient-to-br from-[#091a11]/95 via-[#050e0a]/98 to-[#020705] text-[#00ff87] shadow-[0_0_25px_rgba(0,255,135,0.3)] hover:border-[#00ff87] hover:shadow-[0_0_35px_rgba(0,255,135,0.55)]"
					}`}
				>
					{/* Radar Ping Animation when closed */}
					{!isOpen && (
						<span className="pointer-events-none absolute -inset-1 rounded-2xl border border-[#00ff87]/30 opacity-75 animate-ping" />
					)}

					{/* Icon Switcher */}
					{isOpen ? (
						<ChevronDown size={22} className="transition-transform duration-200" />
					) : (
						<Sparkles size={22} className="transition-transform duration-200 group-hover:rotate-12" />
					)}

					{/* Active conversation indicator dot */}
					{hasMessages && !isOpen && (
						<span
							className="absolute top-2 left-2 flex h-2.5 w-2.5"
							aria-label="Active conversation"
						>
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
							<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
						</span>
					)}
				</button>
			</div>
		</aside>
	);
}
