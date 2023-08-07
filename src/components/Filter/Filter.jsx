import "./Filter.css";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const Filter = ({ sortOrder, setSortOrder, isAscending, setIsAscending }) => {
  return (
    <div className="filter">
      {isAscending ? (
        <AiOutlineSortAscending
          size={27}
          onClick={() => setIsAscending(!isAscending)}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <AiOutlineSortDescending
          size={27}
          onClick={() => setIsAscending(!isAscending)}
          style={{ cursor: "pointer" }}
        />
      )}
      <div className="filter__sort">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="date">Starting Date</option>
          <option value="name">Alphabet</option>
          <option value="length">Trip Length</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
