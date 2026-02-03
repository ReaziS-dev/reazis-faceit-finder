"use client";

import { useSearchParams } from "next/navigation";
import PlayerCard from "@/components/PlayerCard";
import EmptyPlayerCard from "@/components/EmptyPlayerCard";
import { FaceitPlayer } from "../types/faceit";
import { useFetchMultiple } from "@/hooks/useFetchMultiple";
import { Alert, Box, CircularProgress } from "@mui/material";

export default function PlayersPage() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const playerIds = idsParam.split(",").filter((id) => id.trim().length > 0);

  const { results, loading } = useFetchMultiple<FaceitPlayer>(
    playerIds,
    (id) => `/api/player/${id}`,
  );

  if (playerIds.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Alert severity="info">
          No player IDs provided. Go back and drop a file.
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress sx={{ color: "#FF5500" }} />
      </Box>
    );
  }

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
