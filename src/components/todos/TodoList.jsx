import { SlOptions } from "react-icons/sl";
import { FaCircle } from "react-icons/fa";

export default function TodoList({ tasks }) {
  return (
    <div className="all-tasks-container">
      <div className="flex gap-1 justify-end mr-3">
        <FaCircle size={20} color="lime" />
        <FaCircle size={20} color="gray" />
      </div>
      {tasks.map((task) => (
        <div className="each-task-container" key={task.id}>
          <div>
            <h1 className="text-xl font-medium drop-shadow-sm">Activity</h1>
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

          <button>
            <SlOptions size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
