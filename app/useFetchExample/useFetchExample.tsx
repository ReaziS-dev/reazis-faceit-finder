import { useCallback, useEffect, useState } from "react";

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export const useFetch = (url: string) => {
  const [todos, setTodos] = useState<ToDo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = useCallback(async () => {
    try {
      setLoading(true);
      const data = await (await fetch(url)).json();
      setTodos(data);
    } catch (err) {
      if (!(err instanceof Error)) {
        setError("Non Handled Error");
        return;
      }

      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data: todos, loading, error };
};
