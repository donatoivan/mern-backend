const Gallery = require("../models/Gallery");

// Add a new Gallery
const addNewGallery = async (req, res) => {
  try {
    const { image } = req.body;
    const newGallery = await Gallery.create({
      image
    });
    return res
      .status(201)
      .send(`Successfully create new Gallery ${newGallery}`);
  } catch (error) {
    return res
      .status(400)
      .send(`Could not create new Gallery ${error.message}`);
  }
};

// Get details of all Galleries
const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    return res.status(200).send(galleries);
  } catch (error) {
    return res.status(400).send(`Could not get Galleries ${error.message}`);
  }
};

// Get details of one Gallery
const getOneGallery = async (req, res) => {
  const { id } = req.params;
  const gallery = await Gallery.findOne({ _id: id });
  console.log(gallery._id);
  return res.status(200).send(gallery);
};

// Update details of a Gallery
const updateGallery = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await Gallery.updateOne({ _id: id }, payload);
    return res.status(200).send(`Successfully updated Gallery ${id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Could not update Gallery ${error.message}`);
  }
};

// Delete a Gallery
const deleteOneGallery = async (req, res) => {
  const { id } = req.params;
  try {
    let gallery = await Gallery.findOneAndRemove(
      { _id: id },
      { useFindAndModify: false }
    );
    if (!gallery) {
      return res.status(404).send(`Cannot find Gallery ${gallery.id}`);
    } else {
      return res.status(200).send(`Gallery is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewGallery,
  getAllGalleries,
  updateGallery,
  getOneGallery,
  deleteOneGallery
};
