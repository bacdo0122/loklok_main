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
  const [episode, setEpisode] = useState(episodeId);
  const [expand, setExpand] = useState(false);
  const navi = useNavigate();
  const [film, setFilm] = useState<Film | null>(null);
  useEffect(() => {
    const getFilm = async () => {
      const res = episodeId
        ? await fetcher(`/films/${id}?episodeId=${episodeId}`, getAccessToken() as string)
        : await fetcher(`/films/${id}`, getAccessToken() as string);
      // console.log(res)
      if (!episodeId) setEpisode(JSON.parse(res.data.episodes)[0].id);
      
      // const subtitleList = res.dataSubtitleList.map((subtitle: any) => ({
      //   kind: 'subtitles',
      //   src: subtitle.subtitlingUrl,
      //   srcLang: subtitle.languageAbbr,
      //   label: subtitle.languageAbbr,
      //   default: true,
      // }));
      // console.log({...res.data, dataSubtitleList:subtitleList })
      // setFilm({ ...res, dataSubtitleList: subtitleList });
        setFilm({ ...res });

    };
    getFilm();
  }, [episodeId, id]);
  return (
    <>
      <HeaderWrap>
        <div className="detail-content">
          <div className="video-wrap">
            {film && (
              <ReactPlayer
                config={{
                  file: {
                    attributes: {
                      crossOrigin: 'true',
                    },
                    tracks: [
                      {
                        kind: 'subtitles',
                        src: 'http://localhost:3001/a.vtt',
                        srcLang: 'en',
                        label: 'en',
                        default: true,
                      },
                    ],
                  },
                }}
                url={film?.dataUrl?.mediaUrl}
                controls={true}
                playing={true}
                playIcon={<PlayArrowIcon />}
                playsinline={true}
                className="react-player"
                width="100%"
                height="100%"
              />
            )}
          </div>
          <div className="episodes-wrap">
            <div className="episodes-module">
              <div className="episodes-title">{film && film?.data.name}</div>
              <div className="episodes-list-wrap">
                <div className="episodes-list">
                  {film && JSON.parse(film?.data.episodes).length > 1 ? (
                    JSON.parse(film?.data.episodes).map((item: any) => {
                      return (
                        <div
                          key={item.episodeNo}
                          className={Number(episode) === item.id ? 'episode-item episode-item-active' : 'episode-item'}
                          onClick={() => {
                            setEpisode(item.id);
                            navi(`/detail/${film?.data.id}/${item.id}`);
                          }}
                        >
                          {Number(episode) === item.id && <PlayArrowIcon />}
                          <span>{item.episodeNo}</span>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="second-title">Related series</div>
                      <div className="alert">
                        <img
                          src="https://static.netpop.app/img/nocontent220120.png"
                          alt="loklok placeholder"
                          width="200"
                          height="200"
                        />
                        <h1>Unable to locate resource</h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
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
                {film && JSON.parse(film?.data.areas)[0].name} · {film && film?.data.year}
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
              JSON.parse(film?.data.likeList).map((item: any, index: number) => {
                return (
                  <li className="recomment-item" key={index}>
                    <div
                      className="recomment-item-wrap"
                      onClick={async () => {
                        const res = await axios.get(
                          process.env.REACT_APP_API_BASE_URL + `/films/getId/${item.category}/${item.id}`,
                        );
                        navi(`/detail/${res.data.id}`);
                      }}
                    >
                      <div className="video-card-wrap">
                        <div className="img-wrap-vertical">
                          <img src={item.coverVerticalUrl} alt={item.name} loading="lazy" />
                        </div>
                        <h3 className="video-card-title">{item.name}</h3>
                      </div>
                    </div>
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
