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
  signUp: () => {},
  authenticate: () => {},
  verifyEmail: () => {},
  forgotPass: () => {},
  resetPass: () => {},
  updatePass: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([config.COOKIE_NAME]);
  const { data: user } = useSWR(() => (cookies.access_token ? '/me' : null));
  const [loading, setLoading] = useState(false);

  const signUp = useCallback(
    async (payload) => {
      setLoading(true);

      try {
        const { data: res } = await api.post('/signup', {
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password,
        });
        if (res.success) {
          const today = new Date();
          const nextHour = new Date();
          nextHour.setHours(today.getHours() + 1);
          setCookie('access_token', res.data.accessToken, {
            expiresIn: nextHour,
            path: '/',
          });

          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          setCookie('refresh_token', res.data.refreshToken, {
            expiresIn: nextWeek,
            path: '/',
          });

          setTimeout(() => {
            navigate('/verify');
            mutate('/me');
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
          const nextHour = new Date();
          nextHour.setHours(today.getHours() + 1);
          setCookie('access_token', res.data.accessToken, {
            expiresIn: nextHour,
            path: '/',
          });

          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          setCookie('refresh_token', res.data.refreshToken, {
            expiresIn: nextWeek,
            path: '/',
          });

          const from = location.state?.from?.pathname || '/';

          setTimeout(() => {
            navigate(from, { replace: true });
            mutate('/me');
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

  const verifyEmail = async (payload) => {
    setLoading(true);
    try {
      await api.post('/confirm-email', payload);
      toast('success', 'Your account is activated.');
      navigate('/');
    } catch (error) {
      toast('error', error.toString());
    } finally {
      setLoading(false);
    }
  };

  const forgotPass = async (payload) => {
    setLoading(true);
    try {
      await api.post('/forgot-password', payload);
      toast(
        'success',
        `We have sent a reset link to ${payload.email}. Please click the link to reset your password.`
      );
    } catch (error) {
      toast('error', error.toString());
    } finally {
      setLoading(false);
    }
  };

  const resetPass = async (payload) => {
    setLoading(true);
    try {
      const { data: res } = await api.post('/reset-password', payload);
      toast('success', 'Succesfully reset your password.');
      navigate(`/login?email=${res.data.email}`);
    } catch (error) {
      toast('error', error.toString());
    } finally {
      setLoading(false);
    }
  };

  const updatePass = async (payload) => {
    setLoading(true);
    try {
      const { data: res } = await api.patch('/password', payload);
      if (res.success) {
        toast('success', 'Your password has been updated succesfully.');
      } else {
        toast('error', res.message);
      }
    } catch (error) {
      toast('error', error.toString());
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    removeCookie('access_token');
    navigate('/login', { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user?.data,
        user: user?.data,
        signUp,
        authenticate,
        verifyEmail,
        forgotPass,
        resetPass,
        updatePass,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
