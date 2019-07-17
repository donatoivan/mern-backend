const express = require('express');
const router = express.Router();

const {
  createNewFaq,
  getAllFaqs,
  getOneFaq,
  updateFaq,
  deleteOneFaq
} = require('../controllers/faqsController');

router.post('/new', createNewFaq);
router.get('/', getAllFaqs);
router.get('/:id', getOneFaq);
router.put('/:id', updateFaq);
router.delete('/:id', deleteOneFaq);

module.exports = router;