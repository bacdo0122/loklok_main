import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetcher, fetcherUser } from '../../helper/fetch';
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../../helpers/localStorage';
import { useAuthenticated } from '../../hook/useAuthentic';
import { useAppDispatch,useAppSelector } from '../../stores/hook';


interface Props {
    name?: string;
    children: React.ReactChild;
  }
const Layout: React.FC<Props> = ({children}) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate()
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated); 
  useAuthenticated();
   
  const renderLayout = ()=>{
    if(location.pathname === "/login"){
        return isAuthenticated !== null && !isAuthenticated ? (
            <>{children}</>
          ) : (
            <div>Loading...</div>
          );
    }
    else{
        return isAuthenticated !== null  && isAuthenticated ? (
            <>
                  {children}
            </>
        ): (
            <>
            {children}
      </>
          );
    }
  }
  return <>
    {renderLayout()}
  </>;
};

export default Layout;
