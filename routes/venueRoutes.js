const express = require("express");
const router = express.Router();

const {
  addNewVenue,
  getAllVenues,
  updateVenue,
  getOneVenue,
  deleteOneVenue
} = require("../controllers/venuesController");

router.post("/new", addNewVenue);
router.get("/", getAllVenues);
router.put("/:id", updateVenue);
router.get("/:id", getOneVenue);
router.delete("/:id", deleteOneVenue);

module.exports = router;
