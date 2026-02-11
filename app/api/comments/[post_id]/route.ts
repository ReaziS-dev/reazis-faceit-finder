import { NextRequest, NextResponse } from "next/server";
import { FaceitPlayer } from "@/app/types/faceit";

export async function GET(
  request: NextRequest,
  { params }: { params: { post_id: string } },
) {
  const { post_id } = await params;
  console.log("Fetching comments for post_id:", post_id);
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${post_id}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Player not found" },
          { status: 404 },
        );
      }
      throw new Error(`Faceit API error: ${response.status}`);
    }

    const player: FaceitPlayer = await response.json();
    return NextResponse.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data" },
      { status: 500 },
    );
  }
}
