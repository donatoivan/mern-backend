const express = require("express");
const router = express.Router();

const {
  addNewClass,
  getAllClasses,
  updateClass,
  getOneClass,
  deleteOneClass
} = require("../controllers/classesController");

router.post("/new", addNewClass);
router.get("/", getAllClasses);
router.put("/:id", updateClass);
router.get("/:id", getOneClass);
router.delete("/:id", deleteOneClass);

module.exports = router;
