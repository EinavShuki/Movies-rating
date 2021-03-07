import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../components/Rating/Rating";
import ReviewsBox from "../components/ReviewsBox/ReviewsBox.js";
import Reviews from "../components/ReviewsComponent/Reviews";
const MovieScreen = ({ match }) => {
  const id = match.params.id;
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(5);
  const [addReview, setAddReview] = useState(false);
  const [addRevBack, setaddRevBack] = useState("Add a review");
  const [watchAll, setWatchAll] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

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

  useEffect(() => {
    window.scrollBy(0, 400);
  }, [watchAll]);

  useEffect(() => {
    if (movie) setRating(movie.imdbRating);
  }, [movie]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function fetchData() {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.get(`/api/movies/${id}`, {
          cancelToken: ourRequest.token,
          config,
        });
        // console.log(data);
        setMovie(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel("Cancelling in cleanup in MovieScreen");
    };
  }, []);

  const addReviewHandler = () => {
    setAddReview((prev) => !prev);
    setaddRevBack((prev) =>
      prev === "Add a review" ? "Back" : "Add a review"
    );
  };

  const watchAllHandler = () => {
    setWatchAll(true);
    // console.log(window.pageYOffset);
  };

  return (
    <>
      <div id="movie_screen_body">
        {movie && (
          <div id="movie">
            <img
              id="one_img"
              alt={movie.Title}
              src={
                movie.Poster === "N/A"
                  ? "https://placehold.it/198x264&text=Image+Not+Found"
                  : movie.Poster
              }
            />
            <div id="details">
              <h3>
                {movie.Title} | {movie.Year}
              </h3>
              <Rating value={rating / 2} />
              <p>Plot: {movie.Plot}</p>
              <p>Actors: {movie.Actors}</p>
              <p>Writer/s: {movie.Writer} </p>
            </div>
          </div>
        )}
        {addReview ? (
          <ReviewsBox id={id} />
        ) : (
          <Reviews id={id} watchAll={watchAll} />
        )}
        <div className="btns_area">
          <button
            style={
              addReview
                ? { visibility: "hidden", width: "3px" }
                : { visibility: "visible" }
            }
            onClick={watchAllHandler}
          >
            Watch all reviews
          </button>
          <button onClick={addReviewHandler}>{addRevBack}</button>
        </div>
      </div>
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

export default MovieScreen;
