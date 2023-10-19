import React, { useState } from "react";

function Search({ setSearch, setPageNumber }) {
  const [searchText, setSearchText] = useState(""); 

  const handleClear = () => {
    setSearch(""); 
    setPageNumber(1);
    setSearchText(""); 
    
  };
  return (
    <div className="searchBar">
      <input
        className="search"
        onChange={(e) => {
          setPageNumber(1);
          setSearch(e.target.value);
          setSearchText(e.target.value); 
        }}
        value={searchText}
        placeholder="Search"
        type="text"
      ></input>
      <button className="cancel" onClick={handleClear}>
        X
      </button>
    </div>
  );
}

export default Search;
