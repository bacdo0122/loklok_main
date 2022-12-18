import React, { useState } from 'react'
import {Box, styled,BoxProps, TextField, InputAdornment, Avatar } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {listPage} from '../const/listPage'
import '../css/Header.css'
import axios from 'axios';
const useStyles = makeStyles({
    NavBarWrap:{
        display: "flex",
        alignItems:"center",
        flexWrap: "wrap", 
       position: "relative",
        zIndex:100
    },
    logo:{
        width : "103px",
        height: "32px",
        display: "block"
    },
    ul:{
        display: "flex",
        alignItems:"center",
     
    },

    li:{
        height: "32px",
        listStyle:"none",
        display:"flex",
        lineHeight: "32px",
        

    },
    a:{
        marginLeft:"30px!important",
        color: "#f5f5f5!important",
        cursor: "pointer",
        display: "block",
        whiteSpace: "nowrap",
        padding: "0!important",
        fontSize: "18px!important",
        fontWeight: "bold",
        textDecoration: "none"
    },
    wrap: {
        height: "32px", background: "#333",borderRadius: "20px!important", border:"none", color: "#f5f5f5!important", marginLeft: "20px", padding: "0 10px",
        display:"flex", alignItems:"center", gap: "5px", cursor:"pointer"
    },
    input: { width: "280px!important", justifyContent: "space-between" ,padding: "0 5px!important"}
})
const Navbar = styled(Box)<BoxProps>({
    height: "60px",
    position: "fixed",
    left:0,
    top:0,
    right:0,
    padding: "0 40px",
    justifyContent: "space-between",
  
}
)

const ListNavBar = styled(Box)<BoxProps>({
    height: "100%"
})
const InputSearchWrap = styled(Box)<BoxProps>({
    height: "100%",
    display:"flex",
    alignItems: "center",
    position: "relative"
})
const Header = ({data}:any)=>{
  
    const classes = useStyles();
    const navigate = useNavigate()
    const [searchList, setSearchList] = useState([]);
    const [active, setActive] = useState(false);
    const handleSearchFilm = async(e:any)=>{

        if(e.target.value !== ""){
            const res = await axios.get(process.env.REACT_APP_API_BASE_URL+ `/films?page=1&limit=1000&search=${e.target.value}` );
        setSearchList(res.data?.data)
        }
    }
 
    return <Navbar className={`${classes.NavBarWrap} navbar`} data-navbar={data}
   >
        <ListNavBar className={classes.NavBarWrap} >
            <Link to="/">
                <Box component="img" src="https://static.netpop.app/img/loklok-white.png" className={classes.logo}/>
            </Link>
            
            <ul className={classes.ul}>
            {listPage && listPage.map((page:any, index:number)=>{
                return  <li key={index} className={classes.li}>
                <Link to={page.link}  className={classes.a}>
                  <span >{page.text}</span>
                </Link>
              </li>
            })}
        
        </ul>
        </ListNavBar>
        <ListNavBar className={classes.NavBarWrap}>
            <InputSearchWrap>
                    <TextField
                placeholder='Search'
                onChange={handleSearchFilm}
                onFocus={()=>setActive(true)}
                autoComplete="off"
                onBlur={()=> setActive(false)}
                InputProps={{
                className: `${classes.input} ${classes.wrap}`,
                endAdornment: (
                    <InputAdornment position="end">
                    <SearchIcon sx={{color:"#f5f5f5", cursor: "pointer"}}/>
                    </InputAdornment>
                )
                }}
            />
            {active && <div className="select-dropdown">
                <div className="select-scrollbar">
                    <div className="select-dropdown-wrap">
                        <ul className="select-group-wrap">
                            <li className="select-group-title"> Result</li>
                            <li >
                                <ul className="select-group">
                                    {searchList.length > 0 && searchList.map((item:any, index:number)=>{
                                        return <li key={index} className="select-dropdown-item" onMouseDown={()=> navigate(`/detail/${item.id}`)}>
                                            <span className={`rank-${index+1} rank-other`}>{index+1}</span>
                                            <span>{item.name}</span>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
        
                </div>
                <div className="popper__arrow">

                </div>
            </div>}
            </InputSearchWrap>
            <Link to="/" className={classes.wrap}>
                <FileDownloadIcon />
                Download APP
            </Link>
            <Box >
                <Box className={classes.wrap}>
                    <LanguageIcon />
                    <Box component="span">English</Box>
                    <ExpandMoreIcon />
                </Box>
            </Box>
            <Box component="span">
                <Avatar src="https://static.netpop.app/img/avatar-logout.png" sx={{marginLeft: "10px", width: "32px", height: "32px", objectFit: "cover"}}/>
            </Box>
        </ListNavBar>
    </Navbar>;
}
export default Header;