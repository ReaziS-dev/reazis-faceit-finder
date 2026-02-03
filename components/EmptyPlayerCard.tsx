"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

interface EmptyPlayerCardProps {
  id: string;
  error: string;
}

export default function EmptyPlayerCard({ id, error }: EmptyPlayerCardProps) {
  return (
    <Card
      sx={{
        width: 320,
        minWidth: 320,
        background: "linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%)",
        borderRadius: 2,
        border: "2px solid #444",
        opacity: 0.7,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#3a3a4a",
              border: "2px solid #555",
            }}
          >
            ?
          </Avatar>

          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight="bold" color="grey.500">
              Player Not Found
            </Typography>
            <Typography
              variant="caption"
              color="grey.600"
              sx={{ wordBreak: "break-all" }}
            >
              ID: {id}
            </Typography>
          </Box>
        </Stack>

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
            <Typography variant="caption" color="grey.600" fontSize={10}>
              SKILL LEVEL
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="grey.600">
              —
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
            <Typography variant="caption" color="grey.600" fontSize={10}>
              ELO
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="grey.600">
              —
            </Typography>
          </Box>
        </Stack>

        <Typography variant="caption" color="error.main">
          {error}
        </Typography>
      </CardContent>
    </Card>
  );
}
