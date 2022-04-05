import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const insertAuthHeader = (
    config: AxiosRequestConfig,
  ) => {
    const hasAuthorization =
      config.headers?.Authorization;

    if (!hasAuthorization) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${auth.accessToken}`,
      };
    }

    return config;
  };

  const refreshAndRetry = async (error: any) => {
    const prevRequest = error?.config;

    if (
      error?.response?.status === 401 &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;

      const newAccessToken = await refresh();

      prevRequest.headers[
        'Authorization'
      ] = `Bearer ${newAccessToken}`;

      return axiosPrivate.request(prevRequest);
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const requestIntercept =
      axiosPrivate.interceptors.request.use(
        insertAuthHeader,
        error => Promise.reject(error),
      );

    const responseIntercept =
      axiosPrivate.interceptors.response.use(
        response => response,
        refreshAndRetry,
      );

    return () => {
      axiosPrivate.interceptors.response.eject(
        responseIntercept,
      );
      axiosPrivate.interceptors.request.eject(
        requestIntercept,
      );
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
