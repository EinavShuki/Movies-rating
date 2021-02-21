import React from "react";
import { Link } from "react-router-dom";
const MoviesBox = ({ movies }) => {
  return (
    <div>
      {movies.map((movie, index) => (
        <div className="movies" key={index}>
          <Link to={`/movie/${movie.imdbID}`} className="movie-info">
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
            <Link to={`/movie/${movie.imdbID}`} style={{ fontSize: "1.5rem" }}>
              To all reviews
            </Link>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesBox;
