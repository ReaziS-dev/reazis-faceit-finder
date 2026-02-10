import { type ToDo } from "./useFetchExample";

const ToDoList = ({ ToDos }: { ToDos: ToDo[] }) => {
  return (
    <ul>
      {ToDos.map((toDo) => {
        return <li key={toDo.id}>{toDo.title}</li>;
      })}
    </ul>
  );
};

export default ToDoList;
