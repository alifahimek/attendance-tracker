import { useState } from "react";
import "./Classes.css";

function Classes({ classes, setClasses }) {

  const [form, setForm] = useState({ name: "", code: "", teacher: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addClass() {
    if (!form.name || !form.code) {
      setError("Class name and code are required.");
      return;
    }
    const newClass = {
      id: Date.now(),
      name: form.name,
      code: form.code,
      teacher: form.teacher,
    };
    setClasses([...classes, newClass]);
    setForm({ name: "", code: "", teacher: "" });
    setError("");
  }

  function deleteClass(id) {
    setClasses(classes.filter(c => c.id !== id));
  }

  return (
    <div className="page-container">
      <h2 className="page-title">Classes</h2>

      {/* ── ADD FORM ── */}
      <div className="form-card">
        <h3>Add new class</h3>

        <div className="form-row">
          <div className="field">
            <label>Class name *</label>
            <input
              name="name"
              placeholder="Mathematics"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Code *</label>
            <input
              name="code"
              placeholder="MATH101"
              value={form.code}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Teacher</label>
            <input
              name="teacher"
              placeholder="Mr. Rajan"
              value={form.teacher}
              onChange={handleChange}
            />
          </div>

          <button className="btn-add" onClick={addClass}>+ Add</button>
        </div>

        {error && <p className="form-error">{error}</p>}
      </div>

      {/* ── CLASS LIST ── */}
      <div className="table-card">
        <div className="table-header">
          <span>Class name</span>
          <span>Code</span>
          <span>Teacher</span>
          <span></span>
        </div>

        {classes.length === 0 ? (
          <p className="empty-state">No classes yet. Add one above.</p>
        ) : (
          classes.map(cls => (
            <div key={cls.id} className="table-row">
              <span className="row-name">{cls.name}</span>
              <span className="badge-code">{cls.code}</span>
              <span className="row-teacher">{cls.teacher || "—"}</span>
              <button
                className="btn-remove"
                onClick={() => deleteClass(cls.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Classes;