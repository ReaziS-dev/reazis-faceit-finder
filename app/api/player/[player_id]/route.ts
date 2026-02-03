import { NextRequest, NextResponse } from "next/server";
import { FaceitPlayer } from "@/app/types/faceit";

export async function GET(
  request: NextRequest,
  { params }: { params: { player_id: string } },
) {
  const { player_id } = await params;
  const apiKey = process.env.FACEIT_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    return NextResponse.json(
      { error: "FACEIT_API_KEY is not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://open.faceit.com/data/v4/players?game=cs2&game_player_id=${player_id}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        next: { revalidate: 60 },
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
