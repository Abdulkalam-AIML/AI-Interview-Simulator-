import { NextResponse } from "next/server";
import { analyzeAnswer } from "@/lib/nlp/analyzer";

export async function POST(request: Request) {
    try {
        const { userAnswer, idealAnswer, keywords } = await request.json();

        if (!userAnswer || !idealAnswer || !keywords) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = analyzeAnswer(userAnswer, idealAnswer, keywords);

        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
