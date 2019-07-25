const express = require("express");
const app = new express();
const nodeMailer = require("nodemailer");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const aboutRoutes = require("./routes/aboutRoutes");
// const venueRoutes = require("./routes/venueRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const classRoutes = require("./routes/classRoutes");
const tuitionRoutes = require("./routes/tuitionRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const faqRoutes = require("./routes/faqRoutes");
const carouselImages = require("./routes/carouselImagesRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use("/about", aboutRoutes);
// app.use("/venue", venueRoutes);
app.use("/instructor", instructorRoutes);
app.use("/class", classRoutes);
app.use("/tuition", tuitionRoutes);
app.use("/event", eventRoutes);
app.use("/gallery", galleryRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/faq", faqRoutes);
app.use("/carousel-images", carouselImages);
app.use("/images", imageRoutes);

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

app.post("/send-email", function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // sender's account
      user: "pooface2019@gmail.com",
      pass: "Coderacademy2019"
    }
  });
  console.log(req);
  console.log(`subject ${req.body.email}`);
  console.log(`message ${JSON.stringify(req.body.description)} `);

  let mailOptions = {
    // recipient's account
    to: "sinyin81@gmail.com",
    subject: req.body.email,
    html:
      `<h1 >Message from BCMA</h1>` +
      `<h2>${req.body.description}</h2>` +
      `<h1>Email Contact:</h1>` +
      `<h2>${req.body.email}</h2>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.writeHead(301, { Location: "index.html" });
  res.end();
});

app.use((req, res, next) => {
  res.status(404).json({ error: "not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

module.exports = app;
