const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    });

    res.status(201).json({
      accessToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        msg: 'User registered successfully',
        //okkk
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '22s',
    });

    res.json({ accessToken, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
