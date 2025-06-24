import React, { useState } from 'react';
import api from '../api';
import axios from 'axios';
import '../css/Login.css'; // 👈 import the CSS file

function Login({ setToken, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const login = async () => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const res = await api.post('/login', { email, password });
      setToken(res.data.token);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      localStorage.setItem("isAdmin", res.data.user.is_admin);

      console.log("Logged in as admin:", res.data.user.is_admin);



      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="login-card card shadow-lg p-4 rounded">
        <h3 className="mb-4 text-center text-primary">Welcome Back 👋</h3>

        <div className="form-group mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-primary btn-block" onClick={login}>
            Login
          </button>
        </div>

        <div className="text-center">
          <small className="text-muted">Don't have an account?</small><br />
          <button onClick={switchToRegister} className="btn btn-link">
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
