import * as React from 'react';
import Header from '../components/Header';
import { useAppSelector } from '../stores/hook';
import {Slide} from '../components/slide'
import {styled, Box, BoxProps} from '@mui/material'
import { LazyLoadImage,trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import Banner from '../components/banner';
import ComponentWrap from '../components/common';

const Body = styled(Box)<BoxProps>({
  minHeight: "calc((100vh - 78px) -150px)",
  maxWidth: "1440px",
  margin: "0 auto"
})
const SwipeWrap = styled(Box)<BoxProps>({
 height: "512px",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "45px",
  borderRadius: "8px"
})


const ImageContainerOverlay = styled(Box)<BoxProps>({
  width: "190px", height: "265px", margin: "40px 10px", background: "#c8c8c8"
})

const Home = () => {
  const [getBanner, setGetBanner] = React.useState([])
  React.useEffect(()=>{
    const getFilm = async () =>{
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/banner?page=1&limit=100`)
      setGetBanner(res.data.data)
  }
  getFilm();
  },[])
  const films = useAppSelector((state:any)=>state.film.films);
  return <><ComponentWrap headerData="header-v-home">
    <Body>
   <SwipeWrap>
     <Slide films={films && films.filter((film:any) =>{
      return film.mainBanner === true
     })}/>
   </SwipeWrap>
   <div className="flex"  style={{maxWidth: "1280px", margin: "0 auto"}}>
     {getBanner.length> 0 && getBanner.map((banner:any)=>{
      return <Banner key={banner.id} bannerType={banner.id} name={banner.name}/>
     })}
    
     </div>
  </Body>
  </ComponentWrap>
  
   
  </>;
};

export default trackWindowScroll(Home);
