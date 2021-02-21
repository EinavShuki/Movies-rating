import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../components/Rating/Rating";
const MovieScreen = ({ match }) => {
  const API_KEY = "a505e764";
  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${match.params.id}&type=movie`;
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(5);

  useEffect(async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.get(URL, config);
      console.log(data);
      setMovie(data);
      setRating(movie.Ratings[0].Value.split("/", 1)[0]);
    } catch (err) {
      console.log(err);
    }
  }, []);
  //   console.log(movie);
  //   console.log(rating / 2);

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default MovieScreen;
