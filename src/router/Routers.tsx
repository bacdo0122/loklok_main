import React from 'react';
import { useRoutes } from 'react-router-dom';

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/Login'));
const Content = React.lazy(() => import('../pages/Content'));
const Contact = React.lazy(() => import('../pages/Contact'));
const DetailFilm = React.lazy(() => import('../pages/DetailFilm'));
const BannerFilm = React.lazy(() => import('../pages/BannerFilm'));
const GoogleLogin = React.lazy(() => import('../pages/GoogleLogin'));
const MyProfile = React.lazy(() => import('../pages/MyProfile'));
const SignUp =  React.lazy(() => import('../pages/SignUp'));
const Routers = () => {
  const routers = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signUp',
      element: <SignUp/>
    },
    {
      path: '/googleLogin',
      element: <GoogleLogin />,
    },
    {
      path: 'all',
      element: <Content />,
    },
    {
      path: 'my_profile',
      element: <MyProfile />,
    },
    {
      path: 'contact',
      element: <Contact />,
    },
    {
      path: '/banner/:bannerId',
      element: <BannerFilm />,
    },
    {
      path: 'detail/:id',
      element: <DetailFilm />,
    },
    {
      path: 'detail/:id/:episodeId',
      element: <DetailFilm />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ];
  const elements = useRoutes(routers);
  return elements;
};

export default Routers;
