import {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from "react";

import { useLocalStorage } from "../hooks/useStorage";

const HabitContext = createContext();

export function HabitProvider({ children }) {
  const habitTitleRef = useRef();

  const { getItemL, setItemL } = useLocalStorage();

  const [habits, setHabits] = useState([]);
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [edit, setEdit] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [trackAmount, setTrackAmount] = useState(false);
  const [trackHabits, setTrackHabits] = useState(false);
  const [showAddHabits, setShowAddHabits] = useState(false);
  const [activeUser, setActiveUser] = useState(
    () => getItemL("currentUser") ?? {}
  );

  const allUsers = getItemL("users", []);

  const findUser = useMemo(
    () => allUsers.findIndex((user) => user.username === activeUser?.username),
    [allUsers, activeUser]
  );

  useEffect(() => {
    if (activeUser && findUser !== -1) {
      setHabits(allUsers[findUser].habits || []);
    }
  }, [activeUser]);

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const addHabit = () => {
    const habitTitle = habitTitleRef.current.value.trim();

    if (habitTitle !== "" && priority !== "") {
      const newHabit = {
        title: habitTitle,
        amount: 0,
        priority: priority,
        addedAt: new Date().toISOString(),
      };

      const updatedUser = {
        ...allUsers[findUser],
        habits: [...(allUsers[findUser].habits || []), newHabit],
      };

      const updatedUsers = [
        ...allUsers.slice(0, findUser),
        updatedUser,
        ...allUsers.slice(findUser + 1),
      ];
      setPriority("");
      setItemL("users", updatedUsers);
      setHabits(updatedUser.habits);
      habitTitleRef.current.value = "";

      setTrackHabits((prev) => !prev);
    } else {
      alert("Please enter a title and choose a desired priority");
    }
  };

  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, i) => index !== i);

    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, habits: updatedHabits } : user
    );
    setItemL("users", updatedUsers);

    setHabits(updatedHabits);
  };

  const handleShowAddHabits = () => {
    setShowAddHabits((prev) => !prev);
  };

  const handleAmount = (index, operation) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index
        ? {
            ...habit,
            amount: (() => {
              if (operation === "increment") {
                return habit.amount + 1;
              } else if (operation === "decrement") {
                if (habit.amount > 0) {
                  return habit.amount - 1;
                } else {
                  return 0;
                }
              } else {
                return habit.amount * 0;
              }
            })(),
          }
        : habit
    );
    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, habits: updatedHabits } : user
    );

    setItemL("users", updatedUsers);
    setHabits(updatedHabits);
    setTrackAmount((prev) => !prev);
  };

  const defPriority = { High: 1, Medium: 2, Low: 3 };

  const handleFilter = (e) => setFilter(e.target.value);

  const handleSort = (e) => setSort(e.target.value);

  const reverseHabits = () => {
    setSortAscending((prev) => !prev);
  };

  useEffect(() => {
    let updatedHabits = [...(allUsers[findUser]?.habits || [])];

    if (sort === "priority") {
      updatedHabits = updatedHabits.sort(
        (a, b) => defPriority[a.priority] - defPriority[b.priority]
      );
    } else if (sort === "amount") {
      updatedHabits = updatedHabits.sort((a, b) => b.amount - a.amount);
    } else if (sort === "date") {
      updatedHabits = updatedHabits.sort((a, b) => {
        const dateA = new Date(a.addedAt);
        const dateB = new Date(b.addedAt);
        return dateB - dateA;
      });
    }

    if (filter === "high") {
      updatedHabits = updatedHabits.filter(
        (habit) => habit.priority === "High"
      );
    } else if (filter === "medium") {
      updatedHabits = updatedHabits.filter(
        (habit) => habit.priority === "Medium"
      );
    } else if (filter === "low") {
      updatedHabits = updatedHabits.filter((habit) => habit.priority === "Low");
    }

    setHabits(sortAscending ? updatedHabits.reverse() : updatedHabits);
  }, [sort, filter, trackAmount, trackHabits, sortAscending]);

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const resetEdit = () => {
    setEdit(false);
  };

  useEffect(() => {
    console.log(showAddHabits);
  }, [showAddHabits]);

  return (
    <HabitContext.Provider
      value={{
        habits,
        priority,
        setPriority,
        handlePriority,
        addHabit,
        handleShowAddHabits,
        showAddHabits,
        deleteHabit,
        habitTitleRef,
        handleAmount,
        handleSort,
        sortAscending,
        sort,
        filter,
        handleFilter,
        reverseHabits,
        edit,
        handleEdit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("Habit context error");
  }
  return context;
}
