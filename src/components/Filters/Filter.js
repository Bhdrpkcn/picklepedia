import React, { useState, useEffect } from "react";
import Status from "./Category/Status";
import Gender from "./Category/Gender";
import Species from "./Category/Species";
import "./filter.css";
const Filter = ({ setStatus, setSpecies, setGender, setPageNumber }) => {
//TO FIX when clicking filtering button Main Status button is closing
  // openning/closing (Gender, Species, Status) tags
  const [genderOpen, setGenderOpen] = useState(false);
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // Kategori açma fonksiyonları
  const toggleGender = () => {
    setGenderOpen(!genderOpen);
    // to close other components when open
    setSpeciesOpen(false);
    setStatusOpen(false);
  };

  const toggleSpecies = () => {
    setSpeciesOpen(!speciesOpen);
    // to close other components when open
    setGenderOpen(false);
    setStatusOpen(false);
  };

  const toggleStatus = () => {
    setStatusOpen(!statusOpen);
    // to close other components when open
    setGenderOpen(false);
    setSpeciesOpen(false);
  };

  
  return (
    <div>
    <div className="filter">
      <button className="mainClass" onClick={toggleStatus}>
        Status
      </button>
      {statusOpen && (
        <div>
          <Status setStatus={setStatus} setPageNumber={setPageNumber}/>
        </div>
      )}

      <button className="mainClass" onClick={toggleSpecies}>
        Species
      </button>
      {speciesOpen && (
        <div>
          <Species setSpecies={setSpecies} setPageNumber={setPageNumber} />
        </div>
      )}

      <button className="mainClass" onClick={toggleGender}>
        Gender
      </button>
      {genderOpen && (
        <div>
          <Gender setGender={setGender} setPageNumber={setPageNumber} />
        </div>
      )}
    </div>
    </div>
  );
};

export default Filter;
