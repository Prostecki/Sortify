import { useHabitContext } from "../../context/HabitContext";
import { motion, AnimatePresence } from "motion/react";
import { RxCross2 } from "react-icons/rx";
import { RiResetLeftLine } from "react-icons/ri";
import { IoReorderThreeSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { LiaCalendarDaySolid } from "react-icons/lia";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";

export default function Habits() {
  const { habits, deleteHabit, handleAmount, showAddHabits, edit } =
    useHabitContext();
  return (
    <>
      <AnimatePresence>
        {habits.map((h, index) => (
          <motion.section
            initial={{ scale: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`bg-[white] ${
              showAddHabits ? "-z-10" : ""
            } text-black rounded-[15px] w-[310px] h-[285px] flex justify-end`}
            key={index}
          >
            <AnimatePresence>
              {edit && (
                <motion.figure
                  initial={{ y: -40, scale: 0.7, opacity: 0.5 }}
                  animate={{
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      mass: 1,
                    },
                  }}
                  exit={{ scale: 0.5, opacity: 0, x: 40 }}
                  className="flex items-center"
                >
                  <IoReorderThreeSharp
                    size={35}
                    className="mr-[4px] mb-[40px] "
                    style={{ color: "rgba(0, 0, 0, 0.9)" }}
                  />
                </motion.figure>
              )}
            </AnimatePresence>
            <section className=" items-center flex flex-col leading-none">
              <section className="flex flex-col items-center z-10 w-[250px] h-[250px] shadow-habitShadow bg-habitWhite rounded-[6px]">
                <section
                  className={`flex justify-center ${
                    h.priority === "Low"
                      ? "bg-[#2EB712]"
                      : h.priority === "Medium"
                      ? "bg-[#ED9D4E]"
                      : "bg-[#E35F53]"
                  } w-[200px] h-fit mt-[25px] rounded-[6px] shadow-habitShadow break-words`}
                >
                  <h1 className="text-[20px] mx-3 w-[200px] p-[8px]">
                    {h.title}
                  </h1>
                </section>
                <section className="flex ml-[50px] items-end h-full w-full mb-[45px]">
                  <h2 className="flex text-[20px]">
                    Completed&nbsp;&nbsp;&nbsp;
                    <BiMinus onClick={() => handleAmount(index, "decrement")} />
                    <span onClick={() => handleAmount(index, "reset")}>
                      {h.amount}
                    </span>
                    <BiPlus onClick={() => handleAmount(index, "increment")} />
                  </h2>
                </section>
                <hr className="my-1 border-t-1 border-gray-900 w-[200px]" />
                <section className="flex justify-center items-end h-[40px] w-full mb-[10px]">
                  <LiaCalendarDaySolid size={20} />
                  <p className="text-[16px] ml-[5px] mb-[2px]">
                    Created at {new Date(h.addedAt).toISOString().split("T")[0]}
                  </p>
                </section>
              </section>
              <AnimatePresence>
                {edit && (
                  <motion.figure
                    initial={{ zIndex: -20, y: -40, scale: 0.5, opacity: 1 }}
                    animate={{ zIndex: 1, y: 0, scale: 1 }}
                    exit={{ scale: 0.5, opacity: 0, y: -40 }}
                    style={{ color: "rgba(0, 0, 0, 0.9)" }}
                    className="w-[50px] h-[25px] mt-[10px] flex justify-center bg-habitWhite shadow-habitShadow rounded-[4px]"
                  >
                    <IoMdClose onClick={() => deleteHabit(index)} size={25} />
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
