import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../src/mediaIndex.css";
import MoviesBox from "../components/MoviesBox/MoviesBox";
import SearchForm from "../components/SearchForm/SearchForm";

const SearchScreen = ({ match }) => {
  const q = match.params.title;
  const [movies, setMovies] = useState([]);
  const [totalres, setTotalres] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [scrollTo, setScrollTo] = useState(0);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 500) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 500) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

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
        // localStorage.setItem("query", JSON.stringify(q));
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
    setPage(1);
    setScrollTo(0);
  }, [q]);

  useEffect(() => {
    if (
      movies &&
      movies.length > 0 &&
      Number(totalres) === Number(movies.length)
    )
      setNoMore(true);
    else setNoMore(false);
  }, [movies, q]);

  const moreHandler = () => {
    setPage((prev) => prev + 1);
    setScrollTo((prev) => prev + window.pageYOffset);
  };

  return (
    <>
      <SearchForm />
      {loading ? (
        <div className="loader"></div>
      ) : error === "" ? (
        <>
          {movies && <MoviesBox movies={movies} />}
          <button
            id="more_btn"
            style={{ display: noMore ? "none" : "inline" }}
            onClick={moreHandler}
          >
            More
          </button>
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
        <i className="fas fa-chevron-circle-up top_btn"></i>
      </a>
    </>
  );
};

export default SearchScreen;
