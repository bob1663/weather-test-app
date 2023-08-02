import "./Searchbar.css";
import { BiSearch } from "react-icons/bi";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <BiSearch size={27}/>
      <input placeholder="Search your trip" />
    </div>
  );
};

export default Searchbar;
