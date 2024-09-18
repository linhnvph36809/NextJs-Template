import { useCallback, useEffect, useState } from 'react';
import { axiosInstant } from '../api/request';
import { PATH_LOGIN, PATH_POST } from 'src/constant';
import { API_AUTH } from '@api/constant';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';
import { handlerDeleteCookie, handlerSetCookie } from '../cookies';

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const onLogin = useCallback(async (username: { username: string }) => {
    const { data } = await axiosInstant.post(API_AUTH.LOGIN, username);
    if (data?.accessToken) {
      handlerSetCookie('accessToken', data?.accessToken);
      handlerSetCookie('refreshToken', data?.refreshToken);
      handlerSetCookie('username', username.username);
      setIsLogin(true);
      router.push("/posts");
    }
  }, []);

  const onLogout = useCallback(() => {
    handlerDeleteCookie('accessToken');
    handlerDeleteCookie('refreshToken');
    handlerDeleteCookie('username');
    setIsLogin(false);
    router.push(PATH_LOGIN.LOGIN);
  }, []);

  const {
    data,
    error,
    loading,
    run: handlerLogin,
  } = useRequest(onLogin, {
    manual: true,
  });

  useEffect(() => {
    setIsLogin(!!localStorage.getItem('accessToken'));
  }, []);

  return {
    isLogin,
    setIsLogin,
    data,
    error,
    loading,
    handlerLogin,
    onLogout,
  };
};

export default useAuth;
