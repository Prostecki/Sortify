import { FaCircle, FaRedo } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import TodoFiltering from "./TodoFiltering";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import TodoDetail from "./TodoDetail";
import { useLocalStorage } from "../../hooks/useStorage";
import { useUserContext } from "../../context/UserContext";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

export default function TodoList({ tasks, status, deleteTask, setTasks }) {
  const [allTasksFiltered, setAllTasksFiltered] = useState(tasks);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { getItemL, setItemL } = useLocalStorage();
  const { activeUser } = useUserContext();
  const allUsers = getItemL("users", []);

  const findUser = useMemo(
    () => allUsers.findIndex((user) => user.username === activeUser?.username),
    [allUsers, activeUser]
  );

  /* useEffect lösningen var jag tvungen och prompta för att få webbsidan att fungera. Utan den så måste man uppdatera sidan för att få allt att uppdatera. Med useEffect läggs alla tasken till samt håller sig uppdaterad med filteringen. Notering till mig själv */

  useEffect(() => {
    setAllTasksFiltered(tasks);
  }, [tasks]);

  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleEditing = (editedTask) => {
    const updatedTasks = allTasksFiltered.map((task) =>
      task.id === editedTask.id ? editedTask : task
    );

    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, tasks: updatedTasks } : user
    );

    setAllTasksFiltered(updatedTasks);
    setTasks(updatedTasks);
    setSelectedTask(editedTask);
    setItemL("users", updatedUsers);
  };

  return (
    <div className="all-tasks-container">
      <div className="flex justify-between">
        <div className="filtering-container-2">
          <TodoFiltering tasks={tasks} filtersort={setAllTasksFiltered} />
        </div>
        <div className="status-container">
          <h1 className="flex gap-1 items-center text-sm font-semibold drop-shadow-sm">
            DONE <FaCircle size={20} color="lime" />
          </h1>
          <h1 className="flex gap-1 items-center text-sm font-semibold drop-shadow-sm">
            TO DO <FaCircle size={20} color="gray" />
          </h1>
        </div>
      </div>
      <AnimatePresence>
        {allTasksFiltered.length === 0 ? (
          <div className="text-center mt-10 text-gray-500 font-medium drop-shadow-sm text-lg">
            No available tasks found
          </div>
        ) : (
          allTasksFiltered.map((task) => (
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
              initial={{ opacity: 0, x: -1500 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              exit={{ x: 1500, transition: { duration: 0.2 }, opacity: 0 }}
              className={`each-task-container ${
                task.status ? "completed" : "incomplete"
              }`}
              key={task.id}
            >
              <button className="detailsbtn" onClick={() => openModal(task)}>
                Details <CgDetailsMore />
              </button>
              <div>
                <h1
                  className="text-xl font-medium drop-shadow-sm
"
                >
                  Activity
                </h1>
                <h1> {task.title} </h1>
              </div>

              <div>
                <h1 className="text-xl font-medium drop-shadow-sm">Due</h1>
                <h1>{task.deadline}</h1>
              </div>
              <div>
                <h1 className="text-xl font-medium drop-shadow-sm">
                  Estimation
                </h1>
                <h1>{task.estimation} min </h1>
              </div>
              <div>
                <h1 className="text-xl font-medium drop-shadow-sm">
                  {" "}
                  Category{" "}
                </h1>

                <h1>{task.category}</h1>
              </div>

              <button onClick={() => status(task.id)}>
                {task.status ? (
                  <FaRedo size={20} />
                ) : (
                  <IoIosCheckmarkCircle size={25} />
                )}
              </button>

              <button onClick={() => deleteTask(task.id)}>
                <MdDelete
                  size={25}
                  color={task.status ? "white" : "lightblue"}
                />
              </button>
            </motion.div>
          ))
        )}
      </AnimatePresence>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <IoIosCloseCircle size={30} />
            </button>
            <TodoDetail task={selectedTask} editing={handleEditing} />
          </div>
        </div>
      )}
    </div>
  );
}
