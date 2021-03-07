import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieScroll.css";

const MoviesScroll = ({ movies, name }) => {
  const [arrowRight, setArrowRight] = useState("fas fa-chevron-circle-right");
  const [arrowLeft, setArrowLeft] = useState("fas fa-chevron-circle-left hide");
  let ref = React.createRef();

  const arrowRightHandler = () => {
    ref.current.scrollLeft += 500;
    // console.log(ref.current.scrollLeft);
    setArrowLeft("fas fa-chevron-circle-left");
    if (ref.current.scrollLeft >= 1000) {
      setArrowRight("fas fa-chevron-circle-right hide");
    }
  };

  const arrowLeftHandler = () => {
    ref.current.scrollLeft -= 500;
    // console.log(ref.current.scrollLeft);
    setArrowRight("fas fa-chevron-circle-right");
    if (ref.current.scrollLeft <= 500) {
      setArrowLeft("fas fa-chevron-circle-left hide");
    }
  };
  return (
    <div className="above">
      <i id="left_arrow" className={arrowLeft} onClick={arrowLeftHandler}></i>
      <div className="movies_container" ref={ref}>
        <h2 className="movies_title">{name}</h2>
        <div className="movies_scroll">
          {movies.map((movie, index) => (
            <Link key={index} className="arl" to={`/movie/${movie.imdbID}`}>
              <div className="movie-info_scroll">
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
      </div>
      <i
        id="right_arrow"
        className={arrowRight}
        onClick={arrowRightHandler}
      ></i>
    </div>
  );
};

export default MoviesScroll;
