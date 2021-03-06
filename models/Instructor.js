const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Instructor", InstructorSchema);
