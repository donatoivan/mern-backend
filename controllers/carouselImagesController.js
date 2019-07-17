const CarouselImage = require('../models/CarouselImage');

// Create a Carousel Image

const createNewCarouselImage = async (req, res) => {
  try {
    const{ image } = req.body;
    const newImage = await CarouselImage.create({ image })
    return res.status(201).json(`Successfully created Carousel Image: ${newImage.image}`);
  } catch (error) {
    console.log(error)
    return res.status(400).json(`Could not create Carousel Image ${error.message}`)
  }
};

// Get All Carousel Images
const getAllCarouselImages = async (req, res) => {
  console.log('here')
  try {
    const images = await CarouselImage.find();
    console.log(images)
    return res.status(200).json(images)
  } catch (error) {
    console.log(error.message)
    return res.status(400).json(`Could not get Carousel Images ${error.message}`)
  }
};

// Update one Carousel Image

const updateCarouselImage = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const image = await CarouselImage.updateOne({ _id: id}, payload);
    return res.status(200).json(`successfully update Carousel image`)
  } catch (error) {
    return res.status(400).json(`Could not update Carousel Image ${error.message}`)
  }
}

module.exports = {
  createNewCarouselImage,
  getAllCarouselImages,
  updateCarouselImage
}