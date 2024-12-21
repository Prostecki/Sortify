import { useState } from "react";
import { BiFilter } from "react-icons/bi";

export default function TodoFiltering({ tasks, filtersort }) {
  const [filtering, setFiltering] = useState(false);

  const handleChange = (event) => {
    let filtered = [...tasks];
    let filterType = event.target.name;
    let filterValue = event.target.value;

    if (filterType === "status") {
      if (filterValue !== "all") {
        filtered = filtered.filter((task) =>
          filterValue === "completed" ? task.status : !task.status
        );
      }
    }

    if (filterType === "category") {
      if (filterValue !== "all") {
        filtered = filtered.filter((task) => task.category === filterValue);
      }
    }

    if (filterType === "sort") {
      if (filterValue === "deadline") {
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      } else if (filterValue === "estimation") {
        filtered.sort((a, b) => a.estimation - b.estimation);
      } else if (filterValue === "status") {
        filtered.sort((a, b) => b.status - a.status);
      }
    }

    filtersort(filtered);
  };

  const displayFiltering = () => {
    setFiltering(!filtering);
  };

  return (
    <>
      <button
        onClick={displayFiltering}
        className="flex items-center gap-1 text-xl drop-shadow-sm"
      >
        <BiFilter size={35} />
      </button>
      {filtering && (
        <div className="filtering-container">
          <select
            name="status"
            className="filtering-select"
            onChange={handleChange}
          >
            <option selected disabled>
              Filter
            </option>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="progress">In progress</option>
          </select>
          <select
            name="category"
            className="filtering-select"
            onChange={handleChange}
          >
            <option selected disabled>
              Categories
            </option>
            <option value="all">All</option>
            <option value="Health">Health</option>
            <option value="Household">Household</option>
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Social">Social</option>
            <option value="Finance">Finance</option>
          </select>
          <select
            name="sort"
            className="filtering-select"
            onChange={handleChange}
          >
            <option selected disabled>
              Sort
            </option>
            <option value="none">None</option>
            <option value="deadline">Deadline</option>
            <option value="estimation">Estimation</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}
    </>
  );
}
