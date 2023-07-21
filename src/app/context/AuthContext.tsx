/* eslint-disable @typescript-eslint/no-empty-function */
import { config } from '@/config';
import { loginUser } from '@/services/auth.service';
import React from 'react';

interface Props {
  children: JSX.Element | JSX.Element[]
}

type AuthContextData = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem(config.TOKEN_STORAGE);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { token } = await loginUser({ username, password });
      if (token) {
        setIsAuthenticated(true);
        localStorage.setItem(config.TOKEN_STORAGE, token);
        console.log('Login successful! Token stored in localStorage.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(config.TOKEN_STORAGE);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
