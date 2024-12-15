import Nav from "../layout/Nav";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";
import { useLocalStorage } from "../hooks/useStorage";

export default function TasksPage() {
  const { getItemL, setItemL } = useLocalStorage();
  const [tasks, setTasks] = useState(getItemL("tasks", []));
  const [isVisible, setIsVisible] = useState(false);

  const updatedTasks = (newTask) => {
    const updatedTasksArray = [...tasks, newTask];
    setTasks(updatedTasksArray);
    setItemL("tasks", updatedTasksArray);
    setIsVisible(false);
  };

  function showForm() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      <Nav />
      <div className="task-container">
        <h1 className="task-title">
          Tasks <FaTasks size={40} />
        </h1>
        <p className="task-description">
          Plan, track, and manage your
          <span className="text-sky-500"> activities. </span>
        </p>
        {!isVisible ? (
          <button onClick={showForm} className="addtaskbtn">
            ADD TASK
            <IoMdAddCircle className="ml-1" size={21} />
          </button>
        ) : (
          <TodoForm showForm={showForm} updatedTasks={updatedTasks} />
        )}
        <TodoList tasks={tasks} />
      </div>
    </>
  );
}
