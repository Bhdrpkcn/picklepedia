import React from "react";

const SpeciesButton = ({ setSpecies, setPageNumber, species, onClick }) => {
  //Setting the species (in return section we enter what species type we want)
  const handleSpeciesClick = () => {
    setSpecies(species);
    onClick();
  };

  return (
    <button className="filterButton" onClick={handleSpeciesClick}>
      {species}
    </button>
  );
};

const Species = ({ setSpecies, setPageNumber }) => {
  let speciesTypes = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ];

  let clear = () => {
    setSpecies("");
    setPageNumber(1);
  };

  const handleSpeciesPageClick = () => {
    setPageNumber(1);
  };

  return (
    <div>
      <button className="filterButton" onClick={clear}>
        Clear
      </button>
      <div>
        {/* bu kısımı 
        <button onClick={() => handleSpeciesClick("Human")}>Human</button>
        şeklinde de yazabilirsin ancak çok daha amele duruyor >> ORHUN , DRY ve Clean Code !!!!
         */}
        {speciesTypes.map((species, index) => (
          <SpeciesButton
            key={index}
            setSpecies={setSpecies}
            onClick={handleSpeciesPageClick}
            species={species}
          />
        ))}
      </div>
    </div>
  );
};

export default Species;
