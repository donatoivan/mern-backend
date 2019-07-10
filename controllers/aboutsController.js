const About = require("../models/About");

// Create an About
const createNewAbout = async (req, res) => {
  try {
    const { description } = req.body;
    const newAbout = await About.create({ description });
    return res.status(201).send(`Successfully created about: ${newAbout}`);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(`Could not create new About ${error.message}`);
  }
};

// Get About details
const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    return res.status(200).json(abouts);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`Could not get About ${error.message}`);
  }
};

// Update About details
const updateAbout = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const newDescription = description;
  try {
    let about = await About.updateOne(
      { _id: id },
      { description: newDescription }
    );
    return res.status(200).send(`Successfully updated ${newDescription}`);
  } catch (error) {
    return res.status(400).send(`Could not update About ${error.message}`);
  }
};

module.exports = {
  createNewAbout,
  getAllAbouts,
  updateAbout
};
