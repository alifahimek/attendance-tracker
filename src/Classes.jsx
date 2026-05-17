// Classes.jsx
import { useState } from "react";

function Classes() {

  // STATE — the list of all classes (array of objects)
  const [classes, setClasses] = useState([]);

  // STATE — the form (one object holds all three field values)
  const [form, setForm] = useState({ name: "", code: "", teacher: "" });

  // STATE — validation error message
  const [error, setError] = useState("");

  // ─── FUNCTIONS ───────────────────────────────────────────

  function handleChange(e) {
    // e.target.name tells us WHICH input fired (name, code, or teacher)
    // ...form spreads/copies all existing fields, then overrides just one
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addClass() {
    // Validation — stop early if required fields are empty
    if (!form.name || !form.code) {
      setError("Class name and code are required.");
      return;
    }

    // Build the new class object
    const newClass = {
      id: Date.now(),        // timestamp as a quick unique ID
      name: form.name,
      code: form.code,
      teacher: form.teacher,
    };

    // Add to array — spread old array + append new item
    // Never do: classes.push(newClass) — that mutates state directly
    setClasses([...classes, newClass]);

    // Reset the form back to empty
    setForm({ name: "", code: "", teacher: "" });
    setError("");
  }

  function deleteClass(id) {
    // filter() returns a new array WITHOUT the item that matches id
    setClasses(classes.filter(c => c.id !== id));
  }

  // ─── JSX ─────────────────────────────────────────────────

  return (
    <div>
      <h2>Classes</h2>

      {/* ADD FORM */}
      <div>
        {/* Using name= attribute so one handleChange works for all inputs */}
        <input
          name="name"
          placeholder="Class name *"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="code"
          placeholder="Code *  e.g. MATH101"
          value={form.code}
          onChange={handleChange}
        />
        <input
          name="teacher"
          placeholder="Teacher (optional)"
          value={form.teacher}
          onChange={handleChange}
        />

        {/* Show error only when string is not empty */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={addClass}>+ Add Class</button>
      </div>

      {/* CLASS LIST */}
      {classes.length === 0 ? (
        // Conditional render — shown when array is empty
        <p>No classes yet. Add one above.</p>
      ) : (
        // .map() turns each object in the array into a row of JSX
        // key={cls.id} is required — React uses it to track list items
        classes.map(cls => (
          <div key={cls.id}>
            <span>{cls.name}</span>
            <span>{cls.code}</span>
            <span>{cls.teacher || "—"}</span>

            {/* Arrow function () => so it only runs on click, not on render */}
            <button onClick={() => deleteClass(cls.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Classes;