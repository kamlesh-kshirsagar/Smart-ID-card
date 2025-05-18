This project is a Node.js–based attendance system that uses RFID (Radio Frequency Identification) to automatically log student attendance. 
Students are issued an RFID card (or tag) that, when scanned, marks them as “present” in a MongoDB database for the current day. 
The system consists of a backend (Express) API (with endpoints to add students, mark attendance, and view attendance) and a simple, 
plain HTML/CSS/JS frontend. The backend also integrates a real RFID reader (via the serialport library) so that attendance is marked 
automatically as soon as a student’s RFID tag is scanned. In short, the project automates attendance tracking for students using RFID technology, 
storing the data in a database and providing a user‐friendly interface for viewing attendance records
