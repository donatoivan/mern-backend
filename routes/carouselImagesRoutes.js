const express = require('express');
const router = express.Router();

const {
  createNewCarouselImage,
  getAllCarouselImages,
  updateCarouselImage
} = require('../controllers/carouselImagesController');

router.post('/new', createNewCarouselImage);
router.get('/', getAllCarouselImages);
router.put('/:id', updateCarouselImage);

module.exports = router;