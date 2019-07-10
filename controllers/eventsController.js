const Event = require("../models/Event");

const addNewEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      date,
      time,
      price,
      venue,
      past
    } = req.body;

    const newEvent = await Event.create({
      name,
      description,
      image,
      date,
      time,
      price,
      venue,
      past
    });
    res.status(201).send(`Successfully created new Event: ${newEvent}`);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(`Could not create new Event ${error.message}`);
  }
};

const getAllEvent = async (req, res) => {
  try {
    const event = await Event.find();
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(`Could not get Event ${error.message}`);
  }
};

const getOneEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findOne({ _id: id });
  console.log(event._id);
  res.status(200).send(event);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, date, time, price, venue, past } = req.body;
  const newName = name;
  const newDescription = description;
  const newImage = image;
  const newDate = date;
  const newTime = time;
  const newPrice = price;
  const newVenue = venue;
  const newPast = past;

  try {
    await Event.updateOne(
      { _id: id },
      {
        name: newName,
        description: newDescription,
        image: newImage,
        date: newDate,
        time: newTime,
        price: newPrice,
        venue: newVenue,
        past: newPast
      }
    );
    res
      .status(200)
      .send(
        `Successfully updated ${newName}, ${newDescription}, ${newImage},${newVenue}`
      );
  } catch (error) {
    console.log(error);
    res.status(400).send(`Could not update Event ${error.message}`);
  }
};

const deleteOneEvent = async (req, res) => {
  const { id } = req.params;
  try {
    let event = await Event.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!event) {
      return res.status(404).send(`Cannot find Event ${eenue.id}`);
    } else {
      return res.status(200).send(`Event is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewEvent,
  getAllEvent,
  getOneEvent,
  updateEvent,
  deleteOneEvent
};
