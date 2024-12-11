import { MdOutlinePlaylistAdd, MdEditNote } from "react-icons/md";

import { useHabitContext } from "../../context/habitContext";

export default function HabitsAddEdit() {
  const { handleShowAddHabits, handleEdit } = useHabitContext();
  return (
    <section className="flex">
      <section
        onClick={handleShowAddHabits}
        className="flex items-center text-[30px] justify-center w-[220px] h-[55px] rounded-[6px] bg-habitWhite shadow-habitShadow"
      >
        <p className="">New Habit</p>
        <MdOutlinePlaylistAdd size={40} className="ml-[10px] mt-[5px]" />
      </section>

      <section
        onClick={handleEdit}
        className="ml-[35px] flex items-center justify-center w-[130px] h-[55px] text-[30px] rounded-[6px] bg-habitWhite shadow-habitShadow "
      >
        <p className="">Edit</p>
        <MdEditNote size={40} className="ml-[10px] mt-[5px]" />
      </section>
    </section>
  );
}
