/* Login.jsx — import and apply the classes */
import "./Login.css";

function Login({ onLogin }) {
  
  return (
    <div className="login-page">        {/* ← note: className not class in React */}
      <div className="login-card">
        <div className="login-logo"> ... </div>
        <h1 className="login-title">AttendTrack</h1>
        <p className="login-sub">Sign in to continue</p>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input className="form-input"  />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password"  />
        </div>

        {error && <p className="form-error">{error}</p>}
        <button className="btn-primary" onClick={handleLogin}>Sign in</button>
        <p className="login-hint">Demo: admin / password123</p>
      </div>
    </div>
  );
}