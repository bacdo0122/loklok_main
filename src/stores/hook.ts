import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
