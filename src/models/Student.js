const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rfid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Student', studentSchema); 