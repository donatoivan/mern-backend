const mongoose = require("mongoose");

const FaqsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Faqs", FaqsSchema);
