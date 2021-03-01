import React from "react";
import { Link } from "react-router-dom";

const MoviesBox = ({ movies }) => {
  return (
    <div className="movies_grid zoomIn">
      {movies.map((movie, index) => (
        <Link key={index} className="arl" to={`/movie/${movie.imdbID}`}>
          <div className="movie-info">
            <img
              alt={movie.Title}
              src={
                movie.Poster === "N/A"
                  ? "https://placehold.it/198x264&text=Image+Not+Found"
                  : movie.Poster
              }
            />
            <p style={{ marginBottom: "1rem" }}>
              {movie.Title} | {movie.Year}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoviesBox;
