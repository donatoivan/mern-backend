const express = require('express');
const router = express.Router();

const { registerUser, userChecks } = require('../controllers/usersController')

router.post('/', userChecks, registerUser);

module.exports = router;