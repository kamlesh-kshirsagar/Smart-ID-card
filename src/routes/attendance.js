const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

// Mark attendance by RFID
router.post('/mark', async (req, res) => {
  const { rfid } = req.body;
  if (!rfid) return res.status(400).json({ error: 'RFID is required' });

  try {
    const student = await Student.findOne({ rfid });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { student: student._id, date: today },
      { present: true },
      { upsert: true, new: true }
    );
    res.json({ message: 'Attendance marked', attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get attendance for a specific date
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    const attendance = await Attendance.find({ date: day }).populate('student');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 