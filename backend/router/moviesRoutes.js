import express from "express";
const router = express.Router();
import {
  getMovies,
  getSingleMovie,
  setMovieReviews,
  getMovieReviews,
} from "../controller/moviesController.js";

router.post("/", getMovies);
router.get("/:id/reviews", getMovieReviews);
router.get("/:id", getSingleMovie).post("/:id", setMovieReviews);

export default router;
