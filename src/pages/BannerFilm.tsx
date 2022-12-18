import  React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {styled, Box, BoxProps} from '@mui/material';
import Header from '../components/Header';
import axios from 'axios';
import '../css/BannerFilm.css'
import ComponentWrap from '../components/common';
const Body = styled(Box)<BoxProps>({
    minHeight: "calc(100vh - 78px - 150px)",
    maxWidth: "1440px",
    minWidth: "768px",
    position: "relative",
    paddingTop: "20px",
    margin: "0 auto",
    fontSize: "18px",
    color: "#999",
    fontWeight: "bold",
    lineHeight: "120%"
  })
const BannerFilm = () => {
    const {bannerId}= useParams();
    const [films, setFilms] = useState([])
    const [banner, setBanner] = useState<{id:number, name: string,updatedAt:string} | null>(null);
    useEffect(()=>{
        const getFilm = async () =>{
            const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/films?page=1&limit=100&bannerType=${bannerId}`)
            const newData = res.data.data;
            console.log(newData)
            setFilms(newData)
        }
        const getBanner = async()=>{
            const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/banner?page=1&limit=1&search=${bannerId}`)
            const newData = res.data.data[0];
            setBanner(newData)
        }
        getFilm();
        getBanner();
    },[])
  return <>
    <ComponentWrap headerData="header-v-detail">
    <Body>
        <div className="banner-info">
            <span><a href="/">Home</a> &gt; {banner && banner?.name}</span>
        </div>
        <div className="banner-film">
            <h1 className="title">{banner && banner?.name}</h1>
            <ul className="banner-film-list">
            {films && films.map((film:any, index:number)=>{
              return <li className="banner-film-item" key={index}>
                <a href={`/detail/${film.id}`} className="banner-film-item-wrap" target="_blank" rel="noreferrer">
                  <div className="video-card-wrap">
                    <div className="img-wrap-vertical">
                      <img src={film.verticalPoster} alt={film.name} loading="lazy"/>
                    </div>
                    <h3 className="video-card-title">
                      {film.name}
                    </h3>
                  </div>
                </a>
              </li>
            })}
            </ul>
        </div>
    </Body>
    </ComponentWrap>
    
  </>;
};

export default BannerFilm;
