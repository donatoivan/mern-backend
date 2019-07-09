const express = require('express');
const router = express.Router();

const { createNewAbout, getAllAbouts } = require('../controllers/aboutsController');

router.post('/about', createNewAbout);
router.get('/about', getAllAbouts)

module.exports = router

