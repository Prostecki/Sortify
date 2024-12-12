import Nav from "../layout/Nav";
import { FaTasks } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { SiTask } from "react-icons/si";
import { LuBadgeInfo } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";

export default function TasksPage() {
  const [isVisible, setIsVisible] = useState(false);

  function handleVisibility() {
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
          Plan, track, and manage your{" "}
          <span className="text-sky-500"> activities. </span>
        </p>
        {!isVisible ? (
          <button onClick={handleVisibility} className="addtaskbtn">
            ADD TASK
            <IoMdAddCircle className="ml-1" size={21} />
          </button>
        ) : (
          <form className="all-task-inputs">
            <div className="flex items-center">
              <SiTask size={25} color="gray" className="mr-2 drop-shadow-md" />
              <input
                type="text"
                className="task-input"
                required
                placeholder="Enter your task"
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
                className="task-input"
                required
                placeholder="Enter a description "
              />
            </div>
            <hr className="mt-3 drop-shadow-sm" />
            <h1 className="flex justify-center items-center text-xl font-semibold drop-shadow-md">
              Choose Category <MdOutlineCategory size={25} className="ml-1" />
            </h1>
            <select
              className="text-center uppercase font-semibold bg-gray-100 p-2 cursor-pointer drop-shadow-sm"
              name="categories"
              id="categories"
              defaultValue={0}
              required
            >
              <option value="0" disabled>
                ----- SELECT -----
              </option>
              <option value="1">Health & Wellness</option>
              <option value="2">Household </option>
              <option value="3">Work</option>
              <option value="4">Education</option>
              <option value="5">Pleasure</option>
              <option value="6">Social</option>
              <option value="7">Finance</option>
            </select>
            <hr className="mt-3 drop-shadow-sm" />
            <div className="flex items-center justify-center gap-10 ">
              <div className="">
                <h1 className="flex gap-2 items-center font-semibold text-2xl drop-shadow-sm">
                  {" "}
                  Deadline <BsCalendarCheck />
                </h1>
                <input
                  type="date"
                  min="2024-12-01"
                  required
                  className="deadline-input"
                />
              </div>

              <div>
                <h1 className="flex gap-1 items-center font-semibold text-2xl drop-shadow-sm ">
                  {" "}
                  Estimation <AiOutlineClockCircle />
                </h1>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="Enter minutes"
                  className="minutes-input"
                  required
                />
              </div>
            </div>
            <button type="submit" className="submittaskbtn">
              <AiOutlinePlus size={22} />
            </button>
          </form>
        )}
      </div>
    </>
  );
}
