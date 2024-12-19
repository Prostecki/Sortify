import { useHabitContext } from "../../context/habitContext";
import { useThemeContext } from "../../context/ThemeContext";
import { IoMdClose } from "react-icons/io";
import { VscDiffAdded } from "react-icons/vsc";
import { motion } from "motion/react";

export default function HabitsForm() {
  const { handlePriority, habitTitleRef, addHabit, handleShowAddHabits } =
    useHabitContext();
  const { darkMode } = useThemeContext();
  return (
    <>
      <section className="absolute inset-0 transition-all duration-200 bg-black/60 box-border flex justify-center items-center">
        <motion.section
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 10, opacity: 1 }}
          className={`${
            darkMode ? "bg-[rgb(20,20,20)]" : "bg-habitWhite"
          }  text-black flex flex-col w-[400px] h-[400px] items-center rounded-[6px] `}
        >
          <figure className="flex w-[100%] justify-end mt-[15px] mr-[15px]">
            <IoMdClose
              onClick={handleShowAddHabits}
              color={darkMode && "white"}
              size={40}
              className="cursor-pointer"
            />
          </figure>

          <input
            type="text"
            placeholder="Title"
            ref={habitTitleRef}
            maxLength={40}
            className={`${
              darkMode
                ? "bg-[rgb(30,30,30)] text-white"
                : "bg-[rgb(225,225,225)]"
            }  w-[85%] mb-[15px] mt-[10px] p-[10px] text-[25px] rounded-[6px] shadow-habitShadow`}
          />
          <h2
            className={`${
              darkMode && "text-white"
            } text-[25px] font-[500] mt-[30px]`}
          >
            Select priority
          </h2>
          <section className="flex gap-[20px] mt-[20px] ">
            <label>
              <input
                type="radio"
                name="priority"
                value="Low"
                onChange={handlePriority}
                className="hidden peer"
              />
              <p className="habit-priority w-[100px] h-[35px] text-[25px] flex justify-center items-center bg-[#2EB712] peer-checked:shadow-priorityLow rounded-[3px] shadow-habitShadow cursor-pointer">
                Low
              </p>
            </label>

            <label>
              <input
                type="radio"
                name="priority"
                value="Medium"
                onChange={handlePriority}
                className="hidden peer"
              />
              <p className="habit-priority w-[100px] h-[35px] text-[25px]  flex justify-center items-center bg-[#ED9D4E] peer-checked:shadow-priorityMedium rounded-[3px] shadow-habitShadow cursor-pointer">
                Medium
              </p>
            </label>

            <label>
              <input
                type="radio"
                name="priority"
                value="High"
                onChange={handlePriority}
                className="hidden peer"
              />
              <p className="habit-priority   w-[100px] h-[35px] text-[25px]  flex justify-center items-center bg-[rgb(227,95,83)] peer-checked:shadow-priorityHigh rounded-[3px] shadow-habitShadow cursor-pointer ">
                High
              </p>
            </label>
          </section>

          <button
            className="w-[180px] h-[50px] flex justify-center items-center bg-[rgb(133,62,244)] text-white text-[25px] rounded-[6px] mt-[70px] shadow-habitShadow"
            onClick={addHabit}
          >
            <p className="mr-[10px]">Add Habit</p>
            <VscDiffAdded size={27} />
          </button>
        </motion.section>
      </section>
    </>
  );
}
