import { useState } from "react";
import { BiFilter } from "react-icons/bi";

export default function TodoFiltering() {
  const [filtering, setFiltering] = useState(false);

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
          <select name="status" className="filtering-select">
            <option disabled selected>
              Status
            </option>
            <option value="">Completed</option>
            <option value="">Incompleted</option>
          </select>
          <select name="category" className="filtering-select">
            <option disabled selected>
              Category
            </option>
            <option value="Health">Health</option>
            <option value="Household">Household</option>
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Social">Social</option>
            <option value="Finance">Finance</option>
          </select>
          <select name="sort" className="filtering-select">
            <option disabled selected>
              Sort
            </option>
            <option value="">Deadline</option>
            <option value="">Estimation</option>
            <option value="">Status</option>
          </select>
        </div>
      )}
    </>
  );
}
