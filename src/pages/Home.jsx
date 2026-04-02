import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Header */}
      <div className="card" style={{ textAlign: "center" }}>
        <h1>🎓 Student Management System</h1>
        <p className="subtitle">
          Manage students easily with a modern dashboard
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid">
        {/* View Students */}
        <div className="card hover-card">
          <h3>📋 View Students</h3>
          <p className="subtitle">
            View all student details in one place
          </p>
          <button onClick={() => navigate("/students")}>
            Go to Students
          </button>
        </div>

        {/* Add Student */}
        <div className="card hover-card">
          <h3>➕ Add Student</h3>
          <p className="subtitle">
            Add new student records 
          </p>
          <button onClick={() => navigate("/add-student")}>
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;