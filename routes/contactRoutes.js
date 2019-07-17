const express = require('express');
const router = express.Router();

const {
  emailCheck,
  createNewContact,
  getAllContacts
} = require('../controllers/contactController');

// Create new contact
router.post('/new', emailCheck, createNewContact);

// Get all contacts
router.get('/', getAllContacts);

module.exports = router;