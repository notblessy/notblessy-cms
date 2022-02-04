import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';
import { useSearchParams, useNavigate } from 'react-router-dom';

import config from '../../config';
import api from '../utils/api';
import toast from '..//utils/toast';

export const useUsers = () => {
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const [cookies] = useCookies([config.COOKIE_NAME]);
  const [loading, setLoading] = useState(false);

  const pathKey = `/users?${query.toString()}`;
  const { data: res, error } = useSWR(() => (cookies.access_token ? pathKey : null));

  const onChangePage = useCallback((value) => {
    setQuery({ page: value });
    navigate(`/users?${query.toString()}`, { replace: true });
  }, []); // eslint-disable-line

  const onCreate = useCallback(
    async (payload) => {
      setLoading(true);

      try {
        const { data: res } = await api.post('/users', payload);
        if (res.data) {
          navigate('/sites');
          toast('success', 'Succesfully add the site.');
        } else {
          throw Error(res.message);
        }
      } catch (error) {
        toast('error', error.toString());
      } finally {
        setLoading(false);
      }
    },
    [] // eslint-disable-line
  );

  return {
    loading: (!res?.data && !error) || loading,
    data: res?.data || [],
    onChangePage,
    onCreate
  };
};
