import React from "react";

const Status = ({ setStatus, setPageNumber }) => {

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus);
    setPageNumber(1);
    console.log("worked status");
  };


  let clear = () => {
    setStatus("");
  };
  return (
    <div>
      <button className="filterButton" onClick={clear}>
        Clear
      </button>
      <div>
        <button
          className="filterButton"
          onClick={() => handleStatusClick("Dead")}
        >
          Dead
        </button>
        <button
          className="filterButton"
          onClick={() => handleStatusClick("Alive")}
        >
          Alive
        </button>
        <button
          className="filterButton"
          onClick={() => handleStatusClick("Unknown")}
        >
          Unknown
        </button>
      </div>
    </div>
  );
};

export default Status;
