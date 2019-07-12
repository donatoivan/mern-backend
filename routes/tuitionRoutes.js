const express = require("express");
const router = express.Router();

const {
  addNewTuition,
  getAllTuitions,
  updateTuition,
  getOneTuition,
  deleteOneTuition
} = require("../controllers/tuitionsController");

router.post("/new", addNewTuition);
router.get("/", getAllTuitions);
router.put("/:id", updateTuition);
router.get("/:id", getOneTuition);
router.delete("/:id", deleteOneTuition);

module.exports = router;
