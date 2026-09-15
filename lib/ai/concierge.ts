import { GoogleGenerativeAI, SchemaType, type Tool } from "@google/generative-ai";
import { CONCIERGE_SYSTEM_PROMPT } from "./prompts";
import { searchCars } from "./tools/searchCars";
import {
	ConciergeMessage,
	ConciergeResponse,
	CarSearchFilters,
	CarRecommendation,
} from "@/types/Concierge";

const getGeminiClient = () =>
	new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

// Define tools for Gemini
const tools: Tool[] = [
	{
		functionDeclarations: [
			{
				name: "searchCars",
				description:
					"Search the AutoDeal collection by brand, budget, silhouette, power, and availability. Returns grounded catalogue facts including badge, specs, features, colours, and stock.",
				parameters: {
					type: SchemaType.OBJECT,
					properties: {
						brand: {
							type: SchemaType.STRING,
							description: "The car brand (e.g., 'Porsche', 'Ferrari')",
						},
						bodySilhouette: {
							type: SchemaType.STRING,
							description: "The body type (e.g., 'Coupe', 'SUV', 'Electric')",
						},
						minPrice: { type: SchemaType.NUMBER, description: "Minimum price in USD" },
						maxPrice: { type: SchemaType.NUMBER, description: "Maximum price in USD" },
						minHorsepower: {
							type: SchemaType.NUMBER,
							description: "Minimum horsepower",
						},
						electricOnly: {
							type: SchemaType.BOOLEAN,
							description: "Whether to only return electric vehicles",
						},
						availableOnly: {
							type: SchemaType.BOOLEAN,
							description: "Whether to only return available vehicles",
						},
					},
				},
			},
			{
				name: "recommendCars",
				description:
					"Present curated vehicles to the client. Call this whenever you name, describe, or recommend a specific vehicle so the client sees the matching card. Never present cars only in text.",
				parameters: {
					type: SchemaType.OBJECT,
					properties: {
						recommendations: {
							type: SchemaType.ARRAY,
							items: {
								type: SchemaType.OBJECT,
								properties: {
									carId: {
										type: SchemaType.NUMBER,
										description: "The ID of the car from the catalog",
									},
									reason: {
										type: SchemaType.STRING,
										description:
											"One vivid sentence (max 20 words) pairing a concrete catalogue fact with this car's character or ownership benefit. Vary openings; no generic praise, markdown, or bullet points.",
									},
								},
								required: ["carId", "reason"],
							},
							description: "List of recommended cars",
						},
					},
					required: ["recommendations"],
				},
			},
		],
	},
];

/**
 * Convert model output into clean, client-facing plain text.
 * The concierge UI renders text as-is, so markdown and list syntax
 * must never reach the client.
 */
const toPlainText = (value: string) =>
	value
		.replace(/```[\s\S]*?```/g, "")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\*\*(.*?)\*\*/g, "$1")
		.replace(/__(.*?)__/g, "$1")
		.replace(/\*(.*?)\*/g, "$1")
		.replace(/^#{1,6}\s+/gm, "")
		.replace(/^\s*[-*•]\s+/gm, "")
		.replace(/^\s*\d+[.)]\s+/gm, "")
		.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
		.replace(/[ \t]+$/gm, "")
		.replace(/\n{3,}/g, "\n\n")
		.replace(/([^\n])\n([^\n])/g, "$1 $2")
		.trim();

export async function getConciergeResponse(
	messages: ConciergeMessage[],
): Promise<ConciergeResponse> {
	const client = getGeminiClient();
	const model = client.getGenerativeModel({
		model: "gemini-3.1-flash-lite",
		systemInstruction: CONCIERGE_SYSTEM_PROMPT,
		tools,
		generationConfig: {
			temperature: 0.8,
		},
	});

	// Map OpenAI-style messages to Gemini-style history
	// OpenAI roles: user, assistant, system. Gemini roles: user, model.
	const history = messages
		.filter((m) => m.role !== "system")
		.map((m) => ({
			role: m.role === "assistant" ? "model" : "user",
			parts: [{ text: m.content }],
		}));

	// Gemini requires the chat history to start with a 'user' message.
	// If the conversation starts with assistant messages, we strip them from the history.
	while (history.length > 0 && history[0].role === "model") {
		history.shift();
	}

	const chat = model.startChat({
		history: history,
	});

	const lastUserMessage = messages[messages.length - 1].content;
	const result = await chat.sendMessage(lastUserMessage);
	let response = result.response;

	const recommendations: CarRecommendation[] = [];

	// Handle the tool-calling loop
	while (
		response.candidates?.[0]?.content?.parts?.some((part) => part.functionCall)
	) {
		const functionCalls = response.candidates[0].content.parts.filter(
			(part) => part.functionCall,
		);
		const functionResponses = [];

		for (const call of functionCalls) {
			const { name, args } = call.functionCall!;

			if (name === "searchCars") {
				const filters = args as CarSearchFilters;
				const searchResults = searchCars(filters);
				functionResponses.push({
					functionResponse: {
						name: "searchCars",
						response: { content: searchResults },
					},
				});
			} else if (name === "recommendCars") {
				const { recommendations: recs } = args as {
					recommendations: CarRecommendation[];
				};
				if (recs) {
					recommendations.push(...recs);
				}
				functionResponses.push({
					functionResponse: {
						name: "recommendCars",
						response: { content: "Recommendations recorded." },
					},
				});
			}
		}

		// Send function results back to the model
		const nextResult = await chat.sendMessage(functionResponses);
		response = nextResult.response;
	}

	let finalMessage = "";
	try {
		finalMessage = toPlainText(response.text() || "");
	} catch {
		finalMessage = "";
	}

	const normalizedRecommendations = Array.from(
		new Map(
			recommendations
				.filter(
					(rec) =>
						rec &&
						typeof rec.carId === "number" &&
						typeof rec.reason === "string",
				)
				.map((rec) => [
					rec.carId,
					{ carId: rec.carId, reason: toPlainText(rec.reason) },
				] as const),
		).values(),
	);

	const fallbackMessage =
		normalizedRecommendations.length > 0
			? "I've assembled a shortlist that matches the brief. Tell me which direction appeals — sharper, quieter, or more theatrical — and I'll refine it."
			: "I'm sorry, I couldn't process that request. Would you like to try a different budget, brand, or body style?";

	return {
		message: finalMessage || fallbackMessage,
		recommendations:
			normalizedRecommendations.length > 0 ? normalizedRecommendations : undefined,
	};
}
