// Toggle Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("active");
}

// Add Subject Field
function addSubject() {
  const container = document.getElementById("subjectsContainer");
  const div = document.createElement("div");
  div.className = "subject-entry";
  div.innerHTML = `
    <input type="text" name="subjectName" placeholder="Subject Name" required>
    <input type="number" name="subjectMark" placeholder="Mark" required>
  `;
  container.appendChild(div);
}

// Fetch and Display Students
async function fetchStudents() {
  try {
    const response = await fetch("/dashboard/students");
    const students = await response.json();
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.surname}</td>
        <td>${student.class}</td>
        <td>${student.subjects.map((sub) => `${sub.name}: ${sub.mark}`).join(", ")}</td>
        <td>${student.subjects.map((sub) => sub.grade).join(", ")}</td>
        <td class="action-buttons">
          <button class="edit" onclick="editStudent('${student._id}')">Edit</button>
          <button class="delete" onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error fetching students:", err);
  }
}

// Add Student
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const subjects = [];
  document.querySelectorAll(".subject-entry").forEach((entry) => {
    const subjectName = entry.querySelector('input[name="subjectName"]').value;
    const subjectMark = parseFloat(entry.querySelector('input[name="subjectMark"]').value);
    subjects.push({ name: subjectName, mark: subjectMark });
  });

  const studentData = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    className: formData.get("className"),
    subjects,
  };

  try {
    const response = await fetch("/dashboard/add-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
    const result = await response.json();
    if (response.ok) {
      alert("Student data saved successfully!");
      fetchStudents();
    } else {
      alert("Error saving student data");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});

// Edit Student
async function editStudent(id) {
  // Fetch student data and populate the form for editing
  // Implement this based on your requirements
}

// Delete Student
async function deleteStudent(id) {
  try {
    const response = await fetch(`/dashboard/delete-student/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Student data deleted successfully!");
      fetchStudents();
    } else {
      alert("Error deleting student data");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

// Fetch students on page load
fetchStudents();
