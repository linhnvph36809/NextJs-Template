import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';

import { axiosInstant } from '../api/request';
import { handlerDeleteCookie, handlerSetCookie } from '../cookies';

import { PATH_LOGIN } from 'src/constant';
import { API_AUTH } from '@api/constant';


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
      router.push('/posts');
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
