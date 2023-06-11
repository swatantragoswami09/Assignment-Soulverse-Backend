console.log("hi there review");
const Review = require("../models/reviewModel");
const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddlewares = require("../middlewares/authMiddlewares");
const mongoose = require("mongoose");

// add review
router.post("/add", authMiddlewares, async (req, res) => {
  try {
    req.body.user = req.userId;
    const newReview = new Review(req.body);
    await newReview.save();

    // calculate the average rating and update in movie
    const averageRating = await Review.aggregate([
      {
        $match: {
          movie: new mongoose.Types.ObjectId(req.body.movie),
        },
      },
      {
        $group: {
          _id: "$movie",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    const averageRatingvalue = averageRating[0]?.averageRating || 0;

    await Movie.findOneAndUpdate(
      { _id: req.body.movie },
      {
        $set: {
          rating: averageRatingvalue,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Review added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get all reviews bymovie id
router.get("/get", async () => {
  try {
    const { movie } = req.query;

    const reviews = await Review.find({ movie })
      .populate("user")
      .populate("movie");

    res.status(200).json({ data: reviews, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
