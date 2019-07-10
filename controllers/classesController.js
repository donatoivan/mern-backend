const Class = require("../models/Class");

const addNewClass = async (req, res) => {
  console.log("createNewClass");
  try {
    const {
      name,
      description,
      category,
      price,
      instructor,
      date,
      time,
      image,
      venue
    } = req.body;
    const newClass = await Class.create({
      name,
      description,
      category,
      price,
      instructor,
      date,
      time,
      image,
      venue
    });
    res.status(201).send(`Successfully create new Class ${newClass}`);
  } catch (error) {
    res.status(400).send(`Could not create new Class ${error.message}`);
  }
};

const getAllClasses = async (req, res) => {
  console.log("getAllClasses");
  try {
    const classes = await Class.find();
    res.status(200).send(classes);
  } catch (error) {
    res.status(400).send(`Could not get Class ${error.message}`);
  }
};

const getOneClass = async (req, res) => {
  console.log("getOneClass");
  const { id } = req.params;
  const oneClass = await Class.findOne({ _id: id });
  console.log(oneClass._id);
  res.status(200).send(oneClass);
};

const updateClass = async (req, res) => {
  console.log("updateClass");
  const { id } = req.params;
  const {
    name,
    description,
    category,
    price,
    instructor,
    date,
    time,
    image,
    venue
  } = req.body;
  const newName = name;
  const newDescription = description;
  const newCategory = category;
  const newPrice = price;
  const newInstructor = instructor;
  const newDate = date;
  const newTime = time;
  const newImage = image;
  const newVenue = venue;
  try {
    await Class.updateOne(
      { _id: id },
      {
        name: newName,
        description: newDescription,
        category: newCategory,
        price: newPrice,
        instructor: newInstructor,
        date: newDate,
        time: newTime,
        image: newImage,
        venue: newVenue
      }
    );
    res
      .status(200)
      .send(
        `Successfully updated ${newName}, ${newDescription}, ${newImage},${newVenue}`
      );
  } catch (error) {
    res.status(400).send(`Could not update Class ${error.message}`);
  }
};

const deleteOneClass = async (req, res) => {
  console.log("deleteOneClass");
  const { id } = req.params;
  try {
    let oneClass = await Class.findOneAndRemove({ _id: id },,
      { useFindAndModify: false });
    console.log(oneClass);
    if (!oneClass) {
      return res.status(404).send(`Cannot find Class`);
    } else {
      return res.status(200).send(`Class is successfully deleted`);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`There has been an error: ${err.message}`);
  }
};

module.exports = {
  addNewClass,
  getAllClasses,
  updateClass,
  getOneClass,
  deleteOneClass
};
