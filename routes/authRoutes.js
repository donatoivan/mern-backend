const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { authChecks, authenticateUserAndGetToken, getAuthedUser} = require('../controllers/authController');

// get authed users
router.get('/', auth, getAuthedUser);

// login user and generate token
router.post('/', authChecks, authenticateUserAndGetToken)

module.exports = router;