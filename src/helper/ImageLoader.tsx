import  React, {useEffect, useState} from 'react';
import {Box, styled, BoxProps} from '@mui/material';
import { LazyLoadImage,trackWindowScroll } from 'react-lazy-load-image-component';


export const  ImageLoader = ({src, onClick, style}:any) => {
  const [image, setImage] = useState(false) 
  useEffect(()=>{
    const timeout = setTimeout(()=>{setImage(true)}, 2000)
    return ()=>clearTimeout(timeout)
  },[])
  return (
    <>
    {!image ? 
   <div style={style}></div>
 :   <LazyLoadImage  
   
   style={style}
   src={src}
   onClick={onClick}
    />  
  }
  </>
  
  );
}
