const express = require("express");
const router = express.Router();

const {
  createNewAbout,
  getAllAbouts,
  getOneAbout,
  updateAbout,
  deleteOneAbout
} = require("../controllers/aboutsController");

router.post("/new", createNewAbout);
router.get("/", getAllAbouts);
router.put("/:id", updateAbout);
router.get("/:id", getOneAbout);
router.delete("/:id", deleteOneAbout);

module.exports = router;
