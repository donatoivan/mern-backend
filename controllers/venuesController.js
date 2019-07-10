const Venue = require("../models/Venue");

const addNewVenue = async (req, res) => {
  try {
    const { name, description, image, address } = req.body;
    const newVenue = await Venue.create({ name, description, image, address });
    res.status(201).send(`Successfully create new Venue ${newVenue}`);
  } catch (error) {
    res.status(400).send(`Could not create new Venue ${error.message}`);
  }
};

const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).send(venues);
  } catch (error) {
    res.status(400).send(`Could not get Venues ${error.message}`);
  }
};

const getOneVenue = async (req, res) => {
  const { id } = req.params;
  const venue = await Venue.findOne({ _id: id });
  console.log(venue._id);
  res.status(200).send(venue);
};

const updateVenue = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, address } = req.body;
  const newName = name;
  const newDescription = description;
  const newImage = image;
  const newAddress = address;
  try {
    await Venue.updateOne(
      { _id: id },
      {
        name: newName,
        description: newDescription,
        image: newImage,
        address: newAddress
      }
    );
    res
      .status(200)
      .send(
        `Successfully updated ${newName}, ${newDescription}, ${newImage},${newAddress}`
      );
  } catch (error) {
    console.log(error);
    res.status(400).send(`Could not update Venue ${error.message}`);
  }
};

const deleteOneVenue = async (req, res) => {
  const { id } = req.params;
  try {
    let venue = await Venue.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!venue) {
      return res.status(404).send(`Cannot find Venue ${venue.id}`);
    } else {
      return res.status(200).send(`Venue is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewVenue,
  getAllVenues,
  updateVenue,
  getOneVenue,
  deleteOneVenue
};
