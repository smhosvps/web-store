import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/features/api/apiSlice';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { data: user, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user?.user?.role)) {
    return <Navigate to='/admin' replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

