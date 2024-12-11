import Nav from "../layout/Nav";
import Habits from "../components/habits/Habits";
import HabitsForm from "../components/habits/HabitsForm";
import HabitsSettings from "../components/habits/HabitsSettings";
import { useHabitContext } from "../context/habitContext";
import { AnimatePresence } from "motion/react";

export default function HabitsPage() {
  const { showAddHabits } = useHabitContext();
  return (
    <>
      <AnimatePresence>
        <Nav />

        <section className="flex flex-col items-center">
          <h1 className="text-[40px] font-[700] mt-[15px]">Habits</h1>
          <HabitsSettings />
        </section>
        <section className="grid grid-cols-4 w-[1240px] mx-auto mt-[75px]">
          <Habits />
        </section>

        {showAddHabits && <HabitsForm />}
      </AnimatePresence>
    </>
  );
}
