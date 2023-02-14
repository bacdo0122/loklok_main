import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ContentWrap from '..';
import { contentsAnime, contentsMovie, contentsTV } from '../../../const/contentTV';
import { fetcher } from '../../../helper/fetch';
import { Filters, FilterType } from '../Filters';

interface Props {
  id: number;
  title:string;
}

export enum IdType {
  TV = 1,
  Anime = 3,
  Movie = 2,
}

const MapRegion = {
  [IdType.TV]: contentsTV,
  [IdType.Movie]: contentsMovie,
  [IdType.Anime]: contentsAnime,
};

export const ContentBody = ({ id, title }: Props) => {
  const allRegions = useMemo(() => {
    return MapRegion[id as IdType].region;
  }, [id]);
  const allCategories = useMemo(() => {
    return MapRegion[id as IdType].category;
  }, [id]);
  const allTimes = useMemo(() => {
    return MapRegion[id as IdType].time;
  }, [id]);
  const allOrders = useMemo(() => {
    return MapRegion[id as IdType].typeData;
  }, [id]);



  const filterData = useMemo(() => {
    return [
      {
        id: FilterType.region,
        data: allRegions,
      },
      {
        id: FilterType.category,
        data: allCategories,
      },
      {
        id: FilterType.time,
        data: allTimes,
      },
      {
        id: FilterType.typeData,
        data: allOrders,
      },
    ];
  }, [allRegions, allCategories, allTimes, allOrders]);

  const [selectedRegions, setSelectedRegions] = useState(allRegions[0]);
  const [selectedCategories, setSelectedCategories] = useState(allCategories[0]);
  const [selectedTimes, setSelectedTimes] = useState(allTimes[0]);
  const [selectedOrders, setSelectedOrders] = useState(allOrders[0]);
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState([]);

  const handleFilterSelected = useCallback((id: FilterType, value: string)=>{
    switch (id) {
        case FilterType.region:
            setSelectedRegions(value)
            break;
        case FilterType.category:
            setSelectedCategories(value)
            break;
        case FilterType.time:
            setSelectedTimes(value)
            break; 
        case FilterType.typeData:
            setSelectedOrders(value)
            break;  
        default:
            break;
  }
},[])

  const queryData = async () => {
    setLoading(true);
    let query = '';
    let getCategoryId = 0;
    if(selectedRegions !== "All Regions") query = query + `&region=${selectedRegions}`
    if(selectedCategories !== "All Categories") query = query + `&categories=${selectedCategories}`
    if(selectedTimes !== "All Time Periods") query = query + `&year=${selectedTimes}`
    if(selectedOrders) query = query + `&orderFilm=${selectedOrders}`

    if (selectedCategories !== "All Categories") {
      const getCategory = await axios.get(
        process.env.REACT_APP_API_BASE_URL + `/categories/getOne/${
          selectedCategories
        }`
      );
      getCategoryId = getCategory.data?.id;
    }

    try {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/films?page=1&limit=1000&type=${title}` + query); 
      console.log(res)
      if(res.data.data.length > 0){
        setFilms(res.data.data);
      }
      else {
        setFilms([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
    }

  } 

  useEffect(()=>{
    try {
      queryData();
    } catch (error) {
      console.log(error)
    }
  },[selectedRegions, selectedCategories, selectedOrders, selectedTimes])

  return (
    <div>
      <Filters
        onFilterSelected={handleFilterSelected}
        data={filterData}
        selectedRegion={selectedRegions}
        selectedCategory={selectedCategories}
        selectedTime={selectedTimes}
        selectedOrder={selectedOrders}
      />
      <ContentWrap films={films && films} loading={loading} /> 
    </div>
  );
};
