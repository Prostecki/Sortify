import { useHabitContext } from "../../context/habitContext";
import { useThemeContext } from "../../context/ThemeContext";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

export function HabitsSort() {
  const { handleSort, sort } = useHabitContext();
  const { darkMode } = useThemeContext();
  return (
    <section
      className={`${
        darkMode ? "bg-[rgb(20,20,20)] text-white" : "bg-habitWhite"
      } w-[210px] h-[55px] flex justify-center text-[2rem] cursor-pointer  shadow-habitShadow rounded-[6px]  `}
    >
      <section className="flex justify-center items-center mr-[5px]">
        <HabitsSortDirection />
      </section>

      <section className="flex ">
        <select
          className={`${
            darkMode ? "bg-[rgb(20,20,20)] " : "bg-habitWhite"
          } w-[140px] text-center cursor-pointer focus:outline-none`}
          defaultValue=""
          onChange={handleSort}
          value={sort}
        >
          <option value="" disabled>
            Sort
          </option>
          <option value="date">Date</option>
          <option value="priority">Priority</option>
          <option value="amount">Amount</option>
        </select>
      </section>
    </section>
  );
}

export function HabitsSortDirection() {
  const { sortAscending, reverseHabits } = useHabitContext();
  const { darkMode } = useThemeContext();
  return (
    <figure
      onClick={() => reverseHabits()}
      className={`${
        darkMode ? "bg-[#141414] text-white" : "bg-habitWhite"
      } flex justify-center items-center my-auto   shadow-habitShadow rounded-full w-[45px] h-[45px]  cursor-pointer`}
    >
      {sortAscending ? (
        <FaSortAmountDownAlt size={30} />
      ) : (
        <FaSortAmountUpAlt size={30} />
      )}
    </figure>
  );
}

export function HabitsFilter() {
  const { handleFilter, filter } = useHabitContext();
  const { darkMode } = useThemeContext();
  return (
    <section
      className={`${
        darkMode ? "bg-[rgb(20,20,20)] text-white" : "bg-habitWhite"
      } w-[180px] h-[55px] flex justify-center text-[2rem] shadow-habitShadow rounded-[6px] cursor-pointer `}
    >
      <select
        className={`${
          darkMode ? "bg-[rgb(20,20,20)] " : "bg-habitWhite"
        } w-[140px] text-center cursor-pointer focus:outline-none`}
        defaultValue=""
        onChange={handleFilter}
        value={filter}
      >
        <option value="" disabled>
          Filter
        </option>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </section>
  );
}
