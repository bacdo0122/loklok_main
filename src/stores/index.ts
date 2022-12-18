import { configureStore } from '@reduxjs/toolkit';
import filmReducer from '../reducers/film';


const store = configureStore({
    reducer: {
        film: filmReducer
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
export default store;