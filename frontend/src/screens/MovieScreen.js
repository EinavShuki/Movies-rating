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

  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { data } = await axios.get(`/api/movies/${id}`, config);
        console.log(data);
        setMovie(data);
        setRating(movie.Ratings[0].Value.split("/", 1)[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const addReviewHandler = () => {
    setAddReview((prev) => !prev);
    setaddRevBack((prev) =>
      prev === "Add a review" ? "Back" : "Add a review"
    );
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {movie && (
          <div id="movie_area">
            <div id="movie">
              {" "}
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
          </div>
        )}
        {addReview ? <ReviewsBox id={id} /> : <Reviews id={id} />}
        <div className="btns_area">
          <button onClick={addReviewHandler}>{addRevBack}</button>
          <button>Watch all reviews</button>
        </div>
      </div>
    </>
  );
};

export default MovieScreen;
