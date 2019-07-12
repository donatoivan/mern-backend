const express = require("express");
const router = express.Router();

const {
  addNewGallery,
  getAllGalleries,
  updateGallery,
  getOneGallery,
  deleteOneGallery
} = require("../controllers/galleriesController");

router.post("/new", addNewGallery);
router.get("/", getAllGalleries);
router.put("/:id", updateGallery);
router.get("/:id", getOneGallery);
router.delete("/:id", deleteOneGallery);

module.exports = router;
