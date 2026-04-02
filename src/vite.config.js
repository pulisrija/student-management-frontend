// src/pages/Students.jsx
import { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard';
import { getStudents } from '../services/studentService';

console.log('Students.jsx loaded'); // Debug: check if component is rendering

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudents()
      .then(res => {
        console.log('Fetched students via Axios:', res.data);
        setStudents(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Axios error:', err);
        setError('Failed to fetch students.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map(student => (
          <StudentCard key={student.id} student={student} />
        ))
      )}
    </div>
  );
}

export default Students;