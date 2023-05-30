// routes/kaziRoutes.js
const express = require('express');
const router = express.Router();
const Kazi = require('../models/kazi');

router.post('/', async (req, res) => {
  try {
    const postedKazi = req.body;
    const kazi = new Kazi(postedKazi);
    await kazi.save();
    res.send(kazi);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
