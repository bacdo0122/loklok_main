import React, { useCallback } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import '../../css/login.css';
export const GoogleLoginWrap = () => {
  const handleLogin = () => {
    try {
      
      window.location.href = process.env.REACT_APP_API_BASE_USER_URL + '/auth/googleLogin';
    } catch (error) {}
  }

  return (
    <div className="goodle_login_input_wrap" >
      <div className='google-login_input' onClick={handleLogin}>
        <GoogleIcon />
        Sign in with Google
      </div>
    </div>
  );
};
