import { PrivateRoutes } from '@/models/routes';
import { AppStore } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  role: string;
}

export const RoleGuard: React.FC<Props> = ({role}) => {
  const userState = useSelector((store: AppStore) => store.user)

  return userState.role.includes(role) ? <Outlet /> : <Navigate replace to={PrivateRoutes.PRIVATE} />
}
