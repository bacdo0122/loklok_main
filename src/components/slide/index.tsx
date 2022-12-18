import  React, {useRef} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard , Autoplay} from "swiper";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {ImageLoader} from '../../helper/ImageLoader'

export const Slide = ({films}: any) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const pagination = {
    clickable: true,
          }
   const onBeforeInit = (Swiper: any): void => {
        const navigation = Swiper.params.navigation;
        navigation!.prevEl = prevRef.current;
         navigation!.nextEl = nextRef.current;

    };  
      
  return (
    <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        
        onBeforeInit={onBeforeInit}
        loop={true}
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        pagination={pagination}
        initialSlide={1}
        modules={[Navigation, Pagination,Autoplay, Keyboard]} 
        className="mySwiper"
        style={{height: "100%"}}
      >
        {films && films.map((film:any)=>{
          return <SwiperSlide key={film.filmId}>
            <h2 className="footer-shadow"
            
            >
              {film.name}
            </h2>
            <ImageLoader src={film.horizontalPoster} style={{width: "100%", height: "100%", objectFit: "cover"}}  onClick={()=>window.open(`/detail/$${film.id}`,'_blank')}/>
            </SwiperSlide>
        })}
        <ArrowBackIosNewIcon ref={prevRef} sx={{
         position: "absolute",
         color: "#fefefe",
         left: "27px",
         top: "50%",
         transform:" translateY(-50%)",
         width: "66px",
          height: "110px",
          zIndex: "10",
          cursor: "pointer",
          display:"flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "110px",
          opacity: ".5",
        }}/>
         <ArrowForwardIosIcon ref={nextRef} sx={{
         position: "absolute",
         color: "#fefefe",
         right: "27px",
         top: "50%",
         transform:" translateY(-50%)",
         width: "66px",
          height: "110px",
          zIndex: "10",
          cursor: "pointer",
          display:"flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "110px",
          opacity: ".5",
        }}/>
      </Swiper>
  );
};