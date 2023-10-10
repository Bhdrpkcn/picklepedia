import React, { useState, useEffect } from "react";
import Status from "./Category/Status";
import Gender from "./Category/Gender";
import Species from "./Category/Species";
import "./filter.css";
const Filter = ({ setStatus, setSpecies, setGender, setPageNumber }) => {
  //TO FIX when clicking filtering button Main Status button is closing
  // openning/closing (Gender, Species, Status) tags

  const [filters, setFilters] = useState({
    isGenderOpen: false,
    isSpeciesOpen: false,
    isStatusOpen: false,
  });

  const toggleFilterStatus = (key) => {
    const newFilters = { ...filters };
    //["isGenderOpen", "isSpeciesOpen", "isStatusOpen"]
    Object.keys(newFilters).forEach((filterKey) => {
      newFilters[filterKey] = false;
    });
    newFilters[key] = true;
    console.log(newFilters);

    setFilters(newFilters);
  };

  // TODO 1 component indir ve map ile dön

  return (
    <div>
      <div className="filter">
        <button
          className="mainClass"
          onClick={() => toggleFilterStatus("isStatusOpen")}
        >
          Status
        </button>
        {filters.isStatusOpen && (
          <div>
            <Status setStatus={setStatus} setPageNumber={setPageNumber} />
          </div>
        )}

        <button
          className="mainClass"
          onClick={() => toggleFilterStatus("isSpeciesOpen")}
        >
          Species
        </button>
        {filters.isSpeciesOpen && (
          <div>
            <Species setSpecies={setSpecies} setPageNumber={setPageNumber} />
          </div>
        )}

        <button
          className="mainClass"
          onClick={() => toggleFilterStatus("isGenderOpen")}
        >
          Gender
        </button>
        {filters.isGenderOpen && (
          <div>
            <Gender setGender={setGender} setPageNumber={setPageNumber} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
