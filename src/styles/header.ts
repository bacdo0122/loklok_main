import { makeStyles } from '@mui/styles';
import {Box, styled,BoxProps} from '@mui/material'

export const useStyles = makeStyles({
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
    input: { width: "280px", justifyContent: "space-between" ,padding: "0 5px!important"}
})
export const Navbar = styled(Box)<BoxProps>({
    height: "60px",
    position: "fixed",
    left:0,
    top:0,
    padding: "0 40px",
    justifyContent: "space-between",
  
})
export const ListNavBar = styled(Box)<BoxProps>({
    height: "100%"
})
export const InputSearchWrap = styled(Box)<BoxProps>({
    height: "100%",
    display:"flex",
    alignItems: "center",
    position: "relative"
})
