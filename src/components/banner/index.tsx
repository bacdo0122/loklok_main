import  React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Film } from '../../helper/interface';
import {styled, Box, BoxProps} from '@mui/material'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ImageLoader } from '../../helper/ImageLoader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../../css/Home.css'

interface IAppProps {
    bannerType:string,
    name: string
}
const ImageContainerOverlay = styled(Box)<BoxProps>({
    width: "190px", height: "265px", margin: "40px 10px", background: "#c8c8c8"
  })
const Banner= ({bannerType,name}:IAppProps) => {
    const [film, setFilm] = useState<Film[]>([])
    useEffect(()=>{
        const getFilm = async () =>{
            const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/films?page=1&limit=6&bannerType=${bannerType}`)
            const newData = res.data.data;
            setFilm(newData)
        }
        getFilm();
    },[])
return <div >
        <div className="banner-header" style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}>
            <h1 className="title" style={{marginTop: "30px", color:"#fff", marginBottom: "30px"}}>{name}</h1>
            <div className="image-wrapper" style={{display:"flex"}}>
                    <a href={`/banner/${bannerType}`} className="more-btn" target="_blank" rel="noreferrer">
                        More <ChevronRightIcon />
                    </a>
                </div>
        </div>
        <div className="banner_control" style={{display: "flex", alignItems: "center"}}>
      
        {film.map((film:any, index:number) =>{
       return     <a  key={index} style={{margin: "0 20px 20px 0", cursor:"pointer", width: "190px"}} onClick={()=>window.open(`/detail/${film.id}`,'_blank')}>
        <ImageLoader style={{width: "100%", height: "265px",borderRadius: "8px",  background: "#c8c8c8"}}
       src={film.verticalPoster} />
       <h3 className="title" style={{
        marginTop: "14px",
        fontSize: "16px",
        lineHeight: "120%",
        color: "#f5f5f5",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
       }}>{film.name}</h3>
       </a>

         }


    )
}
        </div>
  </div> 
}


export default Banner;
