const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

// Check if input is a valid email
exports.contactCheck = [
  check("email", "Please include a valid email").isEmail(),

  check("description", "Description cannot be empty")
    .not()
    .isEmpty()
];

// Create a Contact
exports.createNewContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, description, createdAt } = req.body;
    const newContact = await Contact.create({ email, description, createdAt });
    return res.status(201).json(`Successfully created a contact ${newContact}`);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json(`Could not create new Contact ${error.message}`);
  }
};

// Get all Contacts

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`Could not get Contacts ${error.message}`);
  }
};
