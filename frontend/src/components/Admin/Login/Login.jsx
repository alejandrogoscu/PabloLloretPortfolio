import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/api/admin/login', form);
      if (onLogin) onLogin(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="section-title">
        <div className="title-line"></div>
        <h2>Admin Login</h2>
        <div className="title-line"></div>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            className="login-input"
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="login-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
