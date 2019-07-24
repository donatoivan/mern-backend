const express = require("express");
const app = new express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const aboutRoutes = require("./routes/aboutRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const classRoutes = require("./routes/classRoutes");
const tuitionRoutes = require("./routes/tuitionRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const carouselImages = require('./routes/carouselImagesRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use("/about", aboutRoutes);
app.use("/instructor", instructorRoutes);
app.use("/class", classRoutes);
app.use("/tuition", tuitionRoutes);
app.use("/event", eventRoutes);
app.use("/gallery", galleryRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use('/faq', faqRoutes);
app.use('/carousel-images', carouselImages);
app.use("/image", imageRoutes);

app.get("/", (req, res) => {
  res.send("Api running");
});

app.post("/seed", async (req, res) => {
  const { description } = req.body;
  const aboutDescription = new About({ description: description });
  const newAboutDescription = await aboutDescription.save();
  res.json("successfully added description" + newAboutDescription);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = app;
