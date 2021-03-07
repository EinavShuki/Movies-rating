import express from "express";
import dotenv from "dotenv";
import moviesRoutes from "./router/moviesRoutes.js";
import connectDB from "./config/db.js";
import path from "path";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

// console.log("in server");

app.use("/api/movies", moviesRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
