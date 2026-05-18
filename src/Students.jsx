import { useState } from "react";
import "./Students.css";

function Students({ classes, students, setStudents }) {

  const [form, setForm] = useState({ name: "", rollNo: "", classId: "" });
  const [error, setError] = useState("");

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
      classId: Number(form.classId),
    };
    setStudents([...students, newStudent]);
    setForm({ name: "", rollNo: "", classId: "" });
    setError("");
  }

  function deleteStudent(id) {
    setStudents(students.filter(s => s.id !== id));
  }

  // turns "Arjun Kumar" → "AK"
  function initials(name) {
    return name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Students</h2>

      {/* ── ADD FORM ── */}
      <div className="form-card">
        <h3>Add new student</h3>

        <div className="form-row-4">
          <div className="field">
            <label>Student name *</label>
            <input
              name="name"
              placeholder="Arjun Kumar"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Roll no *</label>
            <input
              name="rollNo"
              placeholder="S001"
              value={form.rollNo}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Class *</label>
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
          </div>

          <button className="btn-add" onClick={addStudent}>+ Add</button>
        </div>

        {error && <p className="form-error">{error}</p>}
      </div>

      {/* ── STUDENT LIST ── */}
      <div className="table-card">
        <div className="students-table-header">
          <span></span>
          <span>Name</span>
          <span>Roll no</span>
          <span>Class</span>
          <span></span>
        </div>

        {students.length === 0 ? (
          <p className="empty-state">No students yet. Add one above.</p>
        ) : (
          students.map(student => {
            const cls = classes.find(c => c.id === student.classId);

            return (
              <div key={student.id} className="students-table-row">
                <div className="avatar">{initials(student.name)}</div>
                <span className="row-name">{student.name}</span>
                <span className="row-roll">{student.rollNo}</span>
                <span className="badge-class">{cls?.name ?? "Unknown"}</span>
                <button
                  className="btn-remove"
                  onClick={() => deleteStudent(student.id)}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Students;