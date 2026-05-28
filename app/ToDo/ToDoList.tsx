"use client";

import { useState } from "react";
import Pagination from "./Pagination";
import ToDo from "./ToDo";
import { ToDoType } from "./ToDoTypes";
import "./style.scss";
import { useToast } from "../ToastNotification/Toast";

export default function ToDoList({
  defaultToDos,
}: {
  defaultToDos: ToDoType[];
}) {
  const [todos, setTodos] = useState<ToDoType[]>(defaultToDos);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  if (!defaultToDos) {
    return <div>Loading...</div>;
  }

  const handlePageChange = async (page: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newToDos = await fetch(`/api/todos?page=${page}`);

      if (!newToDos.ok) {
        throw new Error(`Failed to fetch to-dos for page ${page}`);
      }

      const newToDosJson = await newToDos.json();
      if (!newToDosJson || newToDosJson.length === 0) {
        throw new Error("No more to-dos available");
      }

      setTodos(newToDosJson.items ?? newToDosJson);
      setCurrentPage(page);
    } catch (error) {
      setCurrentPage((prev) => prev);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ul className="to-do-list">
        {todos.map((todo) => (
          <ToDo key={todo.id} todo={todo} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
