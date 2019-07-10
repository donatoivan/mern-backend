const Instructor = require("../models/Instructor");

const addNewInstructor = async (req, res) => {
  try {
    const { name, description, image, expertise } = req.body;
    const newInstructor = await Instructor.create({
      name,
      description,
      image,
      expertise
    });
    res
      .status(201)
      .send(`Successfully created new Instructor: ${newInstructor}`);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(`Could not create new Instructor ${error.message}`);
  }
};

const getAllInstructors = async (req, res) => {
  try {
    const instructor = await Instructor.find();
    res.status(200).send(instructor);
  } catch (error) {
    res.status(400).send(`Could not get Instructor ${error.message}`);
  }
};

const getOneInstructor = async (req, res) => {
  const { id } = req.params;
  const instructor = await Instructor.findOne({ _id: id });
  console.log(instructor._id);
  res.status(200).send(instructor);
};

const updateInstructor = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, expertise } = req.body;
  const newName = name;
  const newDescription = description;
  const newImage = image;
  const newExpertise = expertise;
  try {
    await Instructor.updateOne(
      { _id: id },
      {
        name: newName,
        description: newDescription,
        image: newImage,
        expertise: newExpertise
      }
    );
    res
      .status(200)
      .send(
        `Successfully updated ${newName}, ${newDescription}, ${newImage},${newExpertise}`
      );
  } catch (error) {
    console.log(error.message);

    res.status(400).send(`Could not update Instructor ${error.message}`);
  }
};

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
