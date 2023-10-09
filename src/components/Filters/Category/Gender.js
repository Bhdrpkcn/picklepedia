import React from "react";

function Gender({ setGender, setPageNumber }) {
  const handleGenderClick = (newGender) => {
    setGender(newGender); //Setting the gender (in return section we enter what gender type we want)
    setPageNumber(1);
  };

  let clear = () => {
    setGender("");
  };

  return (
    <div>
      <button className="filterButton" onClick={clear}>
        Clear
      </button>
      <div>
        <button
          className="filterButton"
          onClick={() => handleGenderClick("Female")}
        >
          Female
        </button>
        <button
          className="filterButton"
          onClick={() => handleGenderClick("Male")}
        >
          Male
        </button>
        <button
          className="filterButton"
          onClick={() => handleGenderClick("Genderless")}
        >
          Genderless
        </button>
        <button
          className="filterButton"
          onClick={() => handleGenderClick("unknown")}
        >
          Unknown
        </button>
      </div>
    </div>
  );
}

export default Gender;
