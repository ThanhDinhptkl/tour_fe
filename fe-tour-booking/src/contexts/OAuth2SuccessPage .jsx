// src/pages/OAuth2SuccessPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const OAuth2SuccessPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);

      login(token).then((success) => {
        if (success) navigate('/');
        else navigate('/login?error=oauth2');
      });
    } else {
      navigate('/login?error=oauth2');
    }
  }, []);

  return <div className="text-center mt-20 text-xl font-semibold">Đang xác thực bằng Google...</div>;
};

export default OAuth2SuccessPage;
