import axios from '../api/axios';
import { IAuthRefreshToken } from '../models';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response =
        await axios.post<IAuthRefreshToken>(
          '/auth/refresh',
          {
            refresh_token: auth.refreshToken,
          },
          {
            withCredentials: true,
          },
        );
      const accessToken =
        response.data.access_token;
      const refreshToken =
        response.data.refresh_token;

      setAuth({
        ...auth,
        accessToken,
        refreshToken,
      });

      return accessToken;
    } catch (error) {
      console.error(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
