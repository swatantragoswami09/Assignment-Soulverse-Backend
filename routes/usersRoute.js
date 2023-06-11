const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddlewares");

// Register
router.post("/register", async (req, res) => {
  try {
    //  check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) throw new Error("User with this email already exists ");

    // Hash Password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Create new User
    await User.create(req.body);

    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User with this email does not exist");

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Invalid Password");

    // create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// Get current user (Protected route)
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
