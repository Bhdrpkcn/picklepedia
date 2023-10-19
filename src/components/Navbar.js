import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <div className="page">
        <Link to="/" className="pageButton">
          characters
        </Link>
        <Link to="/episodes" className="pageButton">
          episodes
        </Link>
        <Link to="/locations" className="pageButton">
          locations
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
