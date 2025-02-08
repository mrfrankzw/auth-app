const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  class: { type: String, required: true },
  subjects: [
    {
      name: { type: String, required: true },
      mark: { type: Number, required: true },
      grade: { type: String, default: "" },
    },
  ],
});

// Automatically calculate grades before saving
studentSchema.pre("save", function (next) {
  this.subjects.forEach((subject) => {
    if (subject.mark >= 80) {
      subject.grade = "A";
    } else if (subject.mark >= 60) {
      subject.grade = "B";
    } else {
      subject.grade = "C";
    }
  });
  next();
});

module.exports = mongoose.model("Student", studentSchema);
