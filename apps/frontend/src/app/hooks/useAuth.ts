import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

type JWTPayload = {
  exp: number;
  sub: string;
};

const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);

    if (Date.now() >= decoded.exp * 1000) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('validating token', isTokenValid(token ?? ''));
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
