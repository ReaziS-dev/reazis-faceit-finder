"use client";

import { Suspense, useEffect, useState } from "react";
import { ToDoType } from "../ToDo/ToDoTypes";
import Loader from "./loading_custom";

const requestToDosWithDelay = async () => {
  await new Promise((r) => setTimeout(r, 5000));

  const response = await fetch("http://localhost:3000/api/todos");
  return response.json();
};
export async function RequestToDos() {
  const todos: ToDoType[] = await requestToDosWithDelay();

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </div>
  );
}

export function DrawToDos() {
  return (
    <Suspense fallback={<Loader />}>
      <RequestToDos />
    </Suspense>
  );
}
