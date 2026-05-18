import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  function handleLogin() {
    if (username === "admin" && password === "password123") {
      setError("");
      onLogin();
    } else {
      setError("Wrong username or password.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
        </div>

        <h1 className="login-title">AttendTrack</h1>
        <p className="login-sub">Sign in to continue</p>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            placeholder="admin"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="password123"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="btn-primary" onClick={handleLogin}>
          Sign in
        </button>

        <p className="login-hint">Demo: admin / password123</p>
      </div>
    </div>
  );
}

export default Login;