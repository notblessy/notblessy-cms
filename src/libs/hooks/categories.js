import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import useSWR, { mutate } from 'swr';
import debounce from 'lodash/debounce';

import { useSearchParams, useNavigate } from 'react-router-dom';

import config from '../../config';
import api from '../utils/api';
import toast from '../utils/toast';

export const useCategories = () => {
  const [query, setQuery] = useSearchParams();
  const [cookies] = useCookies([config.COOKIE_NAME]);
  const [loading, setLoading] = useState(false);
  console.log(cookies.access_token);

  const pathKey = `/categories?pageSize=2&${query.toString()}`;
  const { data: res, error } = useSWR(() =>
    cookies.access_token ? pathKey : null
  );

  const onChangePage = useCallback((page) => {
    setQuery({ page: page });
  }, []);

  const onSearch = debounce((name) => {
    setQuery({ name: name });
  }, 1500);

  const onCreate = async (payload) => {
    setLoading(true);
    try {
      const { data: res } = await api.post(`/categories`, payload);
      if (res.success) {
        mutate(pathKey);
        toast('success', 'Customer has been created succesfully.');
      } else {
        throw Error('Something went wrong.');
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
    pagination: res?.pagination,
    onChangePage,
    onSearch,
    onCreate,
  };
};
