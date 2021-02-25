import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    comment: { type: String, required: true },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const AllReviewsSchema = mongoose.Schema(
  {
    movie: {
      type: String,
      required: true,
      default: "",
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", AllReviewsSchema);

export default Reviews;
