const express = require("express");
const mongoose = require('mongoose');
const app = new express();
const PORT = process.env.PORT || 5000;


const cors = require('cors');

app.use(express.json())

const aboutRoutes = require('./routes/aboutRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const mongoPROD_URI =
  "mongodb+srv://admin:123456pop@ballarat-5i5ts.mongodb.net/test?retryWrites=true&w=majority";

  
mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});


// app.get('/', (req, res) => {
//   res.send('Api running')
// })

app.use('/about', aboutRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
