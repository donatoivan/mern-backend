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
      .json(`Successfully create new Gallery ${newGallery}`);
  } catch (error) {
    return res
      .status(400)
      .json(`Could not create new Gallery ${error.message}`);
  }
};

// Get details of all Galleries
const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    return res.status(200).json(galleries);
  } catch (error) {
    return res.status(400).json(`Could not get Galleries ${error.message}`);
  }
};

// Get details of one Gallery
const getOneGallery = async (req, res) => {
  const { id } = req.params;
  const gallery = await Gallery.findOne({ _id: id });
  return res.status(200).json(gallery);
};

// Update details of a Gallery
const updateGallery = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await Gallery.updateOne({ _id: id }, payload);
    return res.status(200).json(`Successfully updated Gallery ${id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Could not update Gallery ${error.message}`);
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
      return res.status(404).json(`Cannot find Gallery ${gallery.id}`);
    } else {
      return res.status(200).json(`Gallery is successfully deleted`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(`There has been an error: ${error}`);
  }
};

module.exports = {
  addNewGallery,
  getAllGalleries,
  updateGallery,
  getOneGallery,
  deleteOneGallery
};
