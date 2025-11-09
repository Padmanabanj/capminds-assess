import React, { useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:8000/api'

function StudentForm({ student, onStudentAdded, onStudentUpdated, onCancel, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        age: student.age
      })
    } else {
      setFormData({
        name: '',
        email: '',
        age: ''
      })
    }
  }, [student])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const url = student ? 
        `${BASE_URL}/students/${student.id}` : 
        `${BASE_URL}/students`
      
      const method = student ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.message) {
        if (student) {
          onStudentUpdated()
          showToast(data.message || 'Student updated successfully!', 'success')
        } else {
          onStudentAdded()
          showToast(data.message || 'Student added successfully!', 'success')
        }
        setFormData({ name: '', email: '', age: '' })
      } else if (data.error) {
        showToast(data.error, 'error')
      } else {
        showToast('Operation failed', 'error')
      }
    } catch (error) {
      console.error('Error saving student:', error)
      showToast('Error saving student', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Student Name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        min="1"
        max="100"
        required
        disabled={loading}
      />
      <div className="form-buttons">
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : (student ? 'Update Student' : 'Add Student')}
        </button>
        {student && (
          <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default StudentForm