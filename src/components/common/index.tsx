import  React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {styled, Box, BoxProps} from '@mui/material';
import Header from '../Header';
import '../../css/Home.css'
const FixedBarWrap = styled(Box)<BoxProps>({
    position: "fixed",
    width: "72px",
    right: "0px",
    bottom: "126px",
    background: "#333",
    borderRadius: "16px 0px 0px 16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column"
   })
const ComponentWrap = ({children, headerData}:{children:any, headerData:string})=>{

    return <>
    <Header data={headerData}/>
    {children}
    <FixedBarWrap>
        <a href="https://twitter.com/Loklok_app" className="iconBar" target="_blank" rel="noreferrer" style={{backgroundPosition:"center top"}}>
            <span>LokLok_app Twitter</span>
        </a>
        <a href="https://www.youtube.com/channel/UCVQNwX7WJ3H_rky9MIfwLwA" className="iconBar" target="_blank" rel="noreferrer" style={{backgroundPosition:"center -32px"}}>
        <span>LokLok_app Youtube</span>
        </a>
         <a href="https://www.facebook.com/profile.php?id=100086515303188" className="iconBar" target="_blank" rel="noreferrer" style={{backgroundPosition:"center -64px"}}>
         <span>LokLok_app Facebook</span>
        </a>
        <a href="https://www.instagram.com/loklok_drama/" className="iconBar" target="_blank" rel="noreferrer" style={{backgroundPosition:"center -96px"}}>
        <span>LokLok_app Instagram</span>
        </a>
        <a href="https://zalo.me/g/vjsqyy266" className="iconBar" target="_blank" rel="noreferrer" style={{backgroundPosition:"center -128px"}}>
        <span>LokLok_app Zalo</span>
        </a>
        <a href="https://t.me/+U0jxzyUgvfwzMTg9" className="iconBar" target="_blank" rel="noreferrer" style={{backgroundPosition:"center -160px"}}>
        <span>LokLok_app Telegram</span>
        </a>
     </FixedBarWrap>
    </>
}

export default ComponentWrap;