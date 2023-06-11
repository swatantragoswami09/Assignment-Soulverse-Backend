const router = require("express").Router();
const Movie = require("../models/movieModel");
const Artist = require("../models/artistsModel");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get("/", authMiddlewares, async (req, res) => {
  try {
    const search = req.query.search || "";
    const [movies, artists] = await Promise.all([
      Movie.find({
        name: {
          $regex: search,
          $options: "i",
        },
      }),
      Artist.find({
        name: {
          $regex: search,
          $options: "i",
        },
      }),
    ]);
    res.status(200).send({
      data: {
        movies: movies || [],
        artists: artists || [],
      },
      success: true,
    });
  } catch (error) {
    res.status(500).send({ error: error.message, success: false });
  }
});
module.exports = router;
