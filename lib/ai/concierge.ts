import { GoogleGenerativeAI } from "@google/generative-ai";
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
const tools = [
	{
		functionDeclarations: [
			{
				name: "searchCars",
				description:
					"Search the AutoDeal car catalog based on specific filters like brand, budget, and performance.",
				parameters: {
					type: "OBJECT",
					properties: {
						brand: {
							type: "STRING",
							description: "The car brand (e.g., 'Porsche', 'Ferrari')",
						},
						bodySilhouette: {
							type: "STRING",
							description: "The body type (e.g., 'Coupe', 'SUV', 'Electric')",
						},
						minPrice: { type: "NUMBER", description: "Minimum price in USD" },
						maxPrice: { type: "NUMBER", description: "Maximum price in USD" },
						minHorsepower: {
							type: "NUMBER",
							description: "Minimum horsepower",
						},
						electricOnly: {
							type: "BOOLEAN",
							description: "Whether to only return electric vehicles",
						},
						availableOnly: {
							type: "BOOLEAN",
							description: "Whether to only return available vehicles",
						},
					},
				},
			},
			{
				name: "recommendCars",
				description:
					"Officially recommend one or more cars from the search results.",
				parameters: {
					type: "OBJECT",
					properties: {
						recommendations: {
							type: "ARRAY",
							items: {
								type: "OBJECT",
								properties: {
									carId: {
										type: "NUMBER",
										description: "The ID of the car from the catalog",
									},
									reason: {
										type: "STRING",
										description: "The reason why this car is recommended",
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

export async function getConciergeResponse(
	messages: ConciergeMessage[],
): Promise<ConciergeResponse> {
	const client = getGeminiClient();
	const model = client.getGenerativeModel({
		model: "gemini-3.1-flash-lite",
		systemInstruction: CONCIERGE_SYSTEM_PROMPT,
		tools: tools as any,
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

	const finalMessage = response.text();

	return {
		message: finalMessage || "I'm sorry, I couldn't process your request.",
		recommendations: recommendations.length > 0 ? recommendations : undefined,
	};
}
