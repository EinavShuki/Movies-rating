import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../src/mediaIndex.css";
import MoviesBox from "../components/MoviesBox";

const HomeScreen = () => {
  const [q, setQuery] = useState("princess");
  const [movies, setMovies] = useState([]);
  const [totalres, setTotalres] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [scrollTo, setScrollTo] = useState(0);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  let textInput = React.createRef();
  let btn = React.createRef();

  const searchHandler = (e) => {
    e.preventDefault();
    setQuery(textInput.current.value);
    textInput.current.value = "";
    setPage(1);
    setScrollTo(0);
  };

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    async function fetchMovies() {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.post(
          "/api/movies",
          { q, page },
          { cancelToken: source.token, config }
        );
        setTotalres(data.totalResults);
        if (data.Response === "False") {
          if (data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else if (data.Error === "Too many results.")
            setError("Too many results..Please be more specific");
          else setError(data.Error);
        } else setError("");
        if (page !== 1)
          data.Search.map((movie) => {
            setMovies((prev) => [...prev, movie]);
          });
        else setMovies(data.Search);

        setLoading(false);
        window.scrollBy(0, scrollTo);
        localStorage.setItem("query", JSON.stringify(q));
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();
    return () => {
      source.cancel("Cancelling in cleanup in Home");
    };
  }, [q, page]);

  useEffect(() => {
    if (
      movies &&
      movies.length > 0 &&
      Number(totalres) === Number(movies.length + 1)
    )
      setNoMore(true);
  }, [movies]);

  const moreHandler = () => {
    setPage((prev) => prev + 1);
    setScrollTo((prev) => prev + 1500);
  };

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
          <div className="movies_display">
            {movies && <MoviesBox movies={movies} />}
            <button
              id="more_btn"
              style={{ display: noMore ? "none" : "inline" }}
              onClick={moreHandler}
              ref={btn}
            >
              More
            </button>
          </div>
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
