import { Sidebar } from '@/components/shared/Sidebar';
import { PrivateRoutes } from '@/models/routes';
import { RoutesWithNotFound } from '@/utils/routes-with-not-found';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import { Teacher } from '../Teacher/Teacher';
import { Student } from '../Student/Student';
import { StudentById } from '../Student/StudentById';

const Private: React.FC = () => {
  return (
      <RoutesWithNotFound>
        <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route element={<Sidebar />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
          <Route path={PrivateRoutes.TEACHER} element={<Teacher />} />
          <Route path={PrivateRoutes.STUDENT} element={<Student />} />
          <Route path={`${PrivateRoutes.STUDENT}/:studentId`} element={<StudentById />} />
        </Route>
      </RoutesWithNotFound>
  );
}

export default Private;
