const express = require("express");

const app = new express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

const mongoPROD_URI =
  "mongodb+srv://admin:123456pop@ballarat-5i5ts.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
