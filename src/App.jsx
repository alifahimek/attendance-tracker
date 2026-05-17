// App.jsx — the complete wiring of all 4 parts
import { useState } from "react";
import Login      from "./Login";
import Classes    from "./Classes";
import Students   from "./Students";
import Attendance from "./Attendance";

function App() {
  const [loggedIn,    setLoggedIn]   = useState(false);
  const [page,        setPage]       = useState("classes");

  // All shared data lives here — passed down as props
  const [classes,    setClasses]    = useState([]);
  const [students,   setStudents]   = useState([]);
  const [attendance, setAttendance] = useState({});

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div>
      {/* NAV */}
      <nav>
        <button onClick={() => setPage("classes")}>Classes</button>
        <button onClick={() => setPage("students")}>Students</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </nav>

      {/* PAGES — only one renders at a time */}
      {page === "classes" && (
        <Classes
          classes={classes}
          setClasses={setClasses}
        />
      )}

      {page === "students" && (
        <Students
          classes={classes}
          students={students}
          setStudents={setStudents}
        />
      )}

      {page === "attendance" && (
        <Attendance
          classes={classes}
          students={students}
          attendance={attendance}
          setAttendance={setAttendance}
        />
      )}
    </div>
  );
}

export default App;