const express = require('express');
const router = express.Router();

const { createNewAbout, getAllAbouts } = require('../controllers/aboutsController');

router.post('/', createNewAbout);
router.get('/', getAllAbouts)

module.exports = router

