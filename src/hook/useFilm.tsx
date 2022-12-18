import { fetcher } from "../helper/fetch"
import { useEffect } from "react";
import { useAppSelector } from "../stores/hook";
import useSWR from "swr"
import { setFilms } from "../reducers/film";
const useFilm = (dispatch:any,type:(string | null) = null, search:(string | null) = null) =>{
    
    const {
        data: films,
        error: filmError,
        mutate: reloadFilm
    } = useSWR('/films?page=1&limit=100', fetcher)
  
   
    useEffect(()=>{
       
       const a = async ()=>{
           const newFilm = await reloadFilm();
        if(films){  

            dispatch(setFilms(newFilm.data))
        }
      
   
       }
       a();
    },[search, films])
 
}

export default useFilm;