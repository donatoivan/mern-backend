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
  image: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Instructor", InstructorSchema);
