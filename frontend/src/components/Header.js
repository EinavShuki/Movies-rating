import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div id="navBar">
      <Link to="/" id="home_name">
        Movies Rating
      </Link>
    </div>
  );
};

export default Header;
