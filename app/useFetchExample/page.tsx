"use client";

import ToDoList from "./ToDoList";
import { useFetch } from "./useFetchExample";

export default function UseFetchExample() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos",
  );

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <ToDoList ToDos={data}></ToDoList>;
}
