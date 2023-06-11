const Movie = require("../models/movieModel");
const router = require("express").Router();
const authMiddlewares = require("../middlewares/authMiddlewares");

//  add movie
router.post("/", authMiddlewares, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Movie.create(req.body);
    res
      .status(200)
      .json({ message: "Movie added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//  get all movies
router.get("/", async (req, res) => {
  try {
    console.log("hi there get all movie");
    const movies = await Movie.find()
      .populate("hero")
      .populate("heroine")
      .populate("director")
      .populate("createdBy");
    console.log(movies);
    res.status(200).json({ movies, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//  get movie by id
router.get("/:id", async (req, res) => {
  try {
    console.log("hi there movie by id");
    const movie = await Movie.findById(req.params.id)
      .populate("hero")
      .populate("heroine")
      .populate("director")
      .populate("createdBy");
    res.status(200).json({ movie, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//  update movie
router.put("/:id", authMiddlewares, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Movie updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//  delete movie
router.delete("/:id", authMiddlewares, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Movie deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
