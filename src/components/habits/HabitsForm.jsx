import { useHabitContext } from "../../context/HabitContext";

export default function HabitsForm() {
  const { handlePriority, habitTitleRef, addHabit, handleShowAddHabits } =
    useHabitContext();
  return (
    <>
      <section className="absolute inset-0 bg-black/60 flex justify-center items-center">
        <section className="bg-white text-black flex flex-col w-[200px] h-[200px] justify-center items-center rounded-[15px] drop-shadow-2xl">
          <button onClick={handleShowAddHabits}>X</button>
          <input
            className="bg-white w-[80%] border-[1px] mb-[15px]"
            type="text"
            placeholder="Title"
            ref={habitTitleRef}
            maxLength={40}
          />
          <p>Priority</p>
          <section className="flex gap-[50px] mt-[10px]">
            <input
              type="radio"
              name="priority"
              value="Low"
              onChange={handlePriority}
            />

            <input
              type="radio"
              name="priority"
              value="Medium"
              onChange={handlePriority}
            />

            <input
              type="radio"
              name="priority"
              value="High"
              onChange={handlePriority}
            />
          </section>
          <section className="flex gap-[20px] text-[14]">
            <p>Low</p>
            <p>Medium</p>
            <p>High</p>
          </section>
          <button
            className="border-[1px] w-[70px] rounded-[10px] mt-[10px]"
            onClick={addHabit}
          >
            Add
          </button>
        </section>
      </section>
    </>
  );
}
