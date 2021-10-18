import axios from "axios";
import React, { useEffect, useState } from "react";
import MoviesScroll from "../components/MovieScroll/MovieScroll";
import SearchForm from "../components/SearchForm/SearchForm";

const HomeScreen = () => {
  const [Shrekmovies, setShrekMovies] = useState([]);
  const [littleWomenMovies, setlittleWomenMovies] = useState([]);
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
    const source = axios.CancelToken.source();

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    setLoading(true);
    setError("");
    const promises = [];
    promises.push(
      axios.post(
        "/api/movies",
        { q: "Shrek", page: 1 },
        { cancelToken: source.token, config }
      )
    );
    promises.push(
      axios.post(
        "/api/movies",
        { q: "Wonder woman", page: 1 },
        { cancelToken: source.token, config }
      )
    );
    promises.push(
      axios.post(
        "/api/movies",
        { q: "little women", page: 1 },
        { cancelToken: source.token, config }
      )
    );
    promises.push(
      axios.post(
        "/api/movies",
        { q: "Batman", page: 1 },
        { cancelToken: source.token, config }
      )
    );
    promises.push(
      axios.post(
        "/api/movies",
        { q: "Harry potter", page: 1 },
        { cancelToken: source.token, config }
      )
    );

    Promise.all(promises)
      .then((values) => {
        setShrekMovies(values[0].data.Search);
        setWonderWomanMovies(values[1].data.Search);
        setlittleWomenMovies(values[2].data.Search);
        setBatmanMovies(values[3].data.Search);
        setHarryPotterMovies(values[4].data.Search);
      })
      .catch(() => {
        setError("There was an error");
      })
      .finally(setLoading(false));
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
          {littleWomenMovies && (
            <MoviesScroll movies={littleWomenMovies} name="Little Women" />
          )}
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
        <i className="fas fa-chevron-circle-up top_btn"></i>
      </a>
    </>
  );
};

export default HomeScreen;
