import { useState } from 'react';
import { addStudent } from '../services/studentService';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(student)
      .then(() => {
        alert('Student added successfully!');
        navigate('/students');
      })
      .catch((err) => {
        console.error('Error adding student:', err);
        alert('Failed to add student');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          value={student.firstName}
          onChange={handleChange}
        /><br /><br />

        <input
          name="lastName"
          placeholder="Last Name"
          value={student.lastName}
          onChange={handleChange}
        /><br /><br />

        <input
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
        /><br /><br />

        <input
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
        /><br /><br />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={student.phoneNumber}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;