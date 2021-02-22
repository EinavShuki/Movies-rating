const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());
const API_KEY = "a505e764";
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&type=movie`;

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
