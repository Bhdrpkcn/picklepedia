import React, { useState, useEffect } from "react";
import Status from "./Category/Status";
import Gender from "./Category/Gender";
import Species from "./Category/Species";
import "./filter.css";
import { useLocation } from "react-router-dom";

const Filter = ({ setStatus, setSpecies, setGender, setPageNumber }) => {
  const filterOptions = [
    { key: "isStatusOpen", label: "Status", component: <Status setStatus={setStatus} setPageNumber={setPageNumber} /> },
    { key: "isSpeciesOpen", label: "Species", component: <Species setSpecies={setSpecies} setPageNumber={setPageNumber} /> },
    { key: "isGenderOpen", label: "Gender", component: <Gender setGender={setGender} setPageNumber={setPageNumber} /> },
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialFilterStatus = {
    isStatusOpen: false,
    isSpeciesOpen: false,
    isGenderOpen: false,
  };

  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);

  const toggleFilterStatus = (key) => {
    const newFilterStatus = { ...filterStatus };
    
    newFilterStatus[key] = !newFilterStatus[key]; // Toggle the status

    // Update the filterStatus state
    setFilterStatus(newFilterStatus);

    // Update the URL with the new filter status
    updateURLWithFilterStatus(newFilterStatus);
  };

  // Function to update the URL with the filter status
  const updateURLWithFilterStatus = (newFilterStatus) => {
    const searchParams = new URLSearchParams();
    Object.keys(newFilterStatus).forEach((filterKey) => {
      searchParams.set(filterKey, newFilterStatus[filterKey]);
    });

    const newURL = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, null, newURL);
  };

  
  return (
    <div>
      <div className="filter">
        {filterOptions.map((option) => (
          <div key={option.key}>
            <button
              className={`mainClass ${filterStatus[option.key] ? "active" : ""}`}
              onClick={() => toggleFilterStatus(option.key)}
            >
              {option.label}
            </button>
            {filterStatus[option.key] && (
              <div>
                {option.component}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
