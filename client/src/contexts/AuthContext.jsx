// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For the prototype, we'll simulate authentication
  useEffect(() => {
    const simulateAuth = () => {
      // For demo purposes, assume we're logged in
      setUser({
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'HOTEL_ADMIN',
        hotelId: 'h1'
      });
      setIsAuthenticated(true);
      setLoading(false);
    };

    // Simulate API delay
    setTimeout(simulateAuth, 1000);
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      console.log('Registering user:', userData);
      
      // Simulated successful response
      setTimeout(() => {
        setUser({
          id: '1',
          name: userData.name,
          email: userData.email,
          role: userData.role,
          hotelId: userData.hotelId
        });
        setIsAuthenticated(true);
        setLoading(false);
      }, 1000);
      
      return { success: true };
    } catch (err) {
      setError('Registration failed');
      setLoading(false);
      throw err;
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      console.log('Logging in user:', email);
      
      // Simulated successful response
      setTimeout(() => {
        setUser({
          id: '1',
          name: 'Demo User',
          email: email,
          role: 'HOTEL_ADMIN',
          hotelId: 'h1'
        });
        setIsAuthenticated(true);
        setLoading(false);
      }, 1000);
      
      return { success: true };
    } catch (err) {
      setError('Login failed');
      setLoading(false);
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Request password reset
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      console.log('Password reset requested for:', email);
      
      // Simulated successful response
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return { success: true };
    } catch (err) {
      setError('Password reset request failed');
      setLoading(false);
      throw err;
    }
  };

  // Reset password with token
  const resetPassword = async (token, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      console.log('Resetting password with token:', token);
      
      // Simulated successful response
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return { success: true };
    } catch (err) {
      setError('Password reset failed');
      setLoading(false);
      throw err;
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;