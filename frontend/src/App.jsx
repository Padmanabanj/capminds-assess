import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import StudentForm from './components/StudentForm'
import StudentTable from './components/StudentTable'
import Toast from './components/Toast'

const BASE_URL = 'http://localhost:8000/api'

function App() {
  const [currentView, setCurrentView] = useState('login')
  const [user, setUser] = useState(null)
  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      loadStudents()
    }
  }, [])

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  const loadStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/students`)
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      } else {
        throw new Error('Failed to load students')
      }
    } catch (error) {
      console.error('Error loading students:', error)
      showToast('Error loading students', 'error')
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    loadStudents()
    showToast('Login successful!', 'success')
  }

  const handleLogout = () => {
    setUser(null)
    setStudents([])
    setEditingStudent(null)
    localStorage.removeItem('user')
    setCurrentView('login')
    showToast('Logged out successfully', 'info')
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
  }

  const handleCancelEdit = () => {
    setEditingStudent(null)
  }

  const handleStudentUpdated = () => {
    setEditingStudent(null)
    loadStudents()
  }

  if (!user) {
    return (
      <>
        <div className="auth-section">
          {currentView === 'login' ? (
            <Login 
              onLogin={handleLogin} 
              onSwitchToRegister={() => setCurrentView('register')}
              showToast={showToast}
            />
          ) : (
            <Register 
              onRegister={() => {
                setCurrentView('login')
                showToast('Registration successful! Please login.', 'success')
              }}
              onSwitchToLogin={() => setCurrentView('login')}
              showToast={showToast}
            />
          )}
        </div>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={hideToast}
          />
        )}
      </>
    )
  }

  return (
    <>
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Student Management</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="container">
          <div className="student-form-section">
            <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <StudentForm 
              student={editingStudent}
              onStudentAdded={handleStudentUpdated}
              onStudentUpdated={handleStudentUpdated}
              onCancel={handleCancelEdit}
              showToast={showToast}
            />
          </div>

          <div className="student-table-section">
            <h2>Students List</h2>
            <StudentTable 
              students={students}
              onEditStudent={handleEditStudent}
              onStudentDeleted={loadStudents}
              showToast={showToast}
            />
          </div>
        </div>
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast}
        />
      )}
    </>
  )
}

export default App