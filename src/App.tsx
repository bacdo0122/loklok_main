import React from 'react';
import { SWRConfig } from 'swr';
import './App.css';
import Layout from './components/layout';
import useFetchFilm from './hook/useFetchFilm';
import Pages from './router/Routers';

function App() {
  useFetchFilm();
  return (
    <SWRConfig value={{}}>
      <Layout>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Pages />
        </React.Suspense>
      </Layout>
    </SWRConfig>
  );
}

export default App;
