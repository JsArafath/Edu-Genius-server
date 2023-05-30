// models/kazi.js
const mongoose = require('mongoose');

const kaziSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Kazi = mongoose.model('Kazi', kaziSchema);

module.exports = Kazi;
