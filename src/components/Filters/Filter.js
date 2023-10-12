import React, { useState, useEffect } from "react";
import Status from "./Category/Status";
import Gender from "./Category/Gender";
import Species from "./Category/Species";
import "./filter.css";

const Filter = ({ setStatus, setSpecies, setGender, setPageNumber }) => {
  const filterOptions = [
    { key: "isStatusOpen", label: "Status", component: <Status setStatus={setStatus} setPageNumber={setPageNumber} /> },
    { key: "isSpeciesOpen", label: "Species", component: <Species setSpecies={setSpecies} setPageNumber={setPageNumber} /> },
    { key: "isGenderOpen", label: "Gender", component: <Gender setGender={setGender} setPageNumber={setPageNumber} /> },
  ];

  const [filters, setFilters] = useState({
    isGenderOpen: false,
    isSpeciesOpen: false,
    isStatusOpen: false,
  });

  const toggleFilterStatus = (key) => {
    const newFilters = { ...filters };
    Object.keys(newFilters).forEach((filterKey) => {
      newFilters[filterKey] = false;
    });
    newFilters[key] = !newFilters[key]; // Toggle the status

    // Update the filterStatus state
    setFilters(newFilters);

    // Update the URL with the new filter status
    updateURLWithFilterStatus(newFilters);
  };

  // Function to update the URL with the filter status
  const updateURLWithFilterStatus = (newFilters) => {
    const searchParams = new URLSearchParams();
    Object.keys(newFilters).forEach((filterKey) => {
      searchParams.set(filterKey, newFilters[filterKey]);
    });

    // Replace the current URL with the updated search parameters
    window.history.replaceState(null, null, `?${searchParams.toString()}`);
  };

  // Function to get filter status from URL and set the initial state
  const getFilterStatusFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialFilters = { ...filters };
    Object.keys(initialFilters).forEach((filterKey) => {
      initialFilters[filterKey] = searchParams.get(filterKey) === "true";
    });
    return initialFilters;
  };

  // Get the initial filter status from the URL
  useEffect(() => {
    setFilters(getFilterStatusFromURL());
  }, []);

  // Save filter status to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("filterStatus", JSON.stringify(filters));
  }, [filters]);

  return (
    <div>
      <div className="filter">
        {filterOptions.map((option) => (
          <div key={option.key}>
            <button
              className={`mainClass ${filters[option.key] ? "active" : ""}`}
              onClick={() => toggleFilterStatus(option.key)}
            >
              {option.label}
            </button>
            {filters[option.key] && (
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
