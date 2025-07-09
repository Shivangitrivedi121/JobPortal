import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(undefined);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // For demo purposes, we'll simulate a successful login
      // In a real app, you'd verify the token with your backend
      const mockUser = {
        _id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'jobseeker'
      };
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: mockUser, token } 
      });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login based on email
      let mockUser;
      if (email === 'admin@jobportal.com') {
        mockUser = {
          _id: '1',
          name: 'Admin User',
          email: 'admin@jobportal.com',
          role: 'admin'
        };
      } else if (email === 'employer@jobportal.com') {
        mockUser = {
          _id: '2',
          name: 'Employer User',
          email: 'employer@jobportal.com',
          role: 'employer'
        };
      } else {
        mockUser = {
          _id: '3',
          name: 'Job Seeker',
          email: email,
          role: 'jobseeker'
        };
      }

      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: mockUser, token: mockToken } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const register = async (name, email, password, role) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        _id: Date.now().toString(),
        name,
        email,
        role: role || 'jobseeker'
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: mockUser, token: mockToken } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
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