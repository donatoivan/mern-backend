const Tuition = require("../models/Tuition");

// Add a new Tuition
const addNewTuition = async (req, res) => {
  console.log("createNewTuition");
  try {
    const { name, description, category, image } = req.body;
    const newTuition = await Tuition.create({
      name,
      description,
      category,
      image
    });
    return res
      .status(201)
      .send(`Successfully create new Tuition ${newTuition}`);
  } catch (error) {
    return res
      .status(400)
      .send(`Could not create new Tuition ${error.message}`);
  }
};

// Get details of all Tuitiones
const getAllTuitions = async (req, res) => {
  console.log("getAllTuitions");
  try {
    const tuitions = await Tuition.find();
    return res.status(200).send(tuitions);
  } catch (error) {
    return res.status(400).send(`Could not get Tuition ${error.message}`);
  }
};

// Get details of one Tuition
const getOneTuition = async (req, res) => {
  console.log("getOneTuition");
  const { id } = req.params;
  const oneTuition = await Tuition.findOne({ _id: id });
  console.log(oneTuition._id);
  return res.status(200).send(oneTuition);
};

// Update details of a single Tuition
const updateTuition = async (req, res) => {
  console.log("updateTuition");
  const { id } = req.params;
  const payload = req.body;

  try {
    await Tuition.updateOne({ _id: id }, payload);
    return res.status(200).send(`Successfully updated Tuition ${id}`);
  } catch (error) {
    return res.status(400).send(`Could not update Tuition ${error.message}`);
  }
};

// Delete a Tuition
const deleteOneTuition = async (req, res) => {
  console.log("deleteOneTuition");
  const { id } = req.params;
  try {
    let oneTuition = await Tuition.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    console.log(oneTuition);
    if (!oneTuition) {
      return res.status(404).send(`Cannot find Tuition`);
    } else {
      return res.status(200).send(`Tuition is successfully deleted`);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`There has been an error: ${err.message}`);
  }
};

module.exports = {
  addNewTuition,
  getAllTuitions,
  updateTuition,
  getOneTuition,
  deleteOneTuition
};
