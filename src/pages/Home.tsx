import * as React from 'react';
import { useAppSelector } from '../stores/hook';
import {Slide} from '../components/slide'
import {styled, Box, BoxProps} from '@mui/material'
import { trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { fetcher } from '../helper/fetch';
import Banner from '../components/banner';
import ComponentWrap from '../components/common';
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../helpers/localStorage';

const Body = styled(Box)<BoxProps>({
  minHeight: "calc((100vh - 78px) - 150px)",
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



const Home = () => {
  const [getBanner, setGetBanner] = React.useState([])
  React.useEffect(()=>{
   
    const getFilm = async () =>{ 
       try {
        const res = await fetcher(`/banner?page=1&limit=100`, getAccessToken() as string);
        setGetBanner(res.data) 
       } catch (error) {
        removeAccessToken();
        removeRefreshToken();
        // navigate("/login")
       }

  }
  getFilm();
  },[])
  const films = useAppSelector((state:any)=>state.film.films);
  return <><ComponentWrap headerData="header-v-home">
    <Body>
   <SwipeWrap className='swipe_wrap'>
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
