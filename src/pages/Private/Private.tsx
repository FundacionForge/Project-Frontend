import { PrivateRoutes } from '@/models/routes';
import { RoutesWithNotFound } from '@/utils/routes-with-not-found';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import { Home } from './Home/Home';
import { Sidebar } from '@/components/shared/Sidebar';

const Private: React.FC = () => {
  return (
      <RoutesWithNotFound>
        <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route element={<Sidebar />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
          <Route path={PrivateRoutes.HOME} element={<Home />} />
        </Route>
      </RoutesWithNotFound>
  );
}

export default Private;
