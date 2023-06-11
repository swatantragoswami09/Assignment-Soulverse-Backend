const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
    debutYear: {
      type: Number,
      required: false,
    },
    debutMovie: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("artists", artistSchema);
