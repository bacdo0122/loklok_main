import GifIcon from '@mui/icons-material/Gif';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../components/comment';
import { HeaderWrap } from '../components/common/HeaderWrap';
import '../css/DetailFilm.css';
import { fetcher } from '../helper/fetch';
import { Film } from '../helper/interface';
import { getAccessToken } from '../helpers/localStorage';

const DetailFilm = () => {
  const { id, episodeId } = useParams();
  const [expand, setExpand] = useState(false);
  const navi = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  useEffect(() => {
    const getFilm = async () => {
      const res = await fetcher(`/films/${id}`, getAccessToken() as string);
      console.log(res.data);
      
        setFilm(res);

    };
    getFilm();
  }, [episodeId, id]);
  return (
    <>
      <HeaderWrap>
        <div className="detail-content">
          <div className="video-wrap">
          {film && <video width="100%" height="100%" controls autoPlay>
            <source src={`https://films-server.s3.ap-southeast-1.amazonaws.com/videos/${film?.data.url}`} type="video/mp4"/>
          </video>}
          {/* <ReactPlayer
                config={{
                  file: {
                    attributes: {
                      crossOrigin: 'true',
                    },
                    
                  },
                }}
                url="http://localhost:3000/public/The.Brawler.2019.1080p.WEBRip.x264-(19)(1).mp4"
                controls={true}
                playing={true}
                playIcon={<PlayArrowIcon />}
                playsinline={true}
                className="react-player"
                width="100%"
                height="100%"
              /> */}
          </div>
          
        </div>
        <div className="info-wrap">
          <div className="info">
            <div className="title">{film && film?.data.name}</div>
            <div className="tags">
              <div className="score">{film && film?.data.score}</div>
              <div className="icon-imdb">
                <GifIcon />
              </div>
              <div className="icon-point">&nbsp;·&nbsp;</div>
              <div className="area-category">
                {film && film?.data.areas} · {film && film?.data.year}
              </div>
            </div>
            <div className="area-category category-line">
              Category:&nbsp;{' '}
              {film &&
                film?.data.categories.map((category: any, index: number) =>
                  index === 0 ? category.name : ` · ${category.name}`,
                )}
            </div>
            <div className={!expand ? 'desc' : 'desc desc-active'}>
              {film && film?.data.description}
              {film && film?.data.description.length > 500 && (
                <div className="expand" onClick={() => setExpand(true)}>
                  {!expand && 'More'}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="recommends">
          <div className="subtitle">You may like</div>
          <ul className="recommend-list">
            {film &&
              film?.data.likeList.map((item: any, index: number) => {
                return (
                  <li className="recomment-item" key={index}>
                    <a
                    href={`/detail/${item.id}`}
                      className="recomment-item-wrap"
                    >
                      <div className="video-card-wrap">
                        <div className="img-wrap-vertical">
                          <img src={`https://films-server.s3.ap-southeast-1.amazonaws.com/images/${item.verticalPoster}`} alt={item.name} loading="lazy" />
                        </div>
                        <h3 className="video-card-title">{item.name}</h3>
                      </div>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
        <Comments filmId={id} />
      </HeaderWrap>
    </>
  );
};

export default DetailFilm;
