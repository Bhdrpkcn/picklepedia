import React from "react";
import "./pagination.css";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdNavigateBefore, MdNavigateNext} from "react-icons/md";

function Pagination({ setPageNumber, pageNumber, maxPageNumber }) {

  let next = () => {
    if (pageNumber === maxPageNumber) return;
    setPageNumber((current) => current + 1);
  };
  let prev = () => {
    if (pageNumber === 1) return; 
    setPageNumber((current) => current - 1);
  };
  let firstPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(1);
  };
  let lastPage = () => {
    if (pageNumber === maxPageNumber) return;
    setPageNumber(maxPageNumber);
  };

  return (
    <div className="btnRow">
      <BiFirstPage className="btn" onClick={firstPage} />
      <MdNavigateBefore className="btn" onClick={prev} />
      <MdNavigateNext className="btn" onClick={next} />
      <BiLastPage className="btn" onClick={lastPage} />
    </div>
  );
}

export default Pagination;
