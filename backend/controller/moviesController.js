import axios from "axios";
import Reviews from "../models/reviewsModel.js";

const getMovies = async (req, res, next) => {
  try {
    const { q } = req.body;
    const API_KEY = process.env.API_KEY;
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&type=movie`;

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(URL, config);

    if (data) res.json(data);
    else {
      res.status(404).json({ message: "movies are not found" });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

const getSingleMovie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const API_KEY = process.env.API_KEY;
    const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&type=movie`;
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.get(URL, config);

    if (data) res.json(data);
    else {
      res.status(404).json({ message: "movie not found" });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};
const getMovieReviews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reviews = await Reviews.findOne({ movie: id });
    res.json(reviews);
  } catch (error) {
    console.log(error);
  }
  next();
};
const setMovieReviews = async (req, res, next) => {
  try {
    const { name, rating, comment } = req.body;
    const id = req.params.id;
    // searching bt the id that provided by APIMovies
    let movie = await Reviews.findOne({ movie: id });

    if (!movie) {
      //create movieReviewsSchema
      movie = await Reviews.create({
        movie: id,
      });
    }

    const review = {
      name,
      comment,
      rating: Number(rating),
    };

    movie.reviews.push(review);

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
    // res.status(201).json({ message: 'Review added' })
  } catch (error) {
    console.log(error);
  }
  next();
};

export { getMovies, getSingleMovie, getMovieReviews, setMovieReviews };
