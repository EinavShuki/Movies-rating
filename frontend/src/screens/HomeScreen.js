import axios from "axios";
import React, { useEffect, useState } from "react";
import MoviesScroll from "../components/MovieScroll/MovieScroll";
import SearchForm from "../components/SearchForm/SearchForm";

const HomeScreen = () => {
  const [Shrekmovies, setShrekMovies] = useState([]);
  const [Greasemovies, setGreaseMovies] = useState([]);
  const [Batmanmovies, setBatmanMovies] = useState([]);
  const [WonderWomanmovies, setWonderWomanMovies] = useState([]);
  const [HarryPotterMovies, setHarryPotterMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

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

        //Shrek
        const res1 = await axios.post(
          "/api/movies",
          { q: "Shrek", page: 1 },
          { cancelToken: source.token, config }
        );
        if (res1.data.Response === "False") {
          if (res1.data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else if (res1.data.Error === "Too many results.")
            setError("Too many results..Please be more specific");
          else setError(res1.data.Error);
        } else setError("");
        setShrekMovies(res1.data.Search);

        //Wonder Woman
        const res2 = await axios.post(
          "/api/movies",
          { q: "Wonder woman", page: 1 },
          { cancelToken: source.token, config }
        );
        if (res2.data.Response === "False") {
          if (res2.data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else if (res2.data.Error === "Too many results.")
            setError("Too many results..Please be more specific");
          else setError(res2.data.Error);
        } else setError("");
        setWonderWomanMovies(res2.data.Search);

        //Grease
        const res3 = await axios.post(
          "/api/movies",
          { q: "Grease", page: 1 },
          { cancelToken: source.token, config }
        );
        if (res3.data.Response === "False") {
          if (res3.data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else if (res3.data.Error === "Too many results.")
            setError("Too many results..Please be more specific");
          else setError(res3.data.Error);
        } else setError("");
        setGreaseMovies(res3.data.Search);

        //Batman
        const res4 = await axios.post(
          "/api/movies",
          { q: "Batman", page: 1 },
          { cancelToken: source.token, config }
        );
        if (res4.data.Response === "False") {
          if (res4.data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else if (res4.data.Error === "Too many results.")
            setError("Too many results..Please be more specific");
          else setError(res4.data.Error);
        } else setError("");
        setBatmanMovies(res4.data.Search);

        //Harry Potter
        const res5 = await axios.post(
          "/api/movies",
          { q: "Harry potter", page: 1 },
          { cancelToken: source.token, config }
        );
        if (res5.data.Response === "False") {
          if (res5.data.Error === "Incorrect IMDb ID.")
            setError("Cannot find movie");
          else if (res5.data.Error === "Too many results.")
            setError("Too many results..Please be more specific");
          else setError(res5.data.Error);
        } else setError("");
        setHarryPotterMovies(res5.data.Search);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();

    return () => {
      source.cancel("Cancelling in cleanup in Home");
    };
  }, []);
  return (
    <>
      <SearchForm />
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
          {Shrekmovies && <MoviesScroll movies={Shrekmovies} name="Shrek" />}
          {WonderWomanmovies && (
            <MoviesScroll movies={WonderWomanmovies} name="Wonder Woman" />
          )}
          {Greasemovies && <MoviesScroll movies={Greasemovies} name="Grease" />}
          {Batmanmovies && <MoviesScroll movies={Batmanmovies} name="Batman" />}
          {HarryPotterMovies && (
            <MoviesScroll movies={HarryPotterMovies} name="Harry Potter" />
          )}
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
