import React,{ useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from '../helpers/localStorage';
import { setAuth } from '../reducers/auth';
import { useAppDispatch } from '../stores/hook';

const googleLogin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUser = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      if (accessToken && refreshToken) {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        dispatch(setAuth(true));
        navigate('/');
      }
    };
    getUser();
  }, []);
  return <></>;
};
export default googleLogin;
