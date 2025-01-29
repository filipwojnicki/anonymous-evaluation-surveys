import { Navigate, useLocation } from 'react-router-dom';

export const Home = () => {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  return token ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
