const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
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
  date: {
    type: [Date],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  venue: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "venue",
    required: true
  },
  past: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Event", EventSchema);
