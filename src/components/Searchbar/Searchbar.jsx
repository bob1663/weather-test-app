import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Searchbar.css";

const Searchbar = ({ trips, setFilteredTrips }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    const filteredTrips = trips.filter((trip) =>
      trip.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTrips(filteredTrips);
    setSearchQuery(query);
  };

  return (
    <div className="searchbar">
      <BiSearch size={27} />
      <input
        placeholder="Search your trip"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
