const Instructor = require("../models/Instructor");

// Add a new Instructor
const addNewInstructor = async (req, res) => {
  try {
    const { name, description, image, expertise } = req.body;
    const newInstructor = await Instructor.create({
      name,
      description,
      image,
      expertise
    });
    return res
      .status(201)
      .send(`Successfully created new Instructor: ${newInstructor}`);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .send(`Could not create new Instructor ${error.message}`);
  }
};

// Get details of all Instructors
const getAllInstructors = async (req, res) => {
  try {
    const instructor = await Instructor.find();
    return res.status(200).send(instructor);
  } catch (error) {
    return res.status(400).send(`Could not get Instructor ${error.message}`);
  }
};

// Get details of one Instructor
const getOneInstructor = async (req, res) => {
  const { id } = req.params;
  const instructor = await Instructor.findOne({ _id: id });
  console.log(instructor._id);
  return res.status(200).send(instructor);
};

// Update details of one Instructor
const updateInstructor = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await Instructor.updateOne({ _id: id }, payload);
    return res.status(200).send(`Successfully updated Instructor ${id}`);
  } catch (error) {
    console.log(error.message);

    return res.status(400).send(`Could not update Instructor ${error.message}`);
  }
};

// Delete an Instructor
const deleteOneInstructor = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(id);
  try {
    let instructor = await Instructor.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!instructor) {
      return res.status(404).send(`Cannot find Instructor ${instructor.id}`);
    } else {
      return res.status(200).send(`Instructor is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewInstructor,
  getAllInstructors,
  getOneInstructor,
  updateInstructor,
  deleteOneInstructor
};
