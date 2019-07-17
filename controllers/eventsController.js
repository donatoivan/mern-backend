const Event = require("../models/Event");

// Add a new Event
const addNewEvent = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const newEvent = await Event.create({
      name,
      description,
      image
    });
    return res.status(201).json(`Successfully created new Event: ${newEvent}`);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(`Could not create new Event ${error.message}`);
  }
};

//Get details of all Events
const getAllEvent = async (req, res) => {
  try {
    const event = await Event.find();
    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json(`Could not get Event ${error.message}`);
  }
};

// Get details of one Event
const getOneEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOne({ _id: id });
  return res.status(200).json(event);
};

// Update details of a single Event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await Event.updateOne({ _id: id }, payload);
    return res.status(200).json(`Successfully updated Event ${id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Could not update Event ${error.message}`);
  }
};

//Delete an Event
const deleteOneEvent = async (req, res) => {
  const { id } = req.params;
  try {
    let event = await Event.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!event) {
      return res.status(404).json(`Cannot find Event ${event.id}`);
    } else {
      return res.status(200).json(`Event is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewEvent,
  getAllEvent,
  getOneEvent,
  updateEvent,
  deleteOneEvent
};
