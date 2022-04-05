import React, {
  createContext,
  useEffect,
  useState,
} from 'react';
import { IAuth } from '../models';

interface IAuthContext {
  auth: IAuth;
  setAuth: (auth: IAuth) => void;
}

const defaultState = {
  auth: {} as IAuth,
  setAuth: () => {
    return null;
  },
};

const AuthContext =
  createContext<IAuthContext>(defaultState);

export const AuthProvider: React.FC = ({
  children,
}) => {
  const [auth, setAuth] = useState<IAuth>(
    {} as IAuth,
  );

  useEffect(() => {
    const accessToken = localStorage.getItem(
      'accessToken',
    );
    const refreshToken = localStorage.getItem(
      'refreshToken',
    );
    const roles = new Array(
      localStorage.getItem('roles') || '',
    );

    if (accessToken && refreshToken && roles) {
      setAuth({
        accessToken,
        refreshToken,
        roles,
      });
    }
  }, []);

  const setAuthorization = (auth: IAuth) => {
    localStorage.setItem(
      'accessToken',
      auth.accessToken,
    );
    localStorage.setItem(
      'refreshToken',
      auth.refreshToken,
    );
    localStorage.setItem(
      'roles',
      auth.roles.join(','),
    );

    setAuth(auth);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth: setAuthorization }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
