const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');


// Check if input is a valid email
exports.emailCheck = [
  check('email', 'Please include a val;id email').isEmail()
]

// Create a Contact
exports.createNewContact = async (req, res) => {
  try {
    const { email } = req.body;
    const newContact = await Contact.create({ email });
    return res.status(201).json(`Successfully created a contact ${newContact}`);
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(`Could not create new Contact ${error.message}`)
  }
};

// Get all Contacts

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts) 
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(`Could not get Contacts ${error.message}`)
  }
};

