import React, { useState } from 'react';
import api from '../api';
import axios from 'axios';
import '../css/Register.css'; // 👈 Import external styles

function Register({ setToken, switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const res = await axios.post(
        'http://localhost:8000/api/register',
        { name, email, password },
        { withCredentials: true }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);  // <-- Save username
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setToken(res.data.token);
    } catch (err) {
      console.log(err);
      if (err.response?.data?.message) {
        alert('Registration failed: ' + err.response.data.message);
      } else {
        alert('Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4 fw-bold register-title">Create Account</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            className="form-control rounded-pill px-4 py-2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            className="form-control rounded-pill px-4 py-2"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Password</label>
          <input
            className="form-control rounded-pill px-4 py-2"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid mb-3">
          <button
            className="btn btn-primary rounded-pill fw-semibold py-2"
            onClick={register}
          >
            Register
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={switchToLogin}
            className="btn btn-sm text-primary fw-semibold"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
