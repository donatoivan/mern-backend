const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("About", AboutSchema);
