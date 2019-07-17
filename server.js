const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 5000;
const About = require("./models/About");

const mongoPROD_URI =
  "mongodb+srv://admin:admin@ballarat-5i5ts.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
