const express = require('express');
const SnakeLog = require('../models/SnakeLog');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const logs = await SnakeLog.find().sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/save-log', async (req, res) => {
  const { imageUrl, prediction, username } = req.body;

  if (!username) {
    return res.status(400).json({ msg: 'Username is required' });
  }

  try {
    const newSnakeLog = new SnakeLog({
      username: username,
      imageUrl: imageUrl,
      prediction: prediction,
    });

    await newSnakeLog.save();

    res.json({ success: true, message: 'Log saved successfully' });
  } catch (error) {
    console.error('Error saving log:', error.message);
    res.status(500).json({ msg: 'Failed to save log' });
  }
});

module.exports = router;
