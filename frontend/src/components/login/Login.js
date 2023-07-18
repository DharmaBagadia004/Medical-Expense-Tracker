import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can perform your login logic here, e.g., API calls, authentication, etc.

    // For the sake of simplicity, let's assume the login is successful.
    // We'll just check if the username and password are non-empty.
    if (username && password) {
      // Redirect to the home page after successful login.
      navigate('/home');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div>
        <label className="label">Username:</label>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="label">Password:</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;