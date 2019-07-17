const About = require("../models/About");

// Create an About
const createNewAbout = async (req, res) => {
  try {
    const { description } = req.body;
    const newAbout = await About.create({ description });
    return res.status(201).json(`Successfully created about: ${newAbout}`);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`Could not create new About ${error.message}`);
  }
};

// Get all About details
const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    return res.status(200).json(abouts);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`Could not get Abouts ${error.message}`);
  }
};

// Get details of one About
const getOneAbout = async (req, res) => {
  try {
    const { id } = req.params;
  const oneAbout = await About.findOne({ _id: id });
  console.log(oneAbout._id);
  return res.status(200).json(oneAbout);
  } catch (error) {
    console.log(error.message)
    return res.status(404).json(`Could no find about ${error.message}`)
  }
};

// Update About details
const updateAbout = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    let about = await About.updateOne({ _id: id }, payload);
    return res.status(200).json(`Successfully updated About`);
  } catch (error) {
    return res.status(400).json(`Could not update About ${error.message}`);
  }
};

// Delete an About
const deleteOneAbout = async (req, res) => {
  const { id } = req.params;
  try {
    let oneAbout = await About.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!oneAbout) {
      return res.status(404).json('Cannot find About');
    } else {
      return res.status(200).json('About is successfully deleted');
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`There has been an error: ${error.message}`);
  }
};

module.exports = {
  createNewAbout,
  getAllAbouts,
  getOneAbout,
  updateAbout,
  deleteOneAbout
};
