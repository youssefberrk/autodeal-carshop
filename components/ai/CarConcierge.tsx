"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
	ConciergeMessage,
	ConciergeResponse,
	CarRecommendation,
} from "@/types/Concierge";
import ConciergeMessageComponent from "./ConciergeMessage";
import ConciergeInput from "./ConciergeInput";
import CarRecommendationCard from "./CarRecommendationCard";
import { carsData } from "@/public/cars/CarsData";
import {
	X,
	Sparkles,
	Globe,
	RotateCcw,
	Maximize2,
	Minimize2,
} from "lucide-react";
import {
	CONCIERGE_MESSAGES_STORAGE_KEY,
	persistConciergeMessages,
} from "@/store/conciergeStorage";

interface CarConciergeProps {
	carId?: number;
	initialPrompt?: string;
	onClose?: () => void;
}

type ConciergeChatMessage = ConciergeMessage & {
	recommendations?: CarRecommendation[];
};

export interface SuggestedPrompt {
	label: string;
	query: string;
	tag: string;
	icon?: string;
}

export const getCarSuggestedPrompts = (car?: {
	brand: string;
	model?: string;
	specs?: string;
}): SuggestedPrompt[] => {
	if (!car) {
		return [
			{
				label: "Curate grand tourer under $100k",
				query:
					"Curate a grand tourer under $100k with exceptional comfort and long-distance pedigree.",
				tag: "Curation",
			},
			{
				label: "Electric vehicles with presence",
				query:
					"I want something electric with distinctive design and effortless performance.",
				tag: "EV",
			},
			{
				label: "Track-focused performance",
				query:
					"Show me track-focused performance vehicles with razor-sharp handling.",
				tag: "Track",
			},
			{
				label: "Compare flagship sports cars",
				query:
					"Compare top luxury sports cars in our collection in terms of character and power.",
				tag: "Compare",
			},
		];
	}

	const carName = car.model ? `${car.brand} ${car.model}` : car.brand;

	return [
		{
			label: "More Details (Web Specs & Reviews)",
			query: `Search the web for more details, real-world tests, and expert reviews of the ${carName}.`,
			tag: "Web Deep Dive",
		},
		{
			label: "Real-World 0-60 & Track Tests",
			query: `How does the ${carName} perform in real-world 0-60 mph, quarter-mile, and handling tests?`,
			tag: "Performance",
		},
		{
			label: "Reliability & Common Issues",
			query: `Search the web for known reliability records, common mechanical issues, and maintenance notes on the ${carName}.`,
			tag: "Reliability",
		},
		{
			label: "Ownership & Running Costs",
			query: `What are the estimated annual ownership costs, maintenance intervals, and depreciation profile for the ${carName}?`,
			tag: "Ownership",
		},
		{
			label: "Benchmark Against Top Rivals",
			query: `Benchmark the ${carName} against its closest competitors in power, driving feel, and prestige.`,
			tag: "Comparison",
		},
	];
};

const getScrollBehavior = (): ScrollBehavior =>
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches
		? "auto"
		: "smooth";

