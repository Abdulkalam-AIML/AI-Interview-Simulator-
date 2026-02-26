import { NextResponse } from "next/server";
import { questions, Role } from "@/data/questions";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") as Role;

    if (!role || !questions[role]) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Return questions for the selected role
    return NextResponse.json(questions[role]);
}
