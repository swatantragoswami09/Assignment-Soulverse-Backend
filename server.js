const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const artistsRoute = require("./routes/artistsRoute");
const imagesRoute = require("./routes/imagesRoute");
const moviesRoute = require("./routes/moviesRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const filtersRoute = require("./routes/filtersRoute");

app.use("/api/users", usersRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/filters", filtersRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`nodejs Server started on port ${port}`));
