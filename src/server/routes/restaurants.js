const express = require('express');
const restaurants = express.Router();

restaurants
  .route('/')
  .get((req, res) => {
    res.status(200).send('hello from restaurants')
  })

  module.exports = restaurants;