import { PrivateRoutes, PublicRoutes } from '@/models/routes';
import { AppStore } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  privateValidation: boolean
}

const PrivateValidation = <Navigate replace to={PrivateRoutes.PRIVATE} />
const PublicValidation = <Navigate replace to={PublicRoutes.LOGIN} />

const AuthGuard: React.FC<Props> = ({privateValidation}) => {
  const userState = useSelector((store: AppStore) => store.user)
  console.log(userState);

  return userState.username ?
    privateValidation ?
      <Outlet />
    : PrivateValidation
    : PublicValidation
}

export default AuthGuard
