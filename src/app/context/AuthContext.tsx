/* eslint-disable @typescript-eslint/no-empty-function */
import { config } from '@/config';
import { useLoginMutation } from '@/services/auth.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[]
}

type AuthContextData = {
  isAuthenticated:  boolean;
  login:            (username: string, password: string) => void;
  logout:           () => void;
};

export const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const loginMutation = useLoginMutation()
  const redictLogin = useNavigate()

  React.useEffect(() => {
    const token = localStorage.getItem(config.TOKEN_STORAGE);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const data = await loginMutation.mutateAsync({ username, password });
      redictLogin(config.ROUTE.ADMIN.TABLE_TEACHER)

      if (data.token) {
        setIsAuthenticated(true);
        localStorage.setItem(config.TOKEN_STORAGE, data.token);
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
