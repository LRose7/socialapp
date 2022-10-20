const router = require('express').Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/User");

// @route   POST /auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async(req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new User(req.body);
  const {username} = req.body
  try {
    // Check if user exists
    const oldUser = await User.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // add new user
    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /auth/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      // check for user
      const user = await User.findOne({ username: username });
      if(user) {
         // check password
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
          res.status(400).json({ msg: 'Wrong password!' });
        } else {
          const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWTKEY,
            { expiresIn: "1h"}
          );
          res.status(200).json({ user, token });
        }
      } else {
        res.status(404).json({msg:'User not found'});
      }
  } catch (error) {
    res.status(500).json(error)
  }  
});

module.exports = router