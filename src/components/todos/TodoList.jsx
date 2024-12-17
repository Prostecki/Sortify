import { SlOptions } from "react-icons/sl";
import { FaCircle } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import TodoFiltering from "./TodoFiltering";
import { MdDelete } from "react-icons/md";

export default function TodoList({ tasks, status, deleteTask }) {
  return (
    <div className="all-tasks-container">
      <div className="flex justify-between">
        <div className="filtering-container-2">
          <TodoFiltering />
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
      {tasks.map((task) => (
        <div
          className={`each-task-container ${
            task.status ? "completed" : "incomplete"
          }`}
          key={task.id}
        >
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
            <h1 className="text-xl font-medium drop-shadow-sm">Estimation</h1>
            <h1>{task.estimation} min </h1>
          </div>
          <div>
            <h1 className="text-xl font-medium drop-shadow-sm"> Category </h1>

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
            <MdDelete size={25} color={task.status ? "white" : "lightblue"} />
          </button>
        </div>
      ))}
    </div>
  );
}
