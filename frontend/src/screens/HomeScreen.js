import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviesBox from "../components/MoviesBox";

const HomeScreen = () => {
  const [q, setQuery] = useState("woman");
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", checkScrollTop);

  let textInput = React.createRef();

  const searchHandler = (e) => {
    e.preventDefault();
    setQuery(textInput.current.value);
    textInput.current.value = "";
  };

  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post("/api/movies", { q }, config);
        console.log(data);
        if (data.Response === "False") {
          if (data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else setError(data.Error);
        } else setError("");
        setMovies(data.Search);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();
    q
      ? localStorage.setItem("query", JSON.stringify(q))
      : localStorage.setItem("query", JSON.stringify("woman"));
  }, [q]);

  return (
    <>
      <form rel="search" id="search_form">
        <input
          autoComplete="off"
          className="search_input"
          placeholder="Movie name"
          type="text"
          ref={textInput}
        />{" "}
        <button className="search_btn" onClick={searchHandler}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      {loading ? (
        <div className="loader"></div>
      ) : error === "" ? (
        <>
          <div className="title">
            <span>W</span>
            <span>e</span>
            <span>l</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>e</span> <span>t</span>
            <span>o</span> <span>M</span>
            <span>o</span>
            <span>v</span>
            <span>i</span>
            <span>e</span>
            <span>s</span> <span>R</span>
            <span>a</span>
            <span>t</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </div>
          {movies && <MoviesBox movies={movies} />}
        </>
      ) : (
        <h1
          style={{
            marginTop: "2rem",
            backgroundColor: "red",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          {error}
        </h1>
      )}
      <a href="#" style={{ display: showScroll ? "flex" : "none" }}>
        <img
          className="top_btn"
          src="\img\chevron-upwards-arrow.png"
          alt="top"
        />
      </a>
    </>
  );
};

export default HomeScreen;
