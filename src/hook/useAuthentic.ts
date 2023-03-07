import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcherUser } from '../helper/fetch';
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../helpers/localStorage';
import { setAuth, setUser } from '../reducers/auth';
import { useAppDispatch, useAppSelector } from '../stores/hook';
export const useAuthenticated = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);

  const {
    data: user,
    error: userError,
    mutate: reloadUser,
  } = useSWR([getAccessToken() ? '/auth/getMe' : null, getAccessToken()], fetcherUser);

  useEffect(() => {    
    const checkUser = async () => {
      if (user) {
        dispatch(setUser(user));
        dispatch(setAuth(true));
      }
    };
    checkUser();
  }, [user, userError]);
  useEffect(()=>{
    if(getAccessToken()){
      if(!user){
        // dispatch(setUser(null));
        // dispatch(setAuth(false));
        // removeAccessToken();
        // removeRefreshToken();
      }
      
    }
    
    reloadUser();
  },[location.pathname])
  useEffect(() => {
    if (getAccessToken() !== null && getAccessToken() && location.pathname !== '/login') {
      dispatch(setAuth(true));
      navigate(location.pathname);
    } else if (location.pathname === '/login' && getAccessToken()) {
      dispatch(setAuth(true));
      navigate('/');
    } else if ((isAuthenticated !== null && !isAuthenticated) || !getAccessToken()) {
      dispatch(setUser(null));
      dispatch(setAuth(false));
      // navigate("/login")
    }
  }, [isAuthenticated, location.pathname]);
};
