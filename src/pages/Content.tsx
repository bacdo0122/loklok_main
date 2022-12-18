import  React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {styled, Box, BoxProps} from '@mui/material';
import '../css/content.css'
import axios from 'axios';
import ContentWrap from '../components/content'
import ComponentWrap from '../components/common';
import {contents,contentsAnime} from '../const/contentTV'
import {types} from '../const/type'
const Body = styled(Box)<BoxProps>({
    minHeight: "calc(100vh - 78px - 150px)",
    maxWidth: "1600px",
    minWidth: "768px",
    position: "relative",
    margin: "0 auto",
    fontSize: "18px",
    color: "#999",
    fontWeight: "bold",
    lineHeight: "120%"
  })
const Content = () => {
  const [type, setType] = useState<string>("TV Series")
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState([]);
  const [content, setContent]= useState({
    region: {
      TV: "All Regions",
      Movie: "All Regions",
      Anime: "All Regions"
    },
    category: {
      TV: "All Categories",
      Movie: "All Categories",
      Anime: "All Categories"
    },
    time: {
      TV: "All Time Periods",
      Movie: "All Time Periods",
      Anime: "All Time Periods"
    },
    typeData: {
      TV: "Recent",
      Movie: "Recent",
      Anime: "Recent"
    }
  })
  useEffect(()=>{
    setLoading(true)
    const getFilm = async()=>{
      let getCategoryId = null;

       const typeDataFilm = type === "TV Series" ? "TV" : type;
       const getContentCategory = content.category?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}] === "All Categories" ?  null : content.category?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}];
       const getContentRegion = content.region?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}] === "All Regions" ?  null : content.region?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}];
       const getContentTime = content.time?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}] === "All Time Periods" ?  null : content.time?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}];
       const getContentTypeData = content.typeData?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}];
       if(getContentCategory){
        const getCategory = await axios.get(process.env.REACT_APP_API_BASE_URL+ `/categories/getOne/${content.category?.[typeDataFilm as keyof {TV:string, Movie:string, Anime:string}]}`)
         getCategoryId = getCategory.data.data?.id;

        }
      
      const filter = (getContentRegion ? `&region=${getContentRegion}`:"") + (getContentCategory ? `&categories=${getCategoryId}`:"") 
      + (getContentTime ? `&year=${getContentTime}`:"") + (getContentTypeData ? `&orderFilm=${getContentTypeData}`:"");
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL+ `/films?page=1&limit=1000&type=${typeDataFilm}` + filter );
      setFilms(res.data?.data);
      setLoading(false);
    }
  
  getFilm();
    
  },[content, type])
  return <><ComponentWrap headerData="header-v-detail">
     <Body>
      <div className="filter-wrap">
        <div className="first-lever">
          {types.map((typeItem:string, index:number)=>{
            return <div onClick={()=> setType(typeItem)}
             key={index} className={type === typeItem ?"first-lever-item filter-item-label firest-lever-item-active" :"first-lever-item filter-item-label"}>
              {typeItem}
            </div>
          })}
        </div>
        <div className="filer-area">

        <div className="filter-row">
            {type !== "Anime" ? contents.region.map((item:string, index:number)=>{
              const typeRegionTV = type === "TV Series" ? "TV" : type;
              return   <div key={index} onClick={()=> setContent({...content, region:{...content.region, [typeRegionTV]: item}})} className={item === content.region?.[typeRegionTV as keyof {TV:string, Movie:string}] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            }): contentsAnime.region.map((item:string, index:number)=>{
              return   <div key={index} onClick={()=> setContent({...content, region:{...content.region, [type]: item}})} className={item === content.region?.[type] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            })}
            </div>

            <div className="filter-row">
            {type !== "Anime" ? contents.category.map((item:string, index:number)=>{
              const typecategoryTV = type === "TV Series" ? "TV" : type;
              return   <div key={index} onClick={()=> setContent({...content, category:{...content.category, [typecategoryTV]: item}})} className={item === content.category?.[typecategoryTV as keyof {TV:string, Movie:string}] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            }): contentsAnime.category.map((item:string, index:number)=>{
              return   <div key={index} onClick={()=> setContent({...content, category:{...content.category, [type]: item}})} className={item === content.category?.[type] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            })}
            </div>

             <div className="filter-row">
            {type !== "Anime" ? contents.time.map((item:string, index:number)=>{
              const typetimeTV = type === "TV Series" ? "TV" : type;
              return   <div key={index} onClick={()=> setContent({...content, time:{...content.time, [typetimeTV]: item}})} className={item === content.time?.[typetimeTV as keyof {TV:string, Movie:string}] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            }): contentsAnime.time.map((item:string, index:number)=>{
              return   <div key={index} onClick={()=> setContent({...content, time:{...content.time, [type]: item}})} className={item === content.time?.[type] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            })}
            </div>

            <div className="filter-row">
            {type !== "Anime" ? contents.typeData.map((item:string, index:number)=>{
              const typetypeDataTV = type === "TV Series" ? "TV" : type;
              return   <div key={index} onClick={()=> setContent({...content, typeData:{...content.typeData, [typetypeDataTV]: item}})} className={item === content.typeData?.[typetypeDataTV as keyof {TV:string, Movie:string}] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            }): contentsAnime.typeData.map((item:string, index:number)=>{
              return   <div key={index} onClick={()=> setContent({...content, typeData:{...content.typeData, [type]: item}})} className={item === content.typeData?.[type] ? "filter-item-label filter-item-label-active": "filter-item-label"}>
                {item}
              </div>
            })}
            </div>
        </div>
      </div>
        <ContentWrap films={films && films} loading={loading}/>    
    </Body>
  </ComponentWrap>
   
  </>;
};

export default Content;
