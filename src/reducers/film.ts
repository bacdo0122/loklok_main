import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface film{
    name: string,
    actor: string,
    vote: number,
    totalViews: number
  }
interface TotalFilm{
      films: film[]
  }
interface State{
    films: TotalFilm | null
}
const initialState:State ={
    films: null
}

export const filmSlice:any = createSlice({
    name: "films",
    initialState,
    reducers: {
        setFilms: (state, action:PayloadAction<TotalFilm>) => {
            state.films = action.payload
        }
    }
})

export const {setFilms} = filmSlice.actions;
const {reducer: filmReducer} = filmSlice;
export default filmReducer