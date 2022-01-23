import { useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWR from 'swr';

import config from '../../config';
import api from '../utils/api';
import toast from '..//utils/toast';

export const useUsers = () => {
  const [cookies] = useCookies([config.COOKIE_NAME]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: res, error } = useSWR(() =>
    cookies.access_token ? `/users?page=${page}` : null
  );

  const onCreate = async (payload) => {
    setLoading(true);

    try {
      const { data: res } = await api.post('/users', payload);
      if (res.data) {
        toast('success', 'Succesfully add the user.');
      } else {
        toast('success', 'Something went wrong.');
      }
    } catch (error) {
      toast('error', error.toString());
    } finally {
      setLoading(false);
    }
  };

  return {
    loading: (!res?.data && !error) || loading,
    data: res?.data || [],
    onChangePage: (value) => setPage(value),
    onCreate,
  };
};
