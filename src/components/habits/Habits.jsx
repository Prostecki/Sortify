import { useHabitContext } from "../../context/habitContext";
import { useThemeContext } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";

import { IoMdClose } from "react-icons/io";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";

export default function Habits() {
  const { habits, deleteHabit, handleAmount, showAddHabits, edit } =
    useHabitContext();
  const { darkMode } = useThemeContext();
  return (
    <>
      <AnimatePresence>
        {habits.map((h, index) => (
          <motion.section
            initial={{ scale: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={` ${showAddHabits ? "-z-10" : ""} ${
              darkMode && "text-white"
            } w-[250px] h-[285px] flex justify-center`}
            key={index}
          >
            <section className=" items-center flex flex-col leading-none">
              <section
                className={`${
                  darkMode ? "bg-[rgb(20,20,20)]" : "bg-habitWhite"
                } flex flex-col items-center z-10 w-[250px] h-[250px] shadow-habitShadow  rounded-[6px]`}
              >
                <section
                  className={`flex justify-center ${
                    h.priority === "Low"
                      ? "bg-[#2EB712]"
                      : h.priority === "Medium"
                      ? "bg-[#ED9D4E]"
                      : "bg-[#E35F53]"
                  } w-[200px] h-fit mt-[25px] rounded-[6px] shadow-habitShadow break-words text-black`}
                >
                  <h1 className="text-[20px] mx-3 w-[200px] p-[8px]">
                    {h.title}
                  </h1>
                </section>
                <section className="flex ml-[50px] items-end h-full w-full my-1">
                  <h2 className="flex text-[20px]">
                    Completed&nbsp;&nbsp;&nbsp;
                    <BiMinus
                      onClick={() => handleAmount(index, "decrement")}
                      className="cursor-pointer"
                    />
                    <span
                      onClick={() => handleAmount(index, "reset")}
                      className="cursor-pointer"
                    >
                      {h.amount}
                    </span>
                    <BiPlus
                      onClick={() => handleAmount(index, "increment")}
                      className="cursor-pointer"
                    />
                  </h2>
                </section>
                <hr
                  className={`${
                    darkMode ? "border-white-900" : "border-gray-900"
                  } my-3 border-t-1  w-[200px]`}
                />
                <section className="flex ml-[50px] items-end h-[40px] w-full mb-[10px]">
                  <LiaCalendarDaySolid size={20} />
                  <p className="text-[16px] ml-[5px] mb-[2px]">
                    Created at {new Date(h.addedAt).toISOString().split("T")[0]}
                  </p>
                </section>
              </section>
              <AnimatePresence>
                {edit && (
                  <motion.figure
                    onClick={() => deleteHabit(index)}
                    initial={{ zIndex: -20, y: -40, scale: 0.5, opacity: 1 }}
                    animate={{ zIndex: 1, y: 0, scale: 1 }}
                    exit={{ scale: 0.5, opacity: 0, y: -40 }}
                    style={{ color: "rgba(0, 0, 0, 0.9)" }}
                    className={`${
                      darkMode ? "bg-[rgb(20,20,20)]" : "bg-habitWhite"
                    } w-[50px] h-[25px] mt-[10px] flex justify-center cursor-pointer  shadow-habitShadow rounded-[4px]`}
                  >
                    <IoMdClose color={darkMode && "white"} size={25} />
                  </motion.figure>
                )}
              </AnimatePresence>
            </section>
          </motion.section>
        ))}
      </AnimatePresence>
    </>
  );
}
