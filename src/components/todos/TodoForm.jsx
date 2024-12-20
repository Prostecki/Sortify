import { SiTask } from "react-icons/si";
import { LuBadgeInfo } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlinePlus, AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";
import { BiHide } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function TodoForm({ showForm, updatedTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [estimation, setEstimation] = useState("");

  function addTask(e) {
    e.preventDefault();
    updatedTasks({
      id: Date.now(),
      status: false,
      title,
      description,
      category,
      deadline,
      estimation,
    });
    setTitle("");
    setDescription("");
    setCategory("");
    setDeadline("");
    setEstimation("");
  }

  return (
    <>
      <AnimatePresence>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          exit={{ x: 100 }}
          onSubmit={addTask}
          className="all-task-inputs"
        >
          <div className="flex items-center">
            <SiTask size={25} color="gray" className="mr-2 drop-shadow-md" />
            <input
              type="text"
              name="title"
              className="task-input"
              required
              placeholder="Enter your task"
              maxLength={20}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <LuBadgeInfo
              size={25}
              color="gray"
              className="mr-2 drop-shadow-md"
            />
            <input
              type="textarea"
              name="description"
              maxLength={150}
              className="task-input"
              required
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <hr className="mt-3 drop-shadow-sm" />
          <h1 className="flex justify-center items-center text-xl font-semibold drop-shadow-md">
            Choose Category <MdOutlineCategory size={25} className="ml-1" />
          </h1>
          <select
            className="text-center uppercase font-semibold bg-gray-100 p-2 cursor-pointer drop-shadow-sm"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              ----- SELECT -----
            </option>
            <option value="Health">Health</option>
            <option value="Household">Household</option>
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Social">Social</option>
            <option value="Finance">Finance</option>
          </select>
          <hr className="mt-3 drop-shadow-sm" />
          <div className="flex items-center justify-center gap-10 ">
            <div className="">
              <h1 className="flex gap-2 items-center font-semibold text-2xl drop-shadow-sm">
                Deadline <BsCalendarCheck />
              </h1>
              <input
                type="date"
                name="deadline"
                min={new Date().toISOString().slice(0, 10)} // Tvungen och prompta detta.
                required
                className="deadline-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div>
              <h1 className="flex gap-1 items-center font-semibold text-2xl drop-shadow-sm ">
                Estimation <AiOutlineClockCircle />
              </h1>
              <input
                type="number"
                name="estimation"
                min="1"
                max="1440"
                placeholder="Enter minutes"
                className="minutes-input"
                required
                value={estimation}
                onChange={(e) => setEstimation(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="submittaskbtn">
            <AiOutlinePlus size={22} />
          </button>
          <button className="hidetaskbtn" onClick={showForm}>
            <BiHide size={25} color="white" />
          </button>
        </motion.form>
      </AnimatePresence>
    </>
  );
}
