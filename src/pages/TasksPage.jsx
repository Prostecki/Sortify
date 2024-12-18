import Nav from "../layout/Nav";
import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";
import { useLocalStorage } from "../hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";

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

  const statusCheck = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task.status) {
      toast.success("Task completed! 🎉", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#4ade80",
          color: "white",
        },
      });
    }
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
    setItemL("tasks", updatedTasks);
  };

  const deleteTask = (id) => {
    const allTasks = tasks.filter((task) => task.id !== id);
    setTasks(allTasks);
    setItemL("tasks", allTasks);
    toast("Task deleted! 🗑️", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "red",
        color: "white",
      },
    });
  };

  function showForm() {
    setIsVisible(!isVisible);
  }

  return (
    <>
      <Nav />
      <div className="task-container">
        <Toaster />
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
        <TodoList tasks={tasks} status={statusCheck} deleteTask={deleteTask} />
      </div>
    </>
  );
}
