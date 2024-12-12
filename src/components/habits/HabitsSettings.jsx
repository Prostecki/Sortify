import HabitsSortFilter from "./HabitsSortFilter";
import HabitsAddEdit from "./HabitsAddEdit";

export default function HabitsSettings() {
  return (
    <>
      <section className="flex mt-[30px] gap-[400px]">
        <HabitsAddEdit />
        <HabitsSortFilter />
      </section>
    </>
  );
}
