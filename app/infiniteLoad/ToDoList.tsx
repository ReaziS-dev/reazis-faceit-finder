"use client";

import { type ToDo } from "../useFetchExample/useFetchExample";
import { InView } from "react-intersection-observer";

import "./style.scss";
import { useState } from "react";
const ToDoList = ({
  initialToDos,
  params,
}: {
  initialToDos: ToDo[];
  params: { initialStart: number; initialLimit: number };
}) => {
  const { initialStart, initialLimit } = params;
  const [start, setStart] = useState(initialStart);
  const [todos, setToDos] = useState<ToDo[]>(initialToDos);
  const [loading, setLoading] = useState(false);

  const fetchMore = async (start: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${initialLimit}`,
    );
    const data = await response.json();
    return data;
  };

  const handleInView = async (inView: boolean) => {
    if (!inView || loading) {
      return;
    }

    setLoading(true);
    const nextStart = start + initialLimit;

    const newToDos = await fetchMore(nextStart);
    if (!newToDos || newToDos.length === 0) {
      setLoading(false);
      return;
    }

    setStart(nextStart);
    setToDos((prev) => [...prev, ...newToDos]);
    setLoading(false);
  };

  return (
    <ul className="todo-list">
      {todos.map((toDo) => {
        return <li key={toDo.id}>{toDo.title}</li>;
      })}
      <InView onChange={handleInView}>
        <div className="hidden-loader">{loading && "Loading..."}</div>
      </InView>
    </ul>
  );
};

export default ToDoList;
