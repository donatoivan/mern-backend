const express = require("express");
const router = express.Router();

const {
  addNewEvent,
  getAllEvent,
  getOneEvent,
  updateEvent,
  deleteOneEvent
} = require("../controllers/eventsController");

router.post("/new", addNewEvent);
router.get("/", getAllEvent);
router.get("/:id", getOneEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteOneEvent);

module.exports = router;

