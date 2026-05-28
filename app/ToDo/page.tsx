import ToDoList from "./ToDoList";
import { type ToDoType } from "./ToDoTypes";

export default async function ToDo() {
  const defaultToDos: ToDoType[] = await (
    await fetch("http://localhost:3000/api/todos")
  ).json();

  return <ToDoList defaultToDos={defaultToDos} />;
}
