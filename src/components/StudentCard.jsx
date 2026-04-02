function StudentCard({ student }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{student.firstName} {student.lastName}</h3>
      <p>Email: {student.email}</p>
      <p>Department: {student.department}</p>
      <p>Phone: {student.phoneNumber}</p>
    </div>
  );
}

export default StudentCard;