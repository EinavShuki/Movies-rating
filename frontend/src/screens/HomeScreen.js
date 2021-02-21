import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../components/Rating/Rating";
const HomeScreen = () => {
  const [q, setQuery] = useState("new");
  const [movies, setMovies] = useState(null);

  let yaer = new Date().getFullYear();
  const API_KEY = "a505e764";
  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&y=${yaer}&type=movie`;

  useEffect(async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.get(URL, config);
      console.log("data", data);
      setMovies(data.Search);
    } catch (err) {
      console.log(err);
    }
  }, [q]);

  console.log(movies);
  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "4rem" }}>
        Welcom to Movies Rating
      </h1>
      {movies && (
        <div>
          {movies.map((movie, index) => (
            <div className="movies" key={index}>
              <Link to="/movie" className="movie-info">
                <img
                  alt={movie.Title}
                  src={
                    movie.Poster === "N/A"
                      ? "https://placehold.it/198x264&text=Image+Not+Found"
                      : movie.Poster
                  }
                />
                <p>
                  {movie.Title} | {movie.Year}
                </p>
                <Rating value="4" />
                <Link to="/movie" style={{ fontSize: "1.5rem" }}>
                  To all reviews
                </Link>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
