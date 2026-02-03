"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        // Extract IDs: split by commas, newlines, spaces, or semicolons
        const ids = text
          .split(/[,\n\r\s;]+/)
          .map((id) => id.trim())
          .filter((id) => id.length > 0);

        if (ids.length === 0) {
          setError("No valid IDs found in file");
          return;
        }

        // Redirect to /find with IDs as query parameter
        const idsParam = encodeURIComponent(ids.join(","));
        router.push(`/find?ids=${idsParam}`);
      } catch {
        setError("Failed to read file");
      }
    },
    [router],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      setError(null);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile],
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0a0a0f",
        p: 4,
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="white" mb={2}>
        Faceit Finder
      </Typography>
      <Typography color="grey.400" mb={4}>
        Drop a file with Steam IDs to find players
      </Typography>

      <Paper
        component="label"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          width: 400,
          height: 250,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed",
          borderColor: isDragging ? "#FF5500" : "#444",
          borderRadius: 3,
          bgcolor: isDragging ? "rgba(255, 85, 0, 0.1)" : "#1a1a2e",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "#FF5500",
            bgcolor: "rgba(255, 85, 0, 0.05)",
          },
        }}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        Drop file here
        <Typography
          color={isDragging ? "#FF5500" : "grey.400"}
          fontWeight="medium"
        >
          {isDragging ? "Drop file here" : "Drag & drop file here"}
        </Typography>
        <Typography color="grey.600" fontSize={14} mt={1}>
          or click to select (.txt, .csv)
        </Typography>
      </Paper>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Typography color="grey.600" fontSize={12} mt={4} textAlign="center">
        File should contain Steam IDs separated by commas, newlines, or spaces
        <br />
        Example: 76561198046024225, 76561199821943244
      </Typography>
    </Box>
  );
}
