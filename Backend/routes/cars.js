const express = require('express');
const multer = require('multer');
const path = require('path');
const Car = require('../models/car');
const auth = require('../middleware/auth');

const router = express.Router();

// Set up custom storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Create a new car with multiple images
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);

  const { title, description, tags } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No images uploaded');
  }

  const images = req.files.map(file => `/uploads/${file.filename}`);

  try {
    const car = new Car({
      userId: req.user._id,
      title,
      description,
      tags,
      images,
    });
    await car.save();
    res.send(car);
  } catch (err) {
    console.error('Error saving car:', err);
    res.status(500).send(`Server error: ${err.message}`);
  }
});


// Get all cars of logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user._id });
    res.send(cars);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get a single car by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.params.id, userId: req.user._id });
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Search for cars
router.get('/search', auth, async (req, res) => {
  const { keyword } = req.query;
  try {
    const cars = await Car.find({
      userId: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } }
      ]
    });
    res.send(cars);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update car
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map(file => `/uploads/${file.filename}`);

  try {
    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { title, description, tags, images } },
      { new: true }
    );
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete car
router.delete('/:id', auth, async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!car) return res.status(404).send('Car not found');
    res.send('Car deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
