const express = require("express");
const router = express.Router();

const {
  addNewInstructor,
  getAllInstructors,
  getOneInstructor,
  updateInstructor,
  deleteOneInstructor
} = require("../controllers/instructorsController");

router.post("/new", addNewInstructor);
router.get("/", getAllInstructors);
router.get("/:id", getOneInstructor);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteOneInstructor);

module.exports = router;
