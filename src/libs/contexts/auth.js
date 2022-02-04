import React, { createContext, useState, useCallback, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import useSWR, { mutate } from 'swr';

import config from '../../config';
import api from '../utils/api';
import toast from '../utils/toast';

const AuthContext = createContext({
  loading: false,
  isAuthenticated: false,
  user: null,
  register: () => {},
  authenticate: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([config.COOKIE_NAME]);
  const { data: user } = useSWR(() => (cookies.token ? '/me' : null));
  const [loading, setLoading] = useState(false);

  const register = useCallback(
    async (payload) => {
      setLoading(true);

      try {
        const { data: res } = await api.post('/register', {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        });
        if (res.success) {
          const today = new Date();
          const nextTenYear = new Date();
          nextTenYear.setFullYear(today.getFullYear() + 10);

          setCookie('access_token', res.token, {
            expires: nextTenYear,
            path: '/',
          });

          const from = location.state?.from?.pathname || '/';
          setTimeout(() => {
            navigate(from, { replace: true });
            mutate('/profile');
          }, 500);
        } else {
          toast('error', res.message);
        }
      } catch (error) {
        toast('error', error.toString());
      } finally {
        setLoading(false);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const authenticate = useCallback(
    async (payload) => {
      setLoading(true);

      try {
        const { data: res } = await api.post('/login', {
          email: payload.email,
          password: payload.password,
        });

        if (res.success) {
          const today = new Date();
          const nextTenYear = new Date();
          nextTenYear.setFullYear(today.getFullYear() + 10);

          setCookie('access_token', res.token, {
            expires: nextTenYear,
            path: '/',
          });

          const from = location.state?.from?.pathname || '/';
          setTimeout(() => {
            navigate(from, { replace: true });
            mutate('/profile');
          }, 500);
        } else {
          toast('error', res.message);
        }
      } catch (error) {
        toast('error', error.toString());
      } finally {
        setLoading(false);
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const logout = useCallback(() => {
    removeCookie('access_token');
    navigate('/login', { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user?.data,
        user: user?.data,
        register,
        authenticate,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
