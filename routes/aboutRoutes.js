const express = require("express");
const router = express.Router();

const {
  createNewAbout,
  getAllAbouts,
  updateAbout
} = require("../controllers/aboutsController");

router.post("/new", createNewAbout);
router.get("/", getAllAbouts);
router.put("/:id", updateAbout);



module.exports = router;
