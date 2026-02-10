import ToDoList from "./ToDoList";

const PARAMS = {
  initialStart: 0,
  initialLimit: 10,
};
export default async function InifiniteLoad() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_start=${PARAMS.initialStart}&_limit=${PARAMS.initialLimit}`,
  );

  const data = await response.json();
  if (!data) {
    return <div>Loading...</div>;
  }

  return <ToDoList initialToDos={data} params={PARAMS} />;
}
