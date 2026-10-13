function Dashboard() {
  return (
    <div className="page-section">
      <div className="section-heading">
        <h2>Dashboard</h2>
        <p>Welcome to our School Management System.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Students</span>
          <strong>250</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Teachers</span>
          <strong>25</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Classes</span>
          <strong>12</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;