import React from "react";
import Rating from "../Rating/Rating";
import "./AllReviews.css";

const AllReviews = ({ reviews }) => {
  return (
    <div>
      {reviews.length > 0 ? (
        <table id="table_reviews">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rate</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => {
              return (
                <tr key={index}>
                  <th>{review.name}</th>
                  <td style={{ textAlign: "center" }}>
                    <Rating value={review.rating} />
                  </td>
                  <td>{review.comment}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>No reviews yet..</h1>
      )}
    </div>
  );
};

export default AllReviews;
