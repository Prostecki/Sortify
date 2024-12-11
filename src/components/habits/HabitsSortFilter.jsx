import { useHabitContext } from "../../context/habitContext";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

export default function HabitsSortFilter() {
  const {
    reverseHabits,
    handleSort,
    sort,
    sortAscending,
    filter,
    handleFilter,
  } = useHabitContext();
  return (
    <>
      <section className="mr-[-40px] text-[30px] flex">
        <figure
          onClick={() => reverseHabits()}
          className="flex justify-center items-center bg-habitWhite shadow-habitShadow rounded-full w-[55px] h-[55px] cursor-pointer"
        >
          {sortAscending ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
        </figure>
        <section className="ml-[25px] bg-habitWhite shadow-habitShadow rounded-[6px] w-[180px] h-[55px] flex justify-center">
          <select
            className="bg-habitWhite w-[140px] text-center cursor-pointer"
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
        <section className="ml-[25px] bg-habitWhite shadow-habitShadow rounded-[6px] w-[180px] h-[55px] flex justify-center">
          <select
            className="bg-habitWhite w-[140px] text-center cursor-pointer"
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
      </section>
    </>
  );
}
