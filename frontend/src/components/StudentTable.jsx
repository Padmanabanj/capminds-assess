import React, { useState } from 'react'

const BASE_URL = 'http://localhost:8000/api'

function StudentTable({ students, onEditStudent, onStudentDeleted, showToast }) {
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this student?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.message) {
        onStudentDeleted()
        showToast(data.message || 'Student deleted successfully!', 'success')
      } else if (data.error) {
        showToast(data.error, 'error')
      } else {
        showToast('Delete failed', 'error')
      }
    } catch (error) {
      console.error('Error deleting student:', error)
      showToast('Error deleting student', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      {(!students || students.length === 0) ? (
        <div className="no-records">
          <p>No student records to display</p>
        </div>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn" 
                      onClick={() => onEditStudent(student)}
                      disabled={deletingId === student.id}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(student.id)}
                      disabled={deletingId === student.id}
                    >
                      {deletingId === student.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default StudentTable