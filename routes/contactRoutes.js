const express = require("express");
const router = express.Router();

const {
  contactCheck,
  createNewContact,
  getAllContacts
} = require("../controllers/contactController");

// Create new contact
router.post("/new", contactCheck, createNewContact);

// Get all contacts
router.get("/", getAllContacts);

module.exports = router;
