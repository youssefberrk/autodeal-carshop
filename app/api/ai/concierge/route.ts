import { NextRequest, NextResponse } from "next/server";
import { getConciergeResponse } from "@/lib/ai/concierge";
import { z } from "zod";
import { ConciergeMessage } from "@/types/Concierge";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(2000),
    })
  ).max(50),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { messages } = validation.data;

    const response = await getConciergeResponse(messages as ConciergeMessage[]);

    return NextResponse.json(response);
  } catch (error) {
    console.error("[CONCIERGE_API_ERROR]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
