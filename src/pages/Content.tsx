import React,{ useMemo } from 'react';
import { CustomTabs } from '../components/common/CustomTabs';
import { HeaderWrap } from '../components/common/HeaderWrap';
import { ContentBody } from '../components/content/ContentBody';
import '../css/content.css';

const Content = () => {
  const data = useMemo(() => {
    return [
      {
        id: 1,
        title: 'TV Series',
        content: <ContentBody id={1} title="TV" />,
      },
      {
        id: 2,
        title: 'Movie',
        content: <ContentBody id={2} title="Movie" />,
      },
      {
        id: 3,
        title: 'Anime',
        content: <ContentBody id={3} title="Anime" />,
      },
    ];
  }, []);

  return (
    <HeaderWrap>
      <CustomTabs data={data} />
    </HeaderWrap>
  );
};

export default Content;
