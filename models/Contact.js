const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Contact", ContactSchema);