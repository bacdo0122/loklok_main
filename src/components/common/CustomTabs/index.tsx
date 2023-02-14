import React, { memo, useState } from 'react';
import { Tab } from '../../../interface/Tab';

interface Props {
  data: Tab[];
}

export const CustomTabs = memo(({ data }: Props) => {
  const [selectedTab, setSelectedTab] = useState<number>(data[0].id);
  console.log(selectedTab)
  return (
    <div className="customtab">
      <div className="first-lever">
        {data.map((item) => {
          return (
            <div
              onClick={() => {
                setSelectedTab(item.id);
              }}
              key={item.id}
              className={
                selectedTab === item.id
                  ? 'first-lever-item filter-item-label firest-lever-item-active'
                  : 'first-lever-item filter-item-label'
              }
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              display: item.id === selectedTab ? 'block' : 'none',
            }}
            className="body"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
});
