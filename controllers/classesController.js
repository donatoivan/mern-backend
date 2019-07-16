const Class = require("../models/Class");

// Add a new Class
const addNewClass = async (req, res) => {
  try {
    const { name, description, category, image } = req.body;
    const newClass = await Class.create({
      name,
      description,
      category,
      image
    });
    return res.status(201).json(`Successfully create new Class ${newClass}`);
  } catch (error) {
    return res.status(400).json(`Could not create new Class ${error.message}`);
  }
};

// Get details of all Classes
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(400).json(`Could not get Class ${error.message}`);
  }
};

// Get details of one Class
const getOneClass = async (req, res) => {
  const { id } = req.params;
  const oneClass = await Class.findOne({ _id: id });
  return res.status(200).json(oneClass);
};

// Update details of a single Class
const updateClass = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await Class.updateOne({ _id: id }, payload);
    return res.status(200).json(`Successfully updated Class ${id}`);
  } catch (error) {
    return res.status(400).json(`Could not update Class ${error.message}`);
  }
};

// Delete a Class
const deleteOneClass = async (req, res) => {
  const { id } = req.params;
  try {
    let oneClass = await Class.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!oneClass) {
      return res.status(404).json(`Cannot find Class`);
    } else {
      return res.status(200).json(`Class is successfully deleted`);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(`There has been an error: ${err.message}`);
  }
};

module.exports = {
  addNewClass,
  getAllClasses,
  updateClass,
  getOneClass,
  deleteOneClass
};
