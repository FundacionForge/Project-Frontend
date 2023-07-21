// src/components/AuthGuard.tsx
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Route } from 'react-router-dom';

const AuthGuard: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return <Route component={Component} />;
};

export default AuthGuard;
