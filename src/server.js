require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const attendanceRouter = require('./routes/attendance');
const studentRouter = require('./routes/student');
const path = require('path');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Smart ID Card API is running');
});

app.use('/api/attendance', attendanceRouter);
app.use('/api/students', studentRouter);

// RFID Reader Integration
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

parser.on('data', async (rfid) => {
  console.log('RFID scanned:', rfid);
  try {
    const student = await Student.findOne({ rfid });
    if (!student) {
      console.log('Student not found for RFID:', rfid);
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await Attendance.findOneAndUpdate(
      { student: student._id, date: today },
      { present: true },
      { upsert: true, new: true }
    );
    console.log(`Attendance marked for ${student.name}`);
  } catch (err) {
    console.error('Error marking attendance:', err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 