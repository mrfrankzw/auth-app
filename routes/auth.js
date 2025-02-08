const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.redirect("http://wa.me/263719647303?text=Mr+Frank+Salute+You"); // Redirect to d.com on successful login
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
