const express = require("express");
const mongoose = require("mongoose");
const app = new express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const About = require("./models/About");

app.use(express.json());

const aboutRoutes = require("./routes/aboutRoutes");
const venueRoutes = require("./routes/venueRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const classRoutes = require("./routes/classRoutes");
const tuitionRoutes = require("./routes/tuitionRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");


const mongoPROD_URI =
  "mongodb+srv://admin:admin@ballarat-5i5ts.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.get("/", (req, res) => {
  res.send("Api running");
});

app.post("/seed", async (req, res) => {
  const { description } = req.body;
  const aboutDescription = new About({ description: description });
  console.log(description);
  const newAboutDescription = await aboutDescription.save();
  res.json("successfully added description" + newAboutDescription);
});

app.use("/about", aboutRoutes);
app.use("/venue", venueRoutes);
app.use("/instructor", instructorRoutes);
app.use("/class", classRoutes);
app.use("/tuition", tuitionRoutes);
app.use("/event", eventRoutes);
app.use("/gallery", galleryRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
