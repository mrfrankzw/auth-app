/*const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Serve Dashboard Page
router.get("/deploy", (req, res) => {
  res.sendFile("deploy.html", { root: "./public" });
});

// Add Student Data
router.post("/add-student", async (req, res) => {
  const { name, surname, className, subjects } = req.body;
  try {
    const student = new Student({ name, surname, class: className, subjects });
    await student.save();
    res.status(201).json({ message: "Student data saved successfully", student });
  } catch (err) {
    res.status(500).json({ error: "Error saving student data" });
  }
});

// Get All Students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students" });
  }
});

// Edit Student Data
router.put("/edit-student/:id", async (req, res) => {
  const { id } = req.params;
  const { name, surname, className, subjects } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, surname, class: className, subjects },
      { new: true }
    );
    res.status(200).json({ message: "Student data updated successfully", student });
  } catch (err) {
    res.status(500).json({ error: "Error updating student data" });
  }
});

// Delete Student Data
router.delete("/delete-student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting student data" });
  }
});

module.exports = router;
*/