const CarConcierge = ({ carId, initialPrompt, onClose }: CarConciergeProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [messages, setMessages] = useState<ConciergeChatMessage[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(Boolean(initialPrompt));
	const [error, setError] = useState<string | null>(null);
	const [activeRequest, setActiveRequest] = useState<string | undefined>(
		initialPrompt,
	);
	const scrollRef = useRef<HTMLDivElement>(null);
	const isNearBottomRef = useRef(true);
	const consumedPromptRef = useRef<string | undefined>(undefined);
	// Capture the initial carId so the mount-only effect can read it without a dep
	const initialCarIdRef = useRef(carId);

	const activeCar = carId ? carsData.find((c) => c.id === carId) : undefined;
	const suggestedPrompts = getCarSuggestedPrompts(activeCar);

	const handleScroll = () => {
		const el = scrollRef.current;
		if (!el) return;

		const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
		isNearBottomRef.current = distanceFromBottom < 80;
	};

	// Restore messages from localStorage on initial mount
	useEffect(() => {
		const initialCarId = initialCarIdRef.current;
		try {
			const saved = localStorage.getItem(CONCIERGE_MESSAGES_STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed) && parsed.length > 0) {
					setMessages(parsed);
					setIsHydrated(true);
					return;
				}
			}
		} catch (e) {
			console.error("Failed to restore concierge chat messages:", e);
		}

		// Default intro dossier if no saved messages — intentionally runs once on mount only
		const car = initialCarId
			? carsData.find((c) => c.id === initialCarId)
			: undefined;
		if (car) {
			setMessages([
				{
					role: "assistant",
					content: `I've opened the dossier for the ${car.brand} ${car.model}. I can conduct a live web search for deep-dive instrumented tests, evaluate reliability and ownership history, or compare it against rivals on the showroom floor. How would you like to proceed?`,
					recommendations: [
						{
							carId: car.id,
							reason: "Currently in view — the benchmark for this briefing.",
						},
					],
				},
			]);
		}
		setIsHydrated(true);
	}, []); // intentional: runs once on mount to restore persisted session

	// Sync messages to localStorage whenever they change
	useEffect(() => {
		if (!isHydrated) return;
		persistConciergeMessages(messages);
	}, [messages, isHydrated]);

	// Scroll effect
	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const lastMessage = messages[messages.length - 1];
		const isUserMessage = lastMessage?.role === "user";

		if (isLoading || isUserMessage) {
			isNearBottomRef.current = true;
			el.scrollTo({ top: el.scrollHeight, behavior: getScrollBehavior() });
			return;
		}

		if (!isNearBottomRef.current) return;

		const messageNodes = el.querySelectorAll<HTMLElement>(
			"[data-concierge-message]",
		);
		const lastNode = messageNodes[messageNodes.length - 1];

		if (!lastNode) {
			isNearBottomRef.current = true;
			el.scrollTo({ top: el.scrollHeight, behavior: getScrollBehavior() });
			return;
		}

		const maxScrollTop = el.scrollHeight - el.clientHeight;
		const desiredTop =
			lastNode.getBoundingClientRect().top -
			el.getBoundingClientRect().top +
			el.scrollTop -
			12;

		el.scrollTo({
			top: Math.max(0, Math.min(desiredTop, maxScrollTop)),
			behavior: getScrollBehavior(),
		});
	}, [messages, isLoading]);

	// If carId changes while messages are empty, load car introduction
	useEffect(() => {
		if (!isHydrated) return;
		const car = carId ? carsData.find((c) => c.id === carId) : undefined;

		if (!car) return;

		if (messages.length === 0) {
			setMessages([
				{
					role: "assistant",
					content: `I've opened the dossier for the ${car.brand} ${car.model}. I can conduct a live web search for deep-dive instrumented tests, evaluate reliability and ownership history, or compare it against rivals on the showroom floor. How would you like to proceed?`,
					recommendations: [
						{
							carId: car.id,
							reason: "Currently in view — the benchmark for this briefing.",
						},
					],
				},
			]);
		}
	}, [carId, isHydrated, messages.length]);

	const handleSend = useCallback(
		async (content: string) => {
			const userMessage: ConciergeMessage = { role: "user", content };
			setMessages((prev) => [...prev, userMessage]);
			setActiveRequest(content);
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/ai/concierge", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						messages: [...messages, userMessage].map(({ role, content }) => ({
							role,
							content,
						})),
					}),
				});

				if (!response.ok) {
					throw new Error(
						"The Concierge could not complete that request. Please try again.",
					);
				}

				const data: ConciergeResponse = await response.json();

				setMessages((prev) => [
					...prev,
					{
						role: "assistant",
						content: data.message,
						recommendations: data.recommendations,
					},
				]);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An unexpected error occurred.",
				);
			} finally {
				setIsLoading(false);
			}
		},
		[messages],
	);

	const handlePromptClick = (query: string) => {
		if (isLoading) return;
		void handleSend(query);
	};

	const clearConversation = () => {
		setMessages([]);
		setActiveRequest(undefined);
		setError(null);
		isNearBottomRef.current = true;
	};

	useEffect(() => {
		if (!initialPrompt) return;
		if (consumedPromptRef.current === initialPrompt) return;

		consumedPromptRef.current = initialPrompt;
		void handleSend(initialPrompt);
	}, [initialPrompt, handleSend]);

	return (
		<div
			className={`car-concierge-container border border-[#e5efe3]/22 bg-gradient-to-b from-[#16201a] via-[#171c18] to-[#090b09] flex flex-col h-full${isExpanded ? " is-expanded" : ""}`}
			aria-labelledby="concierge-title">
			<header className="concierge-header">
				<div className="header-left">
					<div className="concierge-mark" aria-hidden="true">
						<Sparkles size={16} />
					</div>
					<div className="header-titles">
						<span className="header-eyebrow">AutoDeal Private Client</span>
						<h3 className="header-title" id="concierge-title">
							AI Marque Concierge
						</h3>
					</div>
				</div>
				<div className="header-actions">
					<button
						type="button"
						onClick={() => setIsExpanded((expanded) => !expanded)}
						className="btn-close"
						aria-label={
							isExpanded
								? "Restore concierge window"
								: "Expand concierge window"
						}
						aria-expanded={isExpanded}
						title={isExpanded ? "Restore window size" : "Expand window"}>
						{isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
					</button>
					<button
						type="button"
						onClick={clearConversation}
						className="btn-clear flex items-center gap-1.5"
						title="Reset conversation history">
						<RotateCcw size={11} />
						<span>Reset</span>
					</button>
					{onClose && (
						<button
							type="button"
							onClick={onClose}
							className="btn-close"
							aria-label="Close AI Concierge">
							<X size={17} />
						</button>
					)}
				</div>
			</header>

			<div className="concierge-context-bar flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="context-indicator" aria-hidden="true" />
					<span className="context-label">
						{activeCar
							? `${activeCar.brand} ${activeCar.model} in focus`
							: "Full catalog access"}
					</span>
				</div>
				<span className="context-status flex items-center gap-1">
					<Globe size={11} className="text-[#00ff87]/80" />
					Live Web Grounding
				</span>
			</div>

			{activeRequest && (
				<div
					className="concierge-request-bar"
					aria-label="Current briefing request">
					<span className="request-label">Briefing request</span>
					<p className="request-text">{activeRequest}</p>
				</div>
			)}

			<div
				className="concierge-body flex-1 overflow-y-auto"
				ref={scrollRef}
				onScroll={handleScroll}>
				{messages.length === 0 && !error && !isLoading && (
					<div className="concierge-empty">
						<span className="empty-eyebrow">Private briefing</span>
						<p className="empty-text">
							Tell me how you intend to drive, and I&apos;ll curate the
							shortlist from the live AutoDeal inventory.
						</p>
						<div
							className="starter-prompts flex flex-col gap-2 w-full mt-3"
							aria-label="Suggested concierge requests">
							{suggestedPrompts.map((prompt, idx) => (
								<button
									type="button"
									key={idx}
									onClick={() => handlePromptClick(prompt.query)}
									className="starter-prompt-btn flex items-center justify-between group">
									<span>{prompt.label}</span>
									<span className="text-[9px] uppercase tracking-wider text-[#00ff87]/70 font-mono">
										{prompt.tag}
									</span>
								</button>
							))}
						</div>
					</div>
				)}

				{error && (
					<div className="concierge-error" role="alert">
						<span className="error-eyebrow">Briefing interrupted</span>
						<p>{error}</p>
						<button
							type="button"
							onClick={() => setError(null)}
							className="btn-retry">
							Dismiss and continue
						</button>
					</div>
				)}

				{messages.map((msg, idx) => (
					<ConciergeMessageComponent key={idx} message={msg}>
						{msg.recommendations && msg.recommendations.length > 0 && (
							<section
								className="recommendations-panel"
								aria-label="Curated vehicle recommendations">
								<div className="recommendations-header">
									<span className="recommendations-eyebrow">
										Curated for this briefing
									</span>
									<span className="recommendations-count">
										{msg.recommendations.length}{" "}
										{msg.recommendations.length === 1 ? "vehicle" : "vehicles"}
									</span>
								</div>
								<div className="recommendations-grid">
									{msg.recommendations.map((rec) => {
										const car = carsData.find((c) => c.id === rec.carId);
										if (!car) return null;
										return (
											<CarRecommendationCard
												key={car.id}
												car={car}
												recommendation={rec}
											/>
										);
									})}
								</div>
							</section>
						)}
					</ConciergeMessageComponent>
				))}

				{isLoading && (
					<div className="message-wrap assistant">
						<div className="message-avatar" aria-hidden="true">
							<span className="avatar-monogram">AD</span>
						</div>
						<div className="message-content">
							<div className="message-meta flex items-center gap-2">
								<span>AutoDeal Concierge</span>
								<span className="text-[8px] font-mono text-[#00ff87]/60 flex items-center gap-1">
									<Globe size={9} /> Consulting Web & Catalog
								</span>
							</div>
							<div
								className="typing-indicator"
								aria-label="Concierge is researching and synthesizing response">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Suggested Inquiries Quick Bar */}
			{suggestedPrompts.length > 0 && (
				<div className="px-4 py-2 border-t border-[rgba(218,230,216,0.06)] bg-[rgba(21,23,22,0.65)] backdrop-blur-md">
					<div className="flex items-center gap-1.5 mb-1.5 text-[9px] md:text-[11px] font-mono uppercase tracking-wider text-[#dae6d8]/45">
						<Sparkles size={10} className="text-[#00ff87]" />
						<span>Suggested Inquiries:</span>
					</div>
					<div className="flex gap-1 overflow-x-auto pb-2 luxury-scrollbar">
						{suggestedPrompts.map((item, idx) => (
							<button
								key={idx}
								type="button"
								disabled={isLoading}
								onClick={() => handlePromptClick(item.query)}
								className="shrink-0 text-[11px] md:text-[13px] px-2.5 py-1 rounded border border-[#e5efe3]/10 bg-[#091a11] text-[#e5efe3]/85 hover:border-[#00ff87]/50 hover:bg-[#29312d] hover:text-[#00ff87]/80 active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:pointer-events-none">
								{item.label}
							</button>
						))}
					</div>
				</div>
			)}

			<footer className="concierge-footer">
				<ConciergeInput
					onSend={handleSend}
					isLoading={isLoading}
					disabled={!!error}
				/>
				<p className="concierge-footnote flex items-center justify-between">
					<span>Grounded in live showroom data &amp; web intelligence.</span>
					<span className="text-[#00ff87]/60 font-mono">Gemini AI</span>
				</p>
			</footer>
		</div>
	);
};

export default CarConcierge;
