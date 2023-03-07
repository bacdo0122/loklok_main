import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Film } from '../../helper/interface';
import { styled, Box, BoxProps } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImageLoader } from '../../helper/ImageLoader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../../css/Home.css';
import { getAccessToken } from '../../helpers/localStorage';
import { fetcher } from '../../helper/fetch';

interface IAppProps {
  bannerType: string;
  name: string;
}
const ImageContainerOverlay = styled(Box)<BoxProps>({
  width: '190px',
  height: '265px',
  margin: '40px 10px',
  background: '#c8c8c8',
});
const Banner = ({ bannerType, name }: IAppProps) => {
  const [film, setFilm] = useState<Film[]>([]);
  useEffect(() => {
    const getFilm = async () => {
      // const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/films?page=1&limit=6&bannerType=${bannerType}`)
      const res = await fetcher(`/films?page=1&limit=6&bannerType=${bannerType}`, getAccessToken() as string);
      const newData = res.data;
      setFilm(newData);
    };
    getFilm();
  }, []);
  return (
   <>
   {film.length > 0 &&  <div className="album-wrap">
      <div
        className="banner-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '30px 0' }}
      >
        <h1 className="title" style={{ color: '#fff', fontSize: '24px' }}>
          {name}
        </h1>
        <div className="image-wrapper" style={{ display: 'flex' }}>
          <a href={`/banner/${bannerType}`} className="more-btn"  rel="noreferrer">
            More <ChevronRightIcon />
          </a>
        </div>
      </div>
      <div className="banner_control" style={{ display: 'flex', alignItems: 'center' }}>
        {film.map((film: any, index: number) => {
          return (
            <a
              className="video-item"
              key={index}
              style={{
                overflow: 'hidden',
                margin: '0 20px 20px 0',
                cursor: 'pointer',
                width: '15.4%',
              }}
              rel="noreferrer"
              href={`/detail/${film.id}`}
            >
              <div
                className="img-wrap"
                style={{
                  position: 'relative',
                  paddingTop: '140%',
                  borderRadius: '8px',
                  background: '#333',
                  overflow: 'hidden',
                }}
              >
                <ImageLoader
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    borderRadius: '8px',
                    background: '#c8c8c8',
                  }}
                  src={`https://films-server.s3.ap-southeast-1.amazonaws.com/images/${film.verticalPoster}`}
                />
              </div>
              <h3
                className="title"
                style={{
                  marginTop: '14px',
                  fontSize: '16px',
                  lineHeight: '120%',
                  color: '#f5f5f5',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {film.name}
              </h3>
            </a>
          );
        })}
      </div>
    </div>}
   </>
  );
};

export default Banner;
