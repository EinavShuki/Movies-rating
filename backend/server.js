import express from "express";
import dotenv from "dotenv";
import moviesRoutes from "./router/moviesRoutes.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

console.log("in server");

app.use("/api/movies", moviesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
