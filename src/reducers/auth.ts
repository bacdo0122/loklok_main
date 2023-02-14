import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User{
  email:string,
  password:string,
  avatar:string,
  id: number,
  createAt: string,
  updateAt: string,
  name:string
}
interface State{
    isAuth:boolean,
    user:User | null
  }

const initialState:State ={
    user:null,
    isAuth:false

}

export const authSlice:any = createSlice({
    name: "auth",
    initialState,
    reducers: {
      
       setAuth: (state, action:PayloadAction<boolean>) =>{
        state.isAuth = action.payload as boolean
       },
       setUser: (state, action:PayloadAction<User>) =>{
        state.user = action.payload
       },
    }
})

export const { setUser,setAuth} = authSlice.actions;
const {reducer: authReducer} = authSlice;
export default authReducer