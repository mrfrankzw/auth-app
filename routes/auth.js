const express = require("express");
   const router = express.Router();
   const User = require("../models/User");
   const bcrypt = require("bcryptjs");

   // Serve Signup Page
   router.get("/signup", (req, res) => {
     res.sendFile("signup.html", { root: "./public" });
   });

   // Handle Signup Logic
   router.post("/signup", async (req, res) => {
     const { username, password } = req.body;
     try {
       const user = new User({ username, password });
       await user.save();
       res.redirect("/login");
     } catch (err) {
       res.status(400).send("Error creating user");
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
         res.redirect("http://d.com"); // Redirect to d.com on successful login
       } else {
         res.status(400).send("Invalid credentials");
       }
     } catch (err) {
       res.status(400).send("Error logging in");
     }
   });

   module.exports = router;
