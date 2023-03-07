import * as React from 'react';
import '../../css/BannerFilm.css'


const ContentItem = ({film}:any) => {

  return <>
                  <div className="banner-film-item">
                  <a href={`/detail/${film.id}`} className="banner-film-item-wrap"  rel="noreferrer">
                  <div className="video-card-wrap">
                    <div className="img-wrap-vertical">
                      <img src={`https://films-server.s3.ap-southeast-1.amazonaws.com/images/${film.verticalPoster}`} alt={film &&  film.name} loading="lazy"/>
                    </div>
                    <h3 className="video-card-title">
                    {film &&  film.name}
                    </h3>
                  </div>
                  </a>
                  </div>
  </>;
};

export default ContentItem;
