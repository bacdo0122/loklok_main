import React from 'react';
import { GoogleLogout } from 'react-google-login';
const clientId = '319622258021-88v4659htejof9h3efvift5re4u8dmot.apps.googleusercontent.com';
export const GoogleLogoutWrap = () => {
  const onSuccess = async () => {
    console.log('log out successfully!');
  };

  return (
    <>
      <GoogleLogout clientId={clientId} style={{ marginTop: '20px' }} buttonText="Logout" onLogoutSuccess={onSuccess} />
    </>
  );
};
