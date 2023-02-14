import * as React from 'react';
import ContentItem from './item'
import LoadingSpinner from '../common/spinner'
interface Films{
  films:any[],
  loading: boolean
}

const ContentWrap = ({films,loading}:Films) => {
  
  return <div className='content-body-list' style={{width: "100%",display: "flex", flexWrap:"wrap"}}>
  {!loading ? films.map((film:any)=>{
    return <ContentItem key={film.id} film={film && film} />
  }) : <LoadingSpinner />}
  </div>;
};

export default ContentWrap;
