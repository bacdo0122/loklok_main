import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';


const NotFoundPage = React.lazy(()=>import('../pages/NotFoundPage'))
const Home = React.lazy(()=>import('../pages/Home'))
const Content = React.lazy(()=>import('../pages/Content'))
const Article = React.lazy(()=>import('../pages/Article'))
const Contact = React.lazy(()=>import('../pages/Contact'))
const DetailFilm = React.lazy(()=>import('../pages/DetailFilm'))
const BannerFilm = React.lazy(()=>import('../pages/BannerFilm'))
const Routers = ()=>{
    const routers = [
        {
            path: "/",
            element: <Home/>   
        }
        ,
        {
            path: "all",
            element: <Content/>   
        }
        ,
        {
            path: "articles",
            element: <Article/>   
        }
        ,
        {
            path: "contact",
            element: <Contact/>   
        }
         ,
        {
            path: "/banner/:bannerId",
            element: <BannerFilm />   
        }
        ,
        {
            path: "detail/:id",
            element: <DetailFilm/>
            
            
        }
        ,
        {
            path: "detail/:id/:episodeId",
            element: <DetailFilm/>   
        }
        ,
        {
            path: "*",
            element: <NotFoundPage/>   
        }
    ]
    const elements = useRoutes(routers);
    return elements;
}

export default Routers;