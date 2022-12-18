import React from 'react';
import Pages from './router/Routers';
import './App.css';
import { useAppDispatch } from './stores/hook';
import useFilm from './hook/useFilm'
function App() {
  const dispatch = useAppDispatch();
  useFilm(dispatch);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
    <Pages />
  </React.Suspense>
    
   

  );
}

export default App;
