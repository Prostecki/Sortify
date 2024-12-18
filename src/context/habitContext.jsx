import {
  useState,
  useRef,
  useContext,
  createContext,
  useEffect,
  useMemo,
} from "react";

import { useLocalStorage } from "../hooks/useStorage";
import { useUserContext } from "./UserContext";

const HabitContext = createContext();

export function HabitProvider({ children }) {
  const { activeUser } = useUserContext();
  const { setItemL, getItemL } = useLocalStorage();

  const [habits, setHabits] = useState([]);
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [edit, setEdit] = useState(false);
  const [sortAscending, setSortAscending] = useState(false);
  const [trackAmount, setTrackAmount] = useState(false);
  const [trackHabits, setTrackHabits] = useState(false);
  const [showAddHabits, setShowAddHabits] = useState(false);

  const habitTitleRef = useRef();

  // Hämtar alla användare från localstorage och placerar dom i allUsers, är de inte tillgängliga blir det en tom lista.
  const allUsers = getItemL("users", []);

  // Kollar igenom alla användare och jämför med aktiva användaren för att hitta rätt användare och körs endast när antingen allUsers eller activeUser uppdateras.

  const findUser = useMemo(
    () => allUsers.findIndex((user) => user.username === activeUser?.username),
    [allUsers, activeUser]
  );

  // Sätter habits till tidigare habits (om det finns) annars tom lista.
  // Koden körs endast om det finns en aktiv användare och findUser hittas

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

      // Behålla plats på användaren

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
      setShowAddHabits(false);
      setEdit(false);
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

  // Om operation handleAmount är increment ökar antalet, är det decrement minskas det annars nollställs det (klicka på antalet)

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
    // Letar igenom alla användare och ser till att uppdatera habits för den aktiva användaren.
    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, habits: updatedHabits } : user
    );

    setItemL("users", updatedUsers);
    setHabits(updatedHabits);
    setTrackAmount((prev) => !prev);
  };

  // En form av mappning för priority för att lättare sortera eftersom den ska sortera för själva prioriteten och inte första bokstaven i prioriteten.
  // Samtidigt som man tydligt fattar att high = 1 och low = 3.

  const defPriority = { High: 1, Medium: 2, Low: 3 };

  const handleFilter = (e) => setFilter(e.target.value);

  const handleSort = (e) => setSort(e.target.value);

  // När man trycker på ikonen för descending/ascending sort bredvid sort knappen så byter den sorteringsriktning.

  const reverseHabits = () => {
    setHabits((prevHabits) => [...prevHabits].reverse());
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

    setHabits(updatedHabits);
  }, [sort, filter, trackHabits, trackAmount]);

  // Reglerar redigeringsläge för habits, när aktiverat är det möjligt att radera habits.

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

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

// Gör så att man kan skriva useHabitContext() i stället för useContext(HabitContext) + error hantering som förklarar direkt vilken kontext som orsakar problem.

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("Habit context error");
  }
  return context;
}
