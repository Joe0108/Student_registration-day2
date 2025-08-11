const STORAGE_KEY = 'students_v1';
const form = document.getElementById('regForm');
const feedback = document.getElementById('feedback');
const studentsList = document.getElementById('studentsList');
const clearBtn = document.getElementById('clearBtn');

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStudents(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  renderList();
}

function renderList() {
  const arr = loadStudents();
  if (!arr.length) {
    studentsList.innerHTML = '<em>No students registered yet.</em>';
    return;
  }
  studentsList.innerHTML = arr.map(s => `
    <div style="margin-top:8px">
      <strong>${escapeHtml(s.fullName)}</strong> — ${escapeHtml(s.studentId)}<br>
      <span>${escapeHtml(s.email)} ${s.phone ? '• ' + escapeHtml(s.phone) : ''}</span><br>
      <span style="color:#4b5563; font-size:12px">${escapeHtml(s.course)}${s.dob ? ' • DOB: ' + escapeHtml(s.dob) : ''}</span>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[m]);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  feedback.textContent = '';
  const data = {
    studentId: form.studentId.value.trim(),
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim().toLowerCase(),
    phone: form.phone.value.trim(),
    course: form.course.value,
    dob: form.dob.value
  };

  if (!data.studentId || !data.fullName || !data.email) {
    feedback.textContent = 'Please fill required fields.';
    feedback.className = 'small error';
    return;
  }

  const students = loadStudents();
  if (students.some(s => s.studentId.toLowerCase() === data.studentId.toLowerCase())) {
    feedback.textContent = 'Student ID already exists.';
    feedback.className = 'small error';
    return;
  }
  if (students.some(s => s.email === data.email)) {
    feedback.textContent = 'Email already exists.';
    feedback.className = 'small error';
    return;
  }

  students.push(data);
  saveStudents(students);
  form.reset();
  feedback.textContent = 'Student registered successfully ✅';
  feedback.className = 'small msg';
});

clearBtn.addEventListener('click', function () {
  if (!confirm('Clear all students?')) return;
  localStorage.removeItem(STORAGE_KEY);
  renderList();
  feedback.textContent = 'All students cleared.';
  feedback.className = 'small';
});

renderList();
