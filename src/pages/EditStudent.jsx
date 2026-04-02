import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/studentService';

function EditStudent() {
  const { id } = useParams(); // get student id from URL
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    phoneNumber: ''
  });

  const [loading, setLoading] = useState(true);

  // Fetch student details by ID
  useEffect(() => {
    getStudentById(id)
      .then(response => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching student:', err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(id, student)
      .then(() => {
        alert('Student updated successfully!');
        navigate('/students');
      })
      .catch(err => {
        console.error('Error updating student:', err);
      });
  };

  if (loading) return <p>Loading student details...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="First Name"
          value={student.firstName}
          onChange={e => setStudent({ ...student, firstName: e.target.value })}
        /><br /><br />

        <input
          placeholder="Last Name"
          value={student.lastName}
          onChange={e => setStudent({ ...student, lastName: e.target.value })}
        /><br /><br />

        <input
          placeholder="Email"
          value={student.email}
          onChange={e => setStudent({ ...student, email: e.target.value })}
        /><br /><br />

        <input
          placeholder="Department"
          value={student.department}
          onChange={e => setStudent({ ...student, department: e.target.value })}
        /><br /><br />

        <input
          placeholder="Phone Number"
          value={student.phoneNumber}
          onChange={e => setStudent({ ...student, phoneNumber: e.target.value })}
        /><br /><br />

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;