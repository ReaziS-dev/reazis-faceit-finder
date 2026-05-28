import { ToDoType } from "./ToDoTypes";

export default function ToDo({ todo }: { todo: ToDoType }) {
  return (
    <li className="to-do">
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.title}</span>
    </li>
  );
}
