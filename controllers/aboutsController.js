const About = require("../models/About");

const createNewAbout = async (req, res) => {
  try {
    const { description } = req.body;
    const newAbout = await About.create({ description });
    res.status(201).send(`Successfully created about: ${newAbout}`);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(`Could not create new About ${error.message}`);
  }
};

const getAllAbouts = async (req, res) => {
  try {
    const abouts = await About.find();
    res.status(200).send(abouts);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(`Could not get About ${error.message}`);
  }
};

const updateAbout = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const newDescription = description;
  try {
    let about = await About.updateOne(
      { _id: id },
      { description: newDescription }
    );
  } catch (error) {
    res.status(400).send(`Could not update About ${error.message}`);
  }
};

module.exports = {
  createNewAbout,
  getAllAbouts,
  updateAbout
};
