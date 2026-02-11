import { Suspense } from "react";
import PlayerCard from "@/components/PlayerCard";
import EmptyPlayerCard from "@/components/EmptyPlayerCard";
import { FaceitPlayer } from "../types/faceit";
import { Alert, Box } from "@mui/material";

interface PlayerResult {
  id: string;
  data?: FaceitPlayer;
  error?: string;
}

async function fetchPlayerData(playerIds: string[]): Promise<PlayerResult[]> {
  const results: PlayerResult[] = [];

  for (const id of playerIds) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/player/${id}`,
        { next: { revalidate: 3600 } },
      );
      if (response.ok) {
        const data: FaceitPlayer = await response.json();
        results.push({ id, data });
      } else {
        results.push({ id, error: "Not found" });
      }
    } catch (error) {
      results.push({
        id,
        error: error instanceof Error ? error.message : "Error loading player",
      });
    }
  }

  return results;
}

interface PlayersPageProps {
  searchParams: Promise<{ ids?: string }>;
}

export default async function PlayersPage({ searchParams }: PlayersPageProps) {
  const params = await searchParams;
  const idsParam = params.ids || "";
  const playerIds = idsParam.split(",").filter((id) => id.trim().length > 0);

  if (playerIds.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Alert severity="info">
          No player IDs provided. Go back and drop a file.
        </Alert>
      </Box>
    );
  }

  const results = await fetchPlayerData(playerIds);

  return (
    <Box p={2}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {results.map((result) => (
          <Box key={result.id}>
            {result.data ? (
              <PlayerCard player={result.data} />
            ) : (
              <EmptyPlayerCard
                id={result.id}
                error={result.error || "Not found"}
              />
            )}
          </Box>
        ))}
      </Box>

      {results.length === 0 && (
        <Alert severity="info">No players to display</Alert>
      )}
    </Box>
  );
}
