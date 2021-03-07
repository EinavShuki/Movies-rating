import "./SearchForm.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchForm = () => {
  const [searchInputVer, setSearchInputVer] = useState("");
  const history = useHistory();
  let textInput = React.createRef();

  const searchHandler = (e) => {
    e.preventDefault();
    // console.log(history.location.pathname);
    if (history.location.pathname === "/")
      history.push(`serach/${textInput.current.value}`);
    else {
      history.push(`${textInput.current.value}`);
    }
  };
  const checkinput = () => {
    var english = /^[!A-Za-z0-9 ]*$/;
    if (!textInput.current.value.match(english))
      setSearchInputVer("Unexpacted letters");
    else setSearchInputVer("");
  };
  return (
    <>
      <form rel="search" id="search_form">
        <input
          autoComplete="off"
          className="search_input"
          placeholder="Enter a movie name"
          type="text"
          ref={textInput}
          onChange={checkinput}
        />{" "}
        <button
          disabled={searchInputVer !== ""}
          className="search_btn"
          onClick={searchHandler}
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
      {searchInputVer !== "" && <h3 id="verify_msg">{searchInputVer}</h3>}
    </>
  );
};

export default SearchForm;
