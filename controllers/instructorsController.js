const Instructor = require("../models/Instructor");

// Add a new Instructor
const addNewInstructor = async (req, res) => {
  try {
    const { name, description, faculty } = req.body;
    const newInstructor = await Instructor.create({
      name,
      description,
      faculty
    });
    return res
      .status(201)
      .json(`Successfully created new Instructor: ${newInstructor}`);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json(`Could not create new Instructor ${error.message}`);
  }
};

// Get details of all Instructors
const getAllInstructors = async (req, res) => {
  try {
    const instructor = await Instructor.find();
    return res.status(200).json(instructor);
  } catch (error) {
    return res.status(400).json(`Could not get Instructor ${error.message}`);
  }
};

// Get details of one Instructor
const getOneInstructor = async (req, res) => {
  const { id } = req.params;
  const instructor = await Instructor.findOne({ _id: id });
  return res.status(200).json(instructor);
};

// Update details of one Instructor
const updateInstructor = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await Instructor.updateOne({ _id: id }, payload);
    return res.status(200).json(`Successfully updated Instructor ${id}`);
  } catch (error) {
    console.log(error.message);

    return res.status(400).json(`Could not update Instructor ${error.message}`);
  }
};

// Delete an Instructor
const deleteOneInstructor = async (req, res) => {
  const { id } = req.params;
  try {
    let instructor = await Instructor.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!instructor) {
      return res.status(404).json(`Cannot find Instructor ${instructor.id}`);
    } else {
      return res.status(200).json(`Instructor is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewInstructor,
  getAllInstructors,
  getOneInstructor,
  updateInstructor,
  deleteOneInstructor
};
