import React from "react";
import "./pagination.css";
import {
  MdOutlineFirstPage,
  MdOutlineLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
function Pagination({ setPageNumber, pageNumber, maxPageNumber }) {
  //we collect the data from App.js for setting buttons
  let next = () => {
    if (pageNumber === maxPageNumber) return; //we check if the next button reach api max page count and stop it to go next empty pages
    setPageNumber((current) => current + 1);
  };
  let prev = () => {
    if (pageNumber === 1) return; //to prevent "prev" click to go page-1,-2,-3 etc we set this rule!
    setPageNumber((current) => current - 1);
  };
  let firstPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(1)
  }
  let lastPage = () => {
    if (pageNumber === maxPageNumber) return;
    setPageNumber(maxPageNumber)
  }

  return (
    <div className="btnRow">
      <MdOutlineFirstPage className="btn" onClick={firstPage} />
      <MdNavigateBefore className="btn" onClick={prev} />
      <MdNavigateNext className="btn" onClick={next} />
      <MdOutlineLastPage className="btn" onClick={lastPage} />
    </div>
  );
}

export default Pagination;
