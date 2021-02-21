import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="navBar">
      <Link to="/" id="home_name">
        Movies Rating
      </Link>
      <form action="URL" rel="search">
        <input placeholder="Movie name" type="text" />{" "}
        <button>
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Header;
