import { NotFound404 } from '@/components/shared/NotFound404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const RoutesWithNotFound: React.FC<Props> = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
}
