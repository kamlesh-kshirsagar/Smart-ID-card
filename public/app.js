const apiBase = '/api';

// Add Student
const addStudentForm = document.getElementById('add-student-form');
addStudentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('student-name').value;
  const rollNumber = document.getElementById('student-roll').value;
  const rfid = document.getElementById('student-rfid').value;
  const msg = document.getElementById('add-student-msg');
  try {
    const res = await fetch(`${apiBase}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, rollNumber, rfid })
    });
    const data = await res.json();
    if (res.ok) {
      msg.textContent = 'Student added!';
      addStudentForm.reset();
    } else {
      msg.textContent = data.error || 'Error adding student';
    }
  } catch (err) {
    msg.textContent = 'Network error';
  }
});

// Mark Attendance
const markAttendanceForm = document.getElementById('mark-attendance-form');
markAttendanceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const rfid = document.getElementById('attendance-rfid').value;
  const msg = document.getElementById('mark-attendance-msg');
  try {
    const res = await fetch(`${apiBase}/attendance/mark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rfid })
    });
    const data = await res.json();
    if (res.ok) {
      msg.textContent = 'Attendance marked!';
      markAttendanceForm.reset();
    } else {
      msg.textContent = data.error || 'Error marking attendance';
    }
  } catch (err) {
    msg.textContent = 'Network error';
  }
});

// View Attendance
const viewBtn = document.getElementById('view-attendance-btn');
const dateInput = document.getElementById('attendance-date');
const tableBody = document.querySelector('#attendance-table tbody');

viewBtn.addEventListener('click', async () => {
  const date = dateInput.value;
  if (!date) return;
  tableBody.innerHTML = '';
  try {
    const res = await fetch(`${apiBase}/attendance/${date}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      data.forEach(a => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${a.student?.name || ''}</td><td>${a.student?.rollNumber || ''}</td><td>${a.present ? 'Yes' : 'No'}</td>`;
        tableBody.appendChild(tr);
      });
    }
  } catch (err) {
    tableBody.innerHTML = '<tr><td colspan="3">Error loading attendance</td></tr>';
  }
}); 