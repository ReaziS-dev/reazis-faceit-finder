"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FaceitPlayer } from "@/app/types/faceit";

interface PlayerCardProps {
  player: FaceitPlayer;
}

// Faceit skill level colors (official)
const skillLevelColors: Record<number, string> = {
  1: "#EEE", // Gray/white
  2: "#1CE400", // Bright green
  3: "#1CE400", // Bright green
  4: "#FFC800", // Yellow
  5: "#FFC800", // Yellow
  6: "#FFC800", // Yellow
  7: "#FF6309", // Orange
  8: "#FF6309", // Orange
  9: "#FE1F00", // Red
  10: "#FE1F00", // Red
};

export default function PlayerCard({ player }: PlayerCardProps) {
  const cs2Game = player.games?.cs2 || player.games?.csgo;
  const skillLevel = cs2Game?.skill_level || 0;
  const skillColor = skillLevelColors[skillLevel] || "#888";

  return (
    <Card
      sx={{
        width: 320,
        minWidth: 320,
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
        borderRadius: 2,
        border: `2px solid ${skillColor}`,
        boxShadow: `0 4px 20px ${skillColor}40`,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <Avatar
            src={player.avatar}
            alt={player.nickname}
            sx={{
              width: 56,
              height: 56,
              border: `2px solid ${skillColor}`,
            }}
          >
            {player.nickname?.charAt(0).toUpperCase()}
          </Avatar>

          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              {player.nickname}
            </Typography>
            <Stack direction="row" spacing={0.5} mt={0.5}>
              <Chip
                label={player.country?.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: "#2d2d44",
                  color: "white",
                  height: 20,
                  fontSize: 11,
                }}
              />
              {player.membership_type && (
                <Chip
                  label={player.membership_type}
                  size="small"
                  color={
                    player.membership_type === "premium" ? "warning" : "default"
                  }
                  sx={{ textTransform: "capitalize", height: 20, fontSize: 11 }}
                />
              )}
            </Stack>
          </Box>
        </Stack>

        {cs2Game && (
          <Stack direction="row" spacing={1.5} mb={1.5}>
            <Box
              sx={{
                flex: 1,
                bgcolor: "#2d2d44",
                borderRadius: 1.5,
                p: 1.5,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" color="grey.400" fontSize={10}>
                SKILL LEVEL
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: skillColor }}
              >
                {cs2Game.skill_level}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                bgcolor: "#2d2d44",
                borderRadius: 1.5,
                p: 1.5,
                textAlign: "center",
              }}
            >
              <Typography variant="caption" color="grey.400" fontSize={10}>
                ELO
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: skillColor }}
              >
                {cs2Game.faceit_elo}
              </Typography>
            </Box>
          </Stack>
        )}

        <Link
          href={player.faceit_url?.replace("{lang}", "en")}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#FF5500",
            fontSize: 14,
          }}
        >
          View on Faceit →
        </Link>
      </CardContent>
    </Card>
  );
}
