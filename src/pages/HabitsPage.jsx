import Nav from "../layout/Nav";
import Habits from "../components/habits/Habits";
import HabitsForm from "../components/habits/HabitsForm";
import {
  HabitsFilter,
  HabitsSort,
  HabitsSortDirection,
} from "../components/habits/HabitsSortFilter";

import { HabitsNew, HabitsEdit } from "../components/habits/HabitsNewEdit";
import { useHabitContext } from "../context/HabitContext";
import { useThemeContext } from "../context/ThemeContext";
import { AnimatePresence } from "motion/react";

import { CgDarkMode } from "react-icons/cg";

export default function HabitsPage() {
  const { showAddHabits } = useHabitContext();
  const { handleDarkMode, darkMode } = useThemeContext();
  return (
    <>
      <AnimatePresence>
        <Nav key="nav" />
        <h1
          className={`${
            darkMode && "text-white"
          } text-[3rem] text-center font-[700] mt-[40px]`}
        >
          Habits
        </h1>
        <CgDarkMode
          color={darkMode && "white"}
          onClick={handleDarkMode}
          size={40}
          className="mx-auto"
        />
        <section className=" flex flex-wrap justify-center gap-[75px] mt-[50px]">
          <section className="flex flex-wrap gap-[20px] mx-10">
            <HabitsNew key="habits-add" />
            <HabitsEdit key="habits-edit" />
          </section>
          <section className="flex flex-wrap gap-[20px] mx-10">
            <HabitsSortDirection key="habits-sort-direction" />
            <HabitsSort key="habits-sort" />
            <HabitsFilter key="habits-filter" />
          </section>
        </section>
        <section className="flex flex-wrap max-w-[1150px] mx-auto gap-[50px] my-[100px]">
          <Habits key="habits" />
        </section>
        {showAddHabits && <HabitsForm key="habits-form" />}
      </AnimatePresence>
    </>
  );
}
