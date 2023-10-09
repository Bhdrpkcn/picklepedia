import React, { useState } from "react";

function Search({ setSearch, setPageNumber }) {
  const [searchText, setSearchText] = useState(""); // Arama metnini state olarak saklayın

  const handleClear = () => {
    setSearch(""); // Arama alanını temizle
    setPageNumber(1); // Sayfa numarasını 1'e geri döndür
    setSearchText(""); // Arama metni state'ini temizler
    
  };
  return (
    <div className="searchBar">
      <input
        className="search"
        onChange={(e) => {
          /* we setting page to 1 for rendering search results for starting to page 1, 
          and also client make a search from etc page 13 and still have to return to page 1.
           */
          setPageNumber(1);
          setSearch(e.target.value);
          setSearchText(e.target.value); // Arama metnini state'e kaydeder
        }}
        value={searchText} // Arama metnini state değeriyle eşleştirir
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
