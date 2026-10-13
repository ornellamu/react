import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./page/Dashboard";
import Students from "./page/Students";
import Teachers from "./page/Teachers";
import About from "./page/About";

function App() {
  return (
    <BrowserRouter>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="brand-box">
            <span className="brand-mark">🎓</span>
            <div>
              <span className="brand-label">School</span>
              <strong>Admin</strong>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Main navigation">
            <Link to="/">Dashboard</Link>
            <Link to="/students">Students</Link>
            <Link to="/teachers">Teachers</Link>
            <Link to="/about">About</Link>
          </nav>

          <div className="sidebar-card">
            <p className="card-kicker">Overview</p>
            <h3>98.4%</h3>
            <span>Attendance this week</span>
          </div>
        </aside>

        <div className="main-panel">
          <header className="topbar">
            <div>
              <p className="eyebrow">Operations</p>
              <h1>School Management Dashboard</h1>
            </div>
            <div className="topbar-pill">Today: 08 Oct</div>
          </header>

          <main className="content-panel">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;