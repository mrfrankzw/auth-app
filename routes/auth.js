const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* // Serve Dashboard
router.get("/", (req, res) => {
  res.sendFile("dashboard.html", { root: "./public" });
});

// Serve Deploy
router.get("/", (req, res) => {
  res.sendFile("deploy.html", { root: "./public" });
});
*/
// Serve Home Page
router.get("/", (req, res) => {
  res.sendFile("home.html", { root: "./public" });
});

// Serve Signup Page
router.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: "./public" });
});

// Handle Signup Logic
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    // Send success response
    res.status(201).json({
      message: "Account successfully created",
      username: username,
      password: password, // Note: In production, never send passwords back!
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Serve Login Page
router.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "./public" });
});

// Handle Login Logic
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // If everything is correct, redirect to d.com
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

module.exports = router;
