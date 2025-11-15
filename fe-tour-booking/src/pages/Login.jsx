import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8081/customer/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Login failed. Please try again.');
      }

      const data = await response.json();
      localStorage.setItem('refreshToken', data.refreshToken);
      
      // Wait for login process to complete
      const loginSuccess = await login(data.accessToken);
      if (loginSuccess) {
        navigate('/');
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };
  const handleGoogleLogin = () => {
    // Chuyển hướng đến endpoint đăng nhập Google
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Travel Tour Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Login with Google
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <span
            onClick={handleSignUpRedirect}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;