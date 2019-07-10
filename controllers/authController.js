const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User');

//check input fields
exports.authChecks = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

exports.getAuthedUser = async (req, res) => {
  try {
    // find user info without password
    const user = await User.findById(req.user.id).select('-password');
    //send back user data
    res.send(user)
  } catch(error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

exports.authenticateUserAndGetToken = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  console.log(email)
  try {
    // see if user exists
    let user = await User.findOne({ email })
    console.log(user)
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]})
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload, 
      process.env.jwtSecret,
      { expiresIn: 360000},
      (error, token) => {
        if (error) throw error;
        res.send({ token });
      })
  } catch(error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
  
}
