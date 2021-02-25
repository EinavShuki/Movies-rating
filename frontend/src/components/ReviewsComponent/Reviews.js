import "./Reviews.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../Rating/Rating";

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [revToShow, setRevToShow] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % revToShow.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [revToShow]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const config = {
          Headers: { "Content-Type": "aplication/json" },
        };
        const { data } = await axios.get(`/api/movies/${id}/reviews`, config);
        setReviews(data.reviews);
      } catch (err) {
        console.log(err);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    console.log(reviews.filter((review) => review.comment.length <= 100));
    setRevToShow(reviews.filter((review) => review.comment.length <= 100));
    console.log(revToShow);
  }, [reviews]);

  return (
    <>
      <div className="reviews_box">
        {" "}
        <img src="\img\star.png" id="star" />
        <div className="single_review">
          <div id="review_p">
            {revToShow.length > 0 ? (
              <span>
                <Rating
                  className="fadeIn"
                  id="rev_rating"
                  value={revToShow[index].rating}
                />
                <div className="review_q">
                  <img src="\img\quotes-right.png" id="left_q" />
                  <h3
                    className="fadeIn"
                    style={{ textAlign: "center", padding: "0.3rem" }}
                  >
                    {revToShow[index].comment}
                  </h3>
                  <img src="\img\quotes-right.png" id="right_q" />
                </div>
                <p
                  className="fadeIn"
                  style={{
                    position: "relative",
                    textAlign: "end",
                    marginTop: "1rem",
                    fontStyle: "italic",
                    paddingRight: "0.3rem",
                  }}
                >
                  {revToShow[index].name}
                </p>
              </span>
            ) : (
              <h3 style={{ textAlign: "center" }}>No highlight reviews yet</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;