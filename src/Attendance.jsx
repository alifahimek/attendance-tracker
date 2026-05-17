// Attendance.jsx
import { useState } from "react";

// All three are props from App.jsx
function Attendance({ classes, students, attendance, setAttendance }) {

  // STATE — just the two selector values
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedDate, setSelectedDate]       = useState(
    new Date().toISOString().split("T")[0]   // today's date as default
  );
  const [saved, setSaved] = useState(false);

  // ─── DERIVED VALUES (computed, not state) ────────────────

  // Unique key for this class+date combination
  const key = `${selectedClassId}-${selectedDate}`;

  // The attendance record for this session — defaults to empty object
  const record = attendance[key] || {};

  // Only the students that belong to the selected class
  const studentsInClass = students.filter(
    s => s.classId === Number(selectedClassId)
  );

  // Count of present students — computed from record each render
  const presentCount = Object.values(record).filter(Boolean).length;

  // ─── FUNCTIONS ───────────────────────────────────────────

  function toggle(studentId) {
    // Functional setState — use prev => when new state depends on old state
    setAttendance(prev => ({
      ...prev,                       // keep all other sessions
      [key]: {
        ...(prev[key] || {}),        // keep other students in this session
        [studentId]: !prev[key]?.[studentId]  // flip just this one student
      }
    }));
  }

  function saveAttendance() {
    setSaved(true);
    // Hide the "Saved!" message after 2 seconds
    setTimeout(() => setSaved(false), 2000);
  }

  // ─── JSX ─────────────────────────────────────────────────

  return (
    <div>
      <h2>Mark Attendance</h2>

      {/* SELECTORS */}
      <div>
        <select
          value={selectedClassId}
          onChange={e => setSelectedClassId(e.target.value)}
        >
          <option value="">Select class…</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Only show the list once a class is selected */}
      {selectedClassId && (
        <div>
          <div>
            <span>{presentCount}/{studentsInClass.length} present</span>
            {saved && <span style={{ color: "green" }}>Saved!</span>}
            <button onClick={saveAttendance}>Save</button>
          </div>

          {studentsInClass.length === 0 ? (
            <p>No students in this class.</p>
          ) : (
            studentsInClass.map(student => {
              const isPresent = !!record[student.id]; // !! converts to boolean

              return (
                <div key={student.id}>
                  <span>{student.name}</span>
                  <span>{student.rollNo}</span>

                  {/* Badge changes based on attendance */}
                  <span style={{ color: isPresent ? "green" : "red" }}>
                    {isPresent ? "Present" : "Absent"}
                  </span>

                  {/* Toggle button */}
                  <button onClick={() => toggle(student.id)}>
                    {isPresent ? "Mark Absent" : "Mark Present"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Attendance;