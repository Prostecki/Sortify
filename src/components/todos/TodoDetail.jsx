import { useState } from "react";
import { MdEditNote } from "react-icons/md";
import toast from "react-hot-toast";

export default function TodoDetail({ task, editing }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    editing(editedTask);
    toast.success("Changes saved! 🎉", {
      duration: 2000,
      position: "top-center",
      style: {
        background: "rgb(74, 222, 128)",
        color: "white",
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="task-detail">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>

      {isEditing ? (
        <div className="edit-form">
          <div className="detail-item">
            <h3 className="font-semibold">Task:</h3>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="edit-input"
              placeholder="Enter your task"
              maxLength={20}
            />
          </div>

          <div className="detail-item">
            <h3 className="font-semibold">Description:</h3>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className="edit-input"
              maxLength={150}
              placeholder="Enter a description"
            />
          </div>

          <div className="detail-item">
            <h3 className="font-semibold">Category:</h3>
            <select
              name="category"
              value={editedTask.category}
              onChange={handleChange}
              className="edit-input"
            >
              <option value="Health">Health</option>
              <option value="Household">Household</option>
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Social">Social</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div className="detail-item">
            <h3 className="font-semibold">Due:</h3>
            <input
              type="date"
              name="deadline"
              value={editedTask.deadline}
              onChange={handleChange}
              className="edit-input"
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>

          <div className="detail-item">
            <h3 className="font-semibold">Time to complete:</h3>
            <input
              type="number"
              name="estimation"
              value={editedTask.estimation}
              onChange={handleChange}
              className="edit-input"
              min={0}
              max={1440}
              placeholder="minutes"
            />
          </div>

          <div className="button-group">
            <button onClick={saveChanges} className="save-btn">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="detail-item">
            <h3 className="font-semibold">Title:</h3>
            <p>{task.title}</p>
          </div>
          <hr />
          <div className="detail-item">
            <h3 className="font-semibold">Description:</h3>
            <p>{task.description}</p>
          </div>
          <hr />
          <div className="detail-item">
            <h3 className="font-semibold">Category:</h3>
            <p>{task.category}</p>
          </div>
          <hr />
          <div className="detail-item">
            <h3 className="font-semibold">Due Date:</h3>
            <p>{task.deadline}</p>
          </div>
          <hr />
          <div className="detail-item">
            <h3 className="font-semibold">Estimated Time:</h3>
            <p>{task.estimation} minutes</p>
          </div>
          <hr />
          <div className="detail-item">
            <h3 className="font-semibold">Status:</h3>
            <p>{task.status ? "Completed 🎉" : "In Progress 🚀"}</p>
          </div>
          <br />
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit <MdEditNote size={30} />
          </button>
        </>
      )}
    </div>
  );
}
