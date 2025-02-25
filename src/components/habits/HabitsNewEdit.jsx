import { MdOutlinePlaylistAdd, MdEditNote } from "react-icons/md";
import { useHabitContext } from "../../context/HabitContext";
import { useThemeContext } from "../../context/ThemeContext";

export function HabitsNew() {
  const { handleShowAddHabits } = useHabitContext();
  const { darkMode } = useThemeContext();

  return (
    <section
      onClick={handleShowAddHabits}
      className={`${
        darkMode ? "bg-[rgb(20,20,20)] text-white" : "bg-habitWhite"
      } flex items-center text-[2rem] justify-center w-[220px] h-[55px] rounded-[6px] shadow-habitShadow cursor-pointer`}
    >
      <p>New Habit</p>
      <MdOutlinePlaylistAdd size={40} className="ml-[10px] mt-[5px]" />
    </section>
  );
}

export function HabitsEdit() {
  const { handleEdit } = useHabitContext();
  const { darkMode } = useThemeContext();
  return (
    <section
      onClick={handleEdit}
      className={`${
        darkMode ? "bg-[rgb(20,20,20)] text-white" : "bg-habitWhite"
      } flex items-center justify-center w-[130px] h-[55px] text-[2rem] rounded-[6px]  shadow-habitShadow cursor-pointer`}
    >
      <p>Edit</p>
      <MdEditNote size={40} className="ml-[10px] mt-[5px]" />
    </section>
  );
}
