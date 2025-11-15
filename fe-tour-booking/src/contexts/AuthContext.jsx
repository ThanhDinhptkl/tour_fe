import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        await fetchUserProfile();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8081/customer/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Nếu token không hợp lệ, đăng xuất
        logout();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    }
  };

  const login = async (newToken) => {
    try {
      setToken(newToken);
      localStorage.setItem('accessToken', newToken);
      await fetchUserProfile();
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      logout();
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
  };

  const checkAuth = async () => {
    if (!token) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const response = await fetch('http://localhost:8081/customer/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      logout();
      return false;
    }
  };

  const value = {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 