const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  instructor: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "instructor",
    required: true
  },
  date: {
    type: [Date],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  venue: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "venue",
    required: true
  }
});

module.exports = mongoose.model("Class", ClassSchema);
