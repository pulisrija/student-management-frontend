import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";
import { useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ✅ useEffect FIXED (no warning now)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const response = await getStudents();
        console.log("API Response:", response);

        // Safe handling
        if (response && response.data) {
          setStudents(Array.isArray(response.data) ? response.data : []);
        } else {
          setStudents([]);
        }

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await deleteStudent(id);
        alert("Student deleted successfully");

        // reload students
        const response = await getStudents();
        setStudents(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) return <p className="container">Loading students...</p>;
  if (error) return <p className="container">{error}</p>;

  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginBottom: "20px" }}>Students List</h2>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#2563eb", color: "white" }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>First Name</th>
                <th style={thStyle}>Last Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{student.id}</td>
                  <td style={tdStyle}>{student.firstName}</td>
                  <td style={tdStyle}>{student.lastName}</td>
                  <td style={tdStyle}>{student.email}</td>
                  <td style={tdStyle}>{student.department}</td>
                  <td style={tdStyle}>{student.phoneNumber}</td>
                  <td style={tdStyle}>
                    <button
                      style={{ marginRight: "8px", background: "#dc2626" }}
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>

                    <button
                      style={{ background: "#16a34a" }}
                      onClick={() => navigate(`/edit-student/${student.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Styles
const thStyle = {
  padding: "12px",
  border: "1px solid #ddd"
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd"
};

export default Students;