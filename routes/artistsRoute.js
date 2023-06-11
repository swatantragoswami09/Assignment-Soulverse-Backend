const Artists = require("../models/artistsModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddlewares");

// add new artist
router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Artists.create(req.body);
    res.json({ message: "Artist added successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

// get all artists
router.get("/", authMiddleware, async (req, res) => {
  try {
    const artist = await Artists.find().sort({ createdAt: -1 });
    res.json({ data: artist, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get artist by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const artist = await Artists.findById(req.params.id);
    res.json({ data: artist, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//  update artist by id
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    await Artists.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Artist update successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// delete artist by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Artists.findByIdAndDelete(req.params.id);
    res.json({ message: "Artist deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
