import Nav from "../layout/Nav";
import { useState, useMemo, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";
import { useLocalStorage } from "../hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence } from "motion/react";
import { useUserContext } from "../context/UserContext";

export default function TasksPage() {
  const { activeUser } = useUserContext();
  const { getItemL, setItemL } = useLocalStorage();
  const [tasks, setTasks] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const allUsers = getItemL("users", []);

  const findUser = useMemo(
    () => allUsers.findIndex((user) => user.username === activeUser?.username),
    [allUsers, activeUser]
  );

  useEffect(() => {
    if (activeUser && findUser !== -1) {
      setTasks(allUsers[findUser].tasks || []);
    }
  }, [activeUser]);

  const updatedTasks = (newTask) => {
    setIsVisible(false);

    const updatedUser = {
      ...allUsers[findUser],
      tasks: [newTask, ...(allUsers[findUser].tasks || [])], // newTask först för att alla Tasks ska hamna överst. Detta behövs i Dashboarden ( Top 3 senaste Tasks ).
    };

    const updatedUsers = [
      ...allUsers.slice(0, findUser),
      updatedUser,
      ...allUsers.slice(findUser + 1),
    ];
    setTasks(updatedUser.tasks);

    setItemL("users", updatedUsers);

    toast("Task is added 📦 ", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "rgb(59, 130, 246)",
        color: "white",
      },
    });
  };

  const statusCheck = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task.status) {
      toast.success("Task completed! 🎉", {
        duration: 2000,
        position: "top-center",
        style: {
          background: "rgb(74, 222, 128)",
          color: "white",
        },
      });
    }
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );

    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, tasks: updatedTasks } : user
    );
    setItemL("users", updatedUsers);
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, tasks: updatedTasks } : user
    );
    setItemL("users", updatedUsers);

    setTasks(updatedTasks);

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
        <AnimatePresence>
          {!isVisible ? (
            <button onClick={showForm} className="addtaskbtn">
              ADD TASK
              <IoMdAddCircle className="ml-1" size={21} />
            </button>
          ) : (
            <TodoForm showForm={showForm} updatedTasks={updatedTasks} />
          )}
        </AnimatePresence>
        <TodoList
          tasks={tasks}
          status={statusCheck}
          deleteTask={deleteTask}
          setTasks={setTasks}
        />
      </div>
    </>
  );
}
