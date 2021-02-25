import "./ReviewsBox.css";
import React, { useState } from "react";
import axios from "axios";

const ReviewsBox = ({ id }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (name === "" || rating === 0 || rating === "" || comment === "") {
      setMessage("All fields reqiured");
      return false;
    } else return true;
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const response = await axios.post(
          `/api/movies/${id}`,
          { name, comment, rating },
          config
        );

        if (response.status == 201) {
          setLoading(false);
          setSubmitted(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const textareaHandler = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length === 200) setMessage("Limit text to 200 tabs");
    setComment(e.target.value);
  };

  return (
    <>
      {loading ? (
        <div className="loader_submit"></div>
      ) : submitted ? (
        <>
          <h1
            style={{
              position: "relative",
              top: "10rem",
              right: "-13rem",
              color: "green",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            the review was submitted successfuly
          </h1>
          <img id="submit_ico" src="\img\checked.png" />
        </>
      ) : (
        <div id="review_box">
          <form onSubmit={submitHandler} id="form_rev">
            <label htmlFor="name">Youre name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="off"
              type="text"
              className="name"
              name="name"
              maxLength="25"
            />
            <label htmlFor="name">Your review</label>
            <textarea
              onChange={textareaHandler}
              value={comment}
              rows="4"
              maxLength="200"
              className="text_rev"
              name="text_rev"
            />
            <button id="submit" type="submit">
              Submit
            </button>
            <h3
              style={{
                display: "inline-block",
                top: "0",
                marginLeft: "1rem",
                color: "red",
              }}
            >
              {message}
            </h3>
          </form>

          <div id="rating_area">
            <label htmlFor="rating">Rate the movie</label>
            <select
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              name="rating"
              id="rating"
              form="form_rev"
            >
              <option value="">select</option>
              <option value="1">1-Not good</option>
              <option value="2">2-Fine</option>
              <option value="3">3-Good</option>
              <option value="4">4-Very Good</option>
              <option value="5">5-Excellent</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsBox;
