import { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../helper/fetch';
import { setFilms } from '../reducers/film';
import { useAppDispatch } from '../stores/hook';

const useFetchFilm = (search: string | null = null) => {
  const { data: films, error, mutate } = useSWR(['/films?page=1&limit=100'], fetcher);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (films) {
      dispatch(setFilms(films.data));
    } else {
      dispatch(setFilms([]));
    }
  }, [films]);

  return {
    reload: mutate,
  };
};

export default useFetchFilm;
