import React, { useEffect, useState } from "react";
import axios from "axios";
import MoviesBox from "../components/MoviesBox";
import dotenv from "dotenv";

dotenv.config();

const HomeScreen = () => {
  const [q, setQuery] = useState(JSON.parse(localStorage.getItem("query")));
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let textInput = React.createRef();

  const searchHandler = (e) => {
    e.preventDefault();
    // console.log(textInput.current.value);
    setQuery(textInput.current.value);
    console.log(q);
    textInput.current.value = "";
  };

  const API_KEY = "a505e764";
  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&type=movie`;

  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(q));
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.get(URL, config);
        console.log("data", data);
        console.log("data", typeof data);
        if (data.Response === "False") setError(data.Error);
        setMovies(data.Search);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    setLoading(false);
    setQuery(JSON.parse(localStorage.getItem("query")));
  }, [q]);

  // console.log(movies);
  return (
    <>
      <form rel="search">
        <input placeholder="Movie name" type="text" ref={textInput} />{" "}
        <button onClick={searchHandler}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      {loading ? (
        <h1
          style={{
            marginTop: "2rem",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          Loading...
        </h1>
      ) : !error ? (
        <>
          <h1 style={{ textAlign: "center", fontSize: "4rem" }}>
            Welcom to Movies Rating
          </h1>
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
    </>
  );
};

export default HomeScreen;
