// Students.jsx
import { useState } from "react";

// classes is a PROP — passed in from App.jsx
// students and setStudents are also props — App owns the list
function Students({ classes, students, setStudents }) {

  // STATE — just the form. The student list lives in App.jsx
  const [form, setForm] = useState({ name: "", rollNo: "", classId: "" });
  const [error, setError] = useState("");

  // ─── FUNCTIONS ───────────────────────────────────────────

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addStudent() {
    if (!form.name || !form.rollNo || !form.classId) {
      setError("All fields are required.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: form.name,
      rollNo: form.rollNo,
      classId: Number(form.classId), // convert "2" string → 2 number
    };

    setStudents([...students, newStudent]); // add to parent's list
    setForm({ name: "", rollNo: "", classId: "" }); // reset form
    setError("");
  }

  function deleteStudent(id) {
    setStudents(students.filter(s => s.id !== id));
  }

  // ─── JSX ─────────────────────────────────────────────────

  return (
    <div>
      <h2>Students</h2>

      {/* ADD FORM */}
      <div>
        <input
          name="name"
          placeholder="Student name *"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="rollNo"
          placeholder="Roll no *"
          value={form.rollNo}
          onChange={handleChange}
        />

        {/* DROPDOWN — built from the classes prop */}
        <select
          name="classId"
          value={form.classId}
          onChange={handleChange}
        >
          <option value="">Select class…</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={addStudent}>+ Add Student</button>
      </div>

      {/* STUDENT LIST */}
      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        students.map(student => {
          // LOOKUP — find the class object that matches this student's classId
          const cls = classes.find(c => c.id === student.classId);

          return (
            <div key={student.id}>
              <span>{student.name}</span>
              <span>{student.rollNo}</span>
              {/* cls?.name — safe access in case class was deleted */}
              <span>{cls?.name ?? "Unknown"}</span>
              <button onClick={() => deleteStudent(student.id)}>Remove</button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Students;