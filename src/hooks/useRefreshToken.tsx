import axios from '../api/axios';
import { IAuth } from '../models';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const {auth, setAuth} = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post<{access_token: string, refresh_token: string}>('/auth/refresh', {
        refresh_token: auth.refreshToken
      }, {
        withCredentials: true
      });
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;

      setAuth(prev => {
        console.info(JSON.stringify(prev))
        console.info(accessToken)

        return {...prev, accessToken, refreshToken};
      });

      return accessToken;
    } catch (error) {
      console.error(error);
    }
  }

  return refresh;
}

export default useRefreshToken;