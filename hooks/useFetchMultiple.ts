"use client";

import { useState, useEffect } from "react";

interface FetchResult<T> {
  id: string;
  data: T | null;
  error: string | null;
}

interface UseFetchMultipleResult<T> {
  results: FetchResult<T>[];
  data: T[];
  loading: boolean;
  errors: { id: string; error: string }[];
  refetch: () => void;
}

export function useFetchMultiple<T>(
  ids: string[],
  buildUrl: (id: string) => string,
): UseFetchMultipleResult<T> {
  const [results, setResults] = useState<FetchResult<T>[]>([]);
  const [loading, setLoading] = useState(false);

  const idsKey = ids.join(",");

  const fetchData = async () => {
    if (ids.length === 0) return;

    setLoading(true);

    const settledResults = await Promise.allSettled(
      ids.map(async (id) => {
        const response = await fetch(buildUrl(id));
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Failed to fetch ${id}`);
        }

        return { id, data: result as T };
      }),
    );

    const fetchResults: FetchResult<T>[] = settledResults.map(
      (result, index) => {
        if (result.status === "fulfilled") {
          return {
            id: result.value.id,
            data: result.value.data,
            error: null,
          };
        } else {
          return {
            id: ids[index],
            data: null,
            error: result.reason?.message || "Failed to fetch",
          };
        }
      },
    );

    setResults(fetchResults);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [idsKey]);

  // Convenience getters
  const data = results.filter((r) => r.data !== null).map((r) => r.data as T);
  const errors = results
    .filter((r) => r.error !== null)
    .map((r) => ({ id: r.id, error: r.error as string }));

  return { results, data, loading, errors, refetch: fetchData };
}
