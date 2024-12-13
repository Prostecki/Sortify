import Nav from "../layout/Nav";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";

export default function TasksPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  function showForm() {
    setIsVisible(!isVisible);
  }

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsVisible(false);
  };

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
          <TodoForm showForm={showForm} addTask={addTask} />
        )}
        <TodoList tasks={tasks} />
      </div>
    </>
  );
}
