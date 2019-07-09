const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//checks that fields are entered correctly
exports.userChecks = [
  check('username', 'Username is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
];

// creates new user
exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body

  try {
    // see if user exists
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists'}]})
    }

    // create new user
    user = new User({
      username,
      email,
      password
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt)

    await user.save()

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
};
