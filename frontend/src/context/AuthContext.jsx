import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    // data contains { message, userId, fullName, email, role }
    const userData = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role || 'STUDENT',
    };
    setUser(userData);
    authService.setStoredUser(userData);
    return data;
  };

  const register = async (fullName, email, password) => {
    const data = await authService.register({ fullName, email, password });
    const userData = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role || 'STUDENT',
    };
    setUser(userData);
    authService.setStoredUser(userData);
    return data;
  };

  const logout = () => {
    setUser(null);
    authService.clearStoredUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
