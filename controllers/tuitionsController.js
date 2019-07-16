const Tuition = require("../models/Tuition");

// Add a new Tuition
const addNewTuition = async (req, res) => {
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
      .json(`Successfully create new Tuition ${newTuition}`);
  } catch (error) {
    return res
      .status(400)
      .json(`Could not create new Tuition ${error.message}`);
  }
};

// Get details of all Tuitiones
const getAllTuitions = async (req, res) => {
  try {
    const tuitions = await Tuition.find();
    return res.status(200).json(tuitions);
  } catch (error) {
    return res.status(400).json(`Could not get Tuition ${error.message}`);
  }
};

// Get details of one Tuition
const getOneTuition = async (req, res) => {
  const { id } = req.params;
  const oneTuition = await Tuition.findOne({ _id: id });
  return res.status(200).json(oneTuition);
};

// Update details of a single Tuition
const updateTuition = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await Tuition.updateOne({ _id: id }, payload);
    return res.status(200).json(`Successfully updated Tuition ${id}`);
  } catch (error) {
    return res.status(400).json(`Could not update Tuition ${error.message}`);
  }
};

// Delete a Tuition
const deleteOneTuition = async (req, res) => {
  const { id } = req.params;
  try {
    let oneTuition = await Tuition.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!oneTuition) {
      return res.status(404).json(`Cannot find Tuition`);
    } else {
      return res.status(200).json(`Tuition is successfully deleted`);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(`There has been an error: ${err.message}`);
  }
};

module.exports = {
  addNewTuition,
  getAllTuitions,
  updateTuition,
  getOneTuition,
  deleteOneTuition
};
