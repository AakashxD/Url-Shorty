-import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Extract id from params
    return NextResponse.json({
        todo: "todo1" + id, // Use the extracted id
    });
}

export async function POST() {
    return NextResponse.json({
        response: true,
    });
}
