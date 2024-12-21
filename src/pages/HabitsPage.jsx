import Nav from "../layout/Nav";
import Habits from "../components/habits/Habits";
import HabitsForm from "../components/habits/HabitsForm";
import {
  HabitsFilter,
  HabitsSort,
} from "../components/habits/HabitsSortFilter";

import { HabitsNew, HabitsEdit } from "../components/habits/HabitsNewEdit";
import { useHabitContext } from "../context/habitContext";
import { useThemeContext } from "../context/ThemeContext";
import { AnimatePresence } from "motion/react";

import { CgDarkMode } from "react-icons/cg";

export default function HabitsPage() {
  const { showAddHabits, habits } = useHabitContext();
  const { handleDarkMode, darkMode } = useThemeContext();
  return (
    <>
      <AnimatePresence>
        <Nav />
        <h1
          className={`${
            darkMode && "text-white"
          } w-fit border-b-[6px] mx-auto border-[#ffdc65]  text-[3rem] text-center font-[700] mt-[40px]`}
        >
          Habits
        </h1>
        <CgDarkMode
          color={darkMode ? "white" : "black"}
          onClick={handleDarkMode}
          size={40}
          className="mx-auto mt-[20px]"
        />
        <section className=" flex flex-wrap justify-center gap-[75px] mt-[50px]">
          <section className="flex flex-wrap gap-[20px] mx-10">
            <HabitsNew />
            <HabitsEdit />
          </section>
          <section className="flex flex-wrap gap-[20px] mx-10">
            <HabitsSort />
            <HabitsFilter />
          </section>
        </section>
        <section className="flex flex-wrap justify-center max-w-[1450px]  mx-auto gap-[50px] my-[100px]">
          {habits.length !== 0 ? (
            <Habits />
          ) : (
            <p
              className={`${
                darkMode && "text-white"
              } text-[20px] mx-auto mt-[-50px]`}
            >
              You have no habbits, add one by clicking new habit.
            </p>
          )}
        </section>
        <AnimatePresence>{showAddHabits && <HabitsForm />}</AnimatePresence>
      </AnimatePresence>
    </>
  );
}
