import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderWrap } from '../components/common/HeaderWrap';
import '../css/BannerFilm.css';
import { fetcher } from '../helper/fetch';
import { getAccessToken } from '../helpers/localStorage';
const BannerFilm = () => {
  const { bannerId } = useParams();
  const [films, setFilms] = useState([]);
  const [banner, setBanner] = useState<{ id: number; name: string; updatedAt: string } | null>(null);
   useMemo(async () => {
    const res = await fetcher(`/films?page=1&limit=100&bannerType=${bannerId}`, getAccessToken() as string);
    const newData = res.data;
    console.log(newData);
    
    setFilms(newData);
  }, []);
  useMemo(async () => {
    const res = await fetcher(`/banner?page=1&limit=1&search=${bannerId}`, getAccessToken() as string);

    const newData = res.data[0];
    setBanner(newData);
  }, []);

  return (
    <>
      <HeaderWrap>
        <div className="banner-info">
          <span>
            <a href="/">Home</a> &gt; {banner && banner?.name}
          </span>
        </div>
        <div className="banner-film">
          <h1 className="title">{banner && banner?.name}</h1>
          <ul className="banner-film-list">
            {films &&
              films.map((film: any, index: number) => {
                return (
                  <li className="banner-film-item" key={index}>
                    <a href={`/detail/${film.id}`} className="banner-film-item-wrap" target="_blank" rel="noreferrer">
                      <div className="video-card-wrap">
                        <div className="img-wrap-vertical">
                          <img src={film.verticalPoster} alt={film.name} loading="lazy" />
                        </div>
                        <h3 className="video-card-title">{film.name}</h3>
                      </div>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </HeaderWrap>
    </>
  );
};

export default BannerFilm;
