import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import api from './api';
import './css/App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(true);

  // Re-read user details on every render
  const userName = localStorage.getItem('userName');
  const isAdmin = localStorage.getItem('isAdmin') === '1';

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAdmin'); // 👈 clear this too
    setToken('');
  };


  console.log('Token:', token);
console.log('UserName:', userName);
console.log('isAdmin (from localStorage):', localStorage.getItem('isAdmin'));
console.log('isAdmin (boolean):', isAdmin);


  return (
    <div className="App app-wrapper">
      {!token ? (
        showLogin ? (
          <Login
            setToken={(tok) => {
              localStorage.setItem('token', tok);
              setToken(tok);
              api.defaults.headers.common['Authorization'] = `Bearer ${tok}`;
            }}
            switchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            setToken={(tok) => {
              localStorage.setItem('token', tok);
              setToken(tok);
              api.defaults.headers.common['Authorization'] = `Bearer ${tok}`;
            }}
            switchToLogin={() => setShowLogin(true)}
          />
        )
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid d-flex justify-content-between align-items-center py-2">
              <h4 className="text-white m-0 fw-bold">✅ My ToDo App</h4>
              <div className="d-flex align-items-center">
                <span className="me-3 text-white">
                  <h6 className="m-0">Welcome, {userName}</h6>
                </span>

                <button onClick={logout} className="btn btn-outline-light btn-sm px-3">
                  Logout
                </button>
                
              </div>
            </div>
          </nav>

          {/* ✅ Switch between Admin and Normal User View */}
          {isAdmin ? <AdminDashboard /> : <TodoList />}
        </div>
      )}
    </div>
  );
}

export default App;
